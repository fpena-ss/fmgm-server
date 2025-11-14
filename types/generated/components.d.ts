import type { Schema, Struct } from '@strapi/strapi';

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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'forms.contact-info': FormsContactInfo;
      'forms.user-info': FormsUserInfo;
      'menu.link': MenuLink;
    }
  }
}
