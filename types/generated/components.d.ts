import type { Schema, Struct } from '@strapi/strapi';

export interface FooterFooter extends Struct.ComponentSchema {
  collectionName: 'components_footer_footers';
  info: {
    displayName: 'Footer';
    icon: 'layout';
  };
  attributes: {
    contactInfo: Schema.Attribute.Component<'forms.contact-info', false>;
    copyright: Schema.Attribute.String & Schema.Attribute.Required;
    icon: Schema.Attribute.Media<'images' | 'files', true> &
      Schema.Attribute.Required;
    legalInfo: Schema.Attribute.Component<'footer.legal-info', false>;
    networks: Schema.Attribute.Component<'sections.networks', true>;
  };
}

export interface FooterInfoLink extends Struct.ComponentSchema {
  collectionName: 'components_footer_info_links';
  info: {
    displayName: 'infoLink';
    icon: 'link';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface FooterLegalInfo extends Struct.ComponentSchema {
  collectionName: 'components_footer_legal_infos';
  info: {
    displayName: 'legalInfo';
    icon: 'key';
  };
  attributes: {
    links: Schema.Attribute.Component<'footer.info-link', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface FormsContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_forms_contact_infos';
  info: {
    displayName: 'contactInfo';
    icon: 'phone';
  };
  attributes: {
    email: Schema.Attribute.Email & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images' | 'files'>;
    phone: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface FormsLinks extends Struct.ComponentSchema {
  collectionName: 'components_forms_links';
  info: {
    displayName: 'links';
    icon: 'link';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<['Button', 'Link']> &
      Schema.Attribute.DefaultTo<'Link'>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface FormsUserInfo extends Struct.ComponentSchema {
  collectionName: 'components_forms_user_infos';
  info: {
    displayName: 'userInfo';
    icon: 'user';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    email: Schema.Attribute.Email & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    phone: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface MenuLink extends Struct.ComponentSchema {
  collectionName: 'components_menu_links';
  info: {
    displayName: 'Menu Link';
    icon: 'link';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images' | 'files'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<['link', 'button']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'link'>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsBody extends Struct.ComponentSchema {
  collectionName: 'components_sections_bodies';
  info: {
    displayName: 'body';
  };
  attributes: {
    sections: Schema.Attribute.Component<'sections.section', true>;
    sliders: Schema.Attribute.Component<'sections.silder-section', true>;
  };
}

export interface SectionsMediaSlider extends Struct.ComponentSchema {
  collectionName: 'components_sections_media_sliders';
  info: {
    displayName: 'mediaSlider';
    icon: 'bulletList';
  };
  attributes: {
    link: Schema.Attribute.String;
    media: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    text: Schema.Attribute.String;
  };
}

export interface SectionsNetworks extends Struct.ComponentSchema {
  collectionName: 'components_sections_networks';
  info: {
    displayName: 'networks';
    icon: 'oneToMany';
  };
  attributes: {
    icon: Schema.Attribute.Media<'files' | 'images'>;
    text: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<
      ['instagram', 'facebook', 'linkedin', 'other']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'other'>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_sections';
  info: {
    displayName: 'Section';
    icon: 'apps';
  };
  attributes: {
    images: Schema.Attribute.Media<'images' | 'files', true>;
    imagesPosition: Schema.Attribute.Enumeration<
      ['Left', 'Right', 'Up', 'Down']
    > &
      Schema.Attribute.DefaultTo<'Right'>;
    links: Schema.Attribute.Component<'forms.links', false>;
    text: Schema.Attribute.Blocks;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsSilderSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_silder_sections';
  info: {
    displayName: 'silderSection';
    icon: 'dashboard';
  };
  attributes: {
    items: Schema.Attribute.Component<'sections.media-slider', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsTextSlider extends Struct.ComponentSchema {
  collectionName: 'components_sections_text_sliders';
  info: {
    displayName: 'textSlider';
    icon: 'layer';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String;
  };
}

export interface SectionsTextSliderSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_text_slider_sections';
  info: {
    displayName: 'textSliderSection';
    icon: 'connector';
  };
  attributes: {
    items: Schema.Attribute.Component<'sections.text-slider', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'footer.footer': FooterFooter;
      'footer.info-link': FooterInfoLink;
      'footer.legal-info': FooterLegalInfo;
      'forms.contact-info': FormsContactInfo;
      'forms.links': FormsLinks;
      'forms.user-info': FormsUserInfo;
      'menu.link': MenuLink;
      'sections.body': SectionsBody;
      'sections.media-slider': SectionsMediaSlider;
      'sections.networks': SectionsNetworks;
      'sections.section': SectionsSection;
      'sections.silder-section': SectionsSilderSection;
      'sections.text-slider': SectionsTextSlider;
      'sections.text-slider-section': SectionsTextSliderSection;
    }
  }
}
