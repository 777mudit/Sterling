import { defineType, defineField, defineArrayMember } from 'sanity';

export const productVariant = defineType({
  name: 'productVariant',
  title: 'Product variant',
  type: 'object',
  fields: [
    defineField({ name: 'sku', title: 'Product code / SKU', type: 'string' }),
    defineField({ name: 'size', title: 'Size', type: 'string' }),
    defineField({ name: 'dimensions', title: 'Dimensions', type: 'string' }),
    defineField({ name: 'finish', title: 'Finish / colour', type: 'string' }),
    defineField({ name: 'mrp', title: 'MRP (INR)', type: 'number', validation: (Rule) => Rule.min(0) }),
    defineField({ name: 'weightCapacity', title: 'Weight capacity (kg)', type: 'number', validation: (Rule) => Rule.min(0) }),
    defineField({ name: 'notes', title: 'Variant notes', type: 'string' }),
  ],
  preview: { select: { title: 'sku', size: 'size', finish: 'finish', mrp: 'mrp' }, prepare({ title, size, finish, mrp }) { return { title: title || size || finish || 'Variant', subtitle: [size, finish, mrp != null ? `MRP ₹${mrp}` : ''].filter(Boolean).join(' · ') }; } },
});

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Product family name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'category', title: 'Category', type: 'reference', to: [{ type: 'category' }], validation: (Rule) => Rule.required() }),
    defineField({ name: 'subcategory', title: 'Subcategory', type: 'reference', to: [{ type: 'subcategory' }], validation: (Rule) => Rule.required(), options: { filter: ({ document }) => document?.category?._ref ? { filter: 'category._ref == $categoryId', params: { categoryId: document.category._ref } } : { filter: '_id == $none', params: { none: '' } } } }),
    defineField({ name: 'shortDescription', title: 'Short description', type: 'string' }),
    defineField({ name: 'description', title: 'Product description', type: 'text', rows: 4 }),
    defineField({ name: 'keyFeatures', title: 'Key Features', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
    defineField({ name: 'images', title: 'Product images', type: 'array', of: [defineArrayMember({ type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })] })] }),
    defineField({ name: 'variants', title: 'Variants (size / finish / SKU)', type: 'array', of: [defineArrayMember({ type: 'productVariant' })] }),
    defineField({ name: 'cataloguePages', title: 'Catalogue page(s)', type: 'string', description: 'Printed catalogue pages. Verify this before publication.' }),
    defineField({ name: 'sourceNotes', title: 'Catalogue extraction notes', type: 'text', rows: 3 }),
    defineField({ name: 'reviewStatus', title: 'Data review status', type: 'string', options: { list: [ { title: 'Needs product data', value: 'needs-product-data' }, { title: 'Extracted - pending review', value: 'extracted-pending-review' }, { title: 'Reviewed', value: 'reviewed' }, { title: 'Approved for publishing', value: 'approved' } ], layout: 'radio' }, initialValue: 'needs-product-data' }),
    defineField({ name: 'isActive', title: 'Active on storefront', type: 'boolean', initialValue: false }),
    defineField({ name: 'sortOrder', title: 'Sort order', type: 'number', validation: (Rule) => Rule.integer().min(0) }),
    defineField({ name: 'seoData', title: 'SEO Information', type: 'seo' }),
  ],
  preview: { select: { title: 'title', subtitle: 'subcategory.title', media: 'images.0' }, prepare({ title, subtitle, media }) { return { title, subtitle: subtitle || 'Unreviewed catalogue family', media }; } },
});