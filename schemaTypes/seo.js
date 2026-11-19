import { defineType, defineField } from 'sanity';

export const seo = defineType({
  name: 'seo',
  title: 'SEO Information',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Title displayed in search engine results.',
      validation: (Rule) =>
        Rule.max(60).warning('Try to keep the SEO title within 60 characters.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Short description of this page for search engines.',
      validation: (Rule) =>
        Rule.max(160).warning('Try to keep the description within 160 characters.'),
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from Search Engines',
      type: 'boolean',
      description: 'Enable this if search engines should not index this page.',
      initialValue: false,
    }),
  ],
});