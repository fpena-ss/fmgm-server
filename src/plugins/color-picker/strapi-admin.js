const PLUGIN_ID = 'color-picker';

const ColorPickerIcon = () => {
  return {
    type: 'svg',
    props: {
      width: 24,
      height: 24,
      viewBox: '0 0 24 24',
      fill: 'none',
    },
  };
};

export default {
  register(app) {
    app.customFields.register({
      name: 'color',
      pluginId: PLUGIN_ID,
      type: 'string',
      intlLabel: {
        id: `${PLUGIN_ID}.color.label`,
        defaultMessage: 'Color Picker',
      },
      intlDescription: {
        id: `${PLUGIN_ID}.color.description`,
        defaultMessage: 'Selecciona un color usando el selector de color',
      },
      components: {
        Input: async () => {
          const module = await import('./admin/src/components/ColorPickerInput');
          return { default: module.ColorPickerInput };
        },
      },
      options: {
        base: [
          {
            sectionTitle: {
              id: `${PLUGIN_ID}.color.section.format`,
              defaultMessage: 'Formato',
            },
            items: [
              {
                intlLabel: {
                  id: `${PLUGIN_ID}.color.format.label`,
                  defaultMessage: 'Formato del color',
                },
                name: 'options.format',
                type: 'select',
                value: 'hex',
                options: [
                  {
                    key: 'hex',
                    value: 'hex',
                    metadatas: {
                      intlLabel: {
                        id: `${PLUGIN_ID}.color.format.hex`,
                        defaultMessage: 'Hexadecimal (ej: #FF5733)',
                      },
                    },
                  },
                  {
                    key: 'rgb',
                    value: 'rgb',
                    metadatas: {
                      intlLabel: {
                        id: `${PLUGIN_ID}.color.format.rgb`,
                        defaultMessage: 'RGB (ej: rgb(255, 87, 51))',
                      },
                    },
                  },
                  {
                    key: 'rgba',
                    value: 'rgba',
                    metadatas: {
                      intlLabel: {
                        id: `${PLUGIN_ID}.color.format.rgba`,
                        defaultMessage: 'RGBA (ej: rgba(255, 87, 51, 1))',
                      },
                    },
                  },
                ],
              },
            ],
          },
        ],
        advanced: [
          {
            sectionTitle: {
              id: 'global.settings',
              defaultMessage: 'Configuración',
            },
            items: [
              {
                name: 'required',
                type: 'checkbox',
                intlLabel: {
                  id: `${PLUGIN_ID}.color.required`,
                  defaultMessage: 'Campo requerido',
                },
                description: {
                  id: `${PLUGIN_ID}.color.required.description`,
                  defaultMessage: 'No podrás crear una entrada si este campo está vacío',
                },
              },
            ],
          },
        ],
      },
    });
  },
};
