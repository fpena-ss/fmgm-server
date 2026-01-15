import React, { useState, useRef, useEffect } from 'react';
import { HexColorPicker, RgbaColorPicker } from 'react-colorful';
import {
  Field,
  Flex,
} from '@strapi/design-system';
import { styled } from 'styled-components';

interface ColorPickerInputProps {
  attribute?: {
    options?: {
      format?: 'hex' | 'rgb' | 'rgba';
    };
  };
  disabled?: boolean;
  error?: string;
  hint?: string;
  label?: string;
  name: string;
  onChange: (event: { target: { name: string; value: string; type: string } }) => void;
  required?: boolean;
  value?: string;
}

const ColorPreview = styled.div<{ $color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: ${({ $color }) => $color || '#ffffff'};
  border: 2px solid #dcdce4;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const PopoverContainer = styled.div`
  position: absolute;
  z-index: 1000;
  top: 100%;
  left: 0;
  margin-top: 8px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  padding: 16px;
  min-width: 220px;

  .react-colorful {
    width: 200px;
    height: 200px;
  }

  .react-colorful__saturation {
    border-radius: 8px 8px 0 0;
  }

  .react-colorful__hue,
  .react-colorful__alpha {
    height: 16px;
    border-radius: 8px;
    margin-top: 8px;
  }

  .react-colorful__pointer {
    width: 20px;
    height: 20px;
    border-width: 3px;
  }
`;

const ColorInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TextInput = styled.input`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: #4945ff;
    box-shadow: 0 0 0 2px rgba(73, 69, 255, 0.1);
  }

  &:disabled {
    background-color: #f6f6f9;
    cursor: not-allowed;
  }
`;

const PresetColors = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 12px;
  flex-wrap: wrap;
`;

const PresetColor = styled.button<{ $color: string }>`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 2px solid transparent;
  background-color: ${({ $color }) => $color};
  cursor: pointer;
  transition: transform 0.15s ease, border-color 0.15s ease;
  padding: 0;

  &:hover {
    transform: scale(1.15);
    border-color: #4945ff;
  }
`;

const PRESET_COLORS = [
  '#FF6B6B',
  '#4ECDC4',
  '#45B7D1',
  '#96CEB4',
  '#FFEAA7',
  '#DDA0DD',
  '#FF8C00',
  '#4169E1',
  '#2ECC71',
  '#E74C3C',
  '#9B59B6',
  '#1ABC9C',
  '#F39C12',
  '#34495E',
  '#FFFFFF',
  '#000000',
];

const hexToRgba = (hex: string): { r: number; g: number; b: number; a: number } => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        a: 1,
      }
    : { r: 0, g: 0, b: 0, a: 1 };
};

const rgbaToHex = (rgba: { r: number; g: number; b: number; a: number }): string => {
  const toHex = (n: number) => {
    const hex = Math.round(n).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(rgba.r)}${toHex(rgba.g)}${toHex(rgba.b)}`;
};

const rgbaToString = (rgba: { r: number; g: number; b: number; a: number }, includeAlpha: boolean): string => {
  if (includeAlpha) {
    return `rgba(${Math.round(rgba.r)}, ${Math.round(rgba.g)}, ${Math.round(rgba.b)}, ${rgba.a})`;
  }
  return `rgb(${Math.round(rgba.r)}, ${Math.round(rgba.g)}, ${Math.round(rgba.b)})`;
};

const parseColor = (color: string): { r: number; g: number; b: number; a: number } => {
  if (!color) return { r: 255, g: 255, b: 255, a: 1 };

  // Hex
  if (color.startsWith('#')) {
    return hexToRgba(color);
  }

  // RGBA or RGB
  const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (rgbaMatch) {
    return {
      r: parseInt(rgbaMatch[1], 10),
      g: parseInt(rgbaMatch[2], 10),
      b: parseInt(rgbaMatch[3], 10),
      a: rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1,
    };
  }

  return { r: 255, g: 255, b: 255, a: 1 };
};

export const ColorPickerInput: React.FC<ColorPickerInputProps> = ({
  attribute,
  disabled = false,
  error,
  hint,
  label,
  name,
  onChange,
  required = false,
  value = '',
}) => {
  const format = attribute?.options?.format || 'hex';
  const [isOpen, setIsOpen] = useState(false);
  const [rgbaColor, setRgbaColor] = useState(() => parseColor(value));
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDisplayValue = (): string => {
    if (!value && !rgbaColor) return '';
    
    switch (format) {
      case 'rgb':
        return rgbaToString(rgbaColor, false);
      case 'rgba':
        return rgbaToString(rgbaColor, true);
      case 'hex':
      default:
        return rgbaToHex(rgbaColor);
    }
  };

  const handleColorChange = (newColor: string | { r: number; g: number; b: number; a: number }) => {
    let rgba: { r: number; g: number; b: number; a: number };
    let finalValue: string;

    if (typeof newColor === 'string') {
      rgba = hexToRgba(newColor);
      rgba.a = rgbaColor.a;
    } else {
      rgba = newColor;
    }

    setRgbaColor(rgba);

    switch (format) {
      case 'rgb':
        finalValue = rgbaToString(rgba, false);
        break;
      case 'rgba':
        finalValue = rgbaToString(rgba, true);
        break;
      case 'hex':
      default:
        finalValue = rgbaToHex(rgba);
    }

    onChange({
      target: {
        name,
        value: finalValue,
        type: 'string',
      },
    });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange({
      target: {
        name,
        value: newValue,
        type: 'string',
      },
    });

    const parsed = parseColor(newValue);
    if (parsed) {
      setRgbaColor(parsed);
    }
  };

  const handlePresetClick = (presetColor: string) => {
    handleColorChange(presetColor);
  };

  const displayColor = value || rgbaToHex(rgbaColor);

  return (
    <Field.Root name={name} error={error} required={required}>
      <Flex direction="column" alignItems="stretch" gap={1}>
        {label && <Field.Label>{label}</Field.Label>}
        
        <ColorInputWrapper ref={containerRef}>
          <ColorPreview
            $color={displayColor}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            title="Click to open color picker"
          />
          
          <TextInput
            type="text"
            value={value || getDisplayValue()}
            onChange={handleTextChange}
            disabled={disabled}
            placeholder={format === 'hex' ? '#000000' : format === 'rgba' ? 'rgba(0, 0, 0, 1)' : 'rgb(0, 0, 0)'}
          />

          {isOpen && !disabled && (
            <PopoverContainer>
              {format === 'rgba' ? (
                <RgbaColorPicker color={rgbaColor} onChange={handleColorChange} />
              ) : (
                <HexColorPicker color={rgbaToHex(rgbaColor)} onChange={handleColorChange} />
              )}
              
              <PresetColors>
                {PRESET_COLORS.map((color) => (
                  <PresetColor
                    key={color}
                    $color={color}
                    onClick={() => handlePresetClick(color)}
                    title={color}
                    type="button"
                  />
                ))}
              </PresetColors>
            </PopoverContainer>
          )}
        </ColorInputWrapper>

        {hint && <Field.Hint>{hint}</Field.Hint>}
        <Field.Error />
      </Flex>
    </Field.Root>
  );
};
