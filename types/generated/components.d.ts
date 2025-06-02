import type { Schema, Struct } from '@strapi/strapi';

export interface SharedAffiliateLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_affiliate_links';
  info: {
    displayName: 'Affiliate Link';
    icon: 'link';
  };
  attributes: {
    clickCount: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    disclosureText: Schema.Attribute.Text & Schema.Attribute.Required;
    linkText: Schema.Attribute.String & Schema.Attribute.Required;
    trackingCode: Schema.Attribute.String;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'SEO';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    ogImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface SharedTestimonial extends Struct.ComponentSchema {
  collectionName: 'components_shared_testimonials';
  info: {
    displayName: 'Testimonial';
    icon: 'emotionHappy';
  };
  attributes: {
    authorImage: Schema.Attribute.Media<'images'>;
    authorName: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    authorTitle: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    quote: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.affiliate-link': SharedAffiliateLink;
      'shared.seo': SharedSeo;
      'shared.testimonial': SharedTestimonial;
    }
  }
}
