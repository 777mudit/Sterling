import { defineType, defineField } from 'sanity';

export const subcategory = defineType({
  name: 'subcategory',
  title: 'Subcategory',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Subcategory name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'category', title: 'Parent category', type: 'reference', to: [{ type: 'category' }], validation: (Rule) => Rule.required() }),
    defineField({ name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })] }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'cataloguePages', title: 'Catalogue page(s)', type: 'string', description: 'Printed catalogue page label(s), not PDF page indices.' }),
    defineField({ name: 'sortOrder', title: 'Sort order', type: 'number', validation: (Rule) => Rule.integer().min(0) }),
    defineField({ name: 'seoData', title: 'SEO Information', type: 'seo' }),
  ],
  preview: { select: { title: 'title', parent: 'category.title', media: 'coverImage' }, prepare({ title, parent, media }) { return { title, subtitle: parent, media }; } },
});