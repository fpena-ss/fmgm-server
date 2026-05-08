import type { Schema, Struct } from '@strapi/strapi';

export interface AboutIndexedSection extends Struct.ComponentSchema {
  collectionName: 'components_about_indexed_sections';
  info: {
    displayName: 'Secci\u00F3n Indexada';
    icon: 'layer';
  };
  attributes: {
    anchorId: Schema.Attribute.String & Schema.Attribute.Required;
    cuerpo: Schema.Attribute.Blocks;
    imagenes: Schema.Attribute.Media<'images', true>;
    titulo: Schema.Attribute.String & Schema.Attribute.Required;
    videosEmbedded: Schema.Attribute.Component<'about.video-embed', true>;
  };
}

export interface AboutVideoEmbed extends Struct.ComponentSchema {
  collectionName: 'components_about_video_embeds';
  info: {
    displayName: 'Video Embebido';
    icon: 'play';
  };
  attributes: {
    embedUrl: Schema.Attribute.String & Schema.Attribute.Required;
    plataforma: Schema.Attribute.Enumeration<['youtube', 'vimeo', 'otro']> &
      Schema.Attribute.DefaultTo<'youtube'>;
    titulo: Schema.Attribute.String;
  };
}

export interface FooterFooter extends Struct.ComponentSchema {
  collectionName: 'components_footer_footers';
  info: {
    displayName: 'Footer';
    icon: 'layout';
  };
  attributes: {
    autorizacionDatos: Schema.Attribute.Media<'files'>;
    contactInfo: Schema.Attribute.Component<'forms.contact-info', false>;
    copyright: Schema.Attribute.String & Schema.Attribute.Required;
    esalLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Actualizaci\u00F3n en ESAL'>;
    esalUrl: Schema.Attribute.String;
    icon: Schema.Attribute.Media<'images' | 'files', true> &
      Schema.Attribute.Required;
    legalInfo: Schema.Attribute.Component<'footer.legal-info', false>;
    networks: Schema.Attribute.Component<'sections.networks', true>;
    politicaDatos: Schema.Attribute.Media<'files'>;
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

export interface MenuDropdownItem extends Struct.ComponentSchema {
  collectionName: 'components_menu_dropdown_items';
  info: {
    displayName: 'Dropdown Item';
    icon: 'arrowRight';
  };
  attributes: {
    openInNewTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
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
    navType: Schema.Attribute.Enumeration<
      ['internal', 'anchor', 'external', 'dropdown']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'internal'>;
    openInNewTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    subItems: Schema.Attribute.Component<'menu.dropdown-item', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<['link', 'button']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'link'>;
    url: Schema.Attribute.String;
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

export interface SectionsDocumento extends Struct.ComponentSchema {
  collectionName: 'components_sections_documentos';
  info: {
    displayName: 'Documento';
    icon: 'file';
  };
  attributes: {
    archivo: Schema.Attribute.Media<'files'> & Schema.Attribute.Required;
    nombre: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsFormularioEmbebido extends Struct.ComponentSchema {
  collectionName: 'components_sections_formularios_embebidos';
  info: {
    displayName: 'Formulario Embebido';
    icon: 'paperPlane';
  };
  attributes: {
    altura: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<600>;
    anchorId: Schema.Attribute.String;
    titulo: Schema.Attribute.String;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsGaleriaDocumentos extends Struct.ComponentSchema {
  collectionName: 'components_sections_galeria_documentos';
  info: {
    displayName: 'Galer\u00EDa de Documentos';
    icon: 'folder';
  };
  attributes: {
    anchorId: Schema.Attribute.String;
    documentos: Schema.Attribute.Component<'sections.documento', true>;
    titulo: Schema.Attribute.String;
  };
}

export interface SectionsListaProductos extends Struct.ComponentSchema {
  collectionName: 'components_sections_lista_productos';
  info: {
    displayName: 'Lista de Productos';
    icon: 'shoppingCart';
  };
  attributes: {
    anchorId: Schema.Attribute.String;
    titulo: Schema.Attribute.String;
    vista: Schema.Attribute.Enumeration<['grid', 'compacto', 'lista']> &
      Schema.Attribute.DefaultTo<'grid'>;
  };
}

export interface SectionsMapa extends Struct.ComponentSchema {
  collectionName: 'components_sections_mapas';
  info: {
    displayName: 'Mapa';
    icon: 'earth';
  };
  attributes: {
    altura: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<420>;
    anchorId: Schema.Attribute.String;
    etiqueta: Schema.Attribute.String;
    latitud: Schema.Attribute.Decimal;
    longitud: Schema.Attribute.Decimal;
    titulo: Schema.Attribute.String;
    urlEmbebida: Schema.Attribute.Text;
    zoom: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<15>;
  };
}

export interface SectionsMediaSlider extends Struct.ComponentSchema {
  collectionName: 'components_sections_media_sliders';
  info: {
    displayName: 'mediaSlider';
    icon: 'bulletList';
  };
  attributes: {
    anchorId: Schema.Attribute.String;
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
    anchorId: Schema.Attribute.String;
    images: Schema.Attribute.Media<'images' | 'files' | 'videos', true>;
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
    anchorId: Schema.Attribute.String;
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
    anchorId: Schema.Attribute.String;
    items: Schema.Attribute.Component<'sections.text-slider', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'about.indexed-section': AboutIndexedSection;
      'about.video-embed': AboutVideoEmbed;
      'footer.footer': FooterFooter;
      'footer.info-link': FooterInfoLink;
      'footer.legal-info': FooterLegalInfo;
      'forms.contact-info': FormsContactInfo;
      'forms.links': FormsLinks;
      'forms.user-info': FormsUserInfo;
      'menu.dropdown-item': MenuDropdownItem;
      'menu.link': MenuLink;
      'sections.body': SectionsBody;
      'sections.documento': SectionsDocumento;
      'sections.formulario-embebido': SectionsFormularioEmbebido;
      'sections.galeria-documentos': SectionsGaleriaDocumentos;
      'sections.lista-productos': SectionsListaProductos;
      'sections.mapa': SectionsMapa;
      'sections.media-slider': SectionsMediaSlider;
      'sections.networks': SectionsNetworks;
      'sections.section': SectionsSection;
      'sections.silder-section': SectionsSilderSection;
      'sections.text-slider': SectionsTextSlider;
      'sections.text-slider-section': SectionsTextSliderSection;
    }
  }
}
