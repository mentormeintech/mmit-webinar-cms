import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
      // validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'timezone',
      title: 'Timezone',
      type: 'string',
      // hidden: true,
      initialValue: () => Intl.DateTimeFormat().resolvedOptions().timeZone
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'A short summary of the post.',
    }),

    // 🔥 SPEAKER DETAILS FIELDS

    defineField({
      name: 'speakerName',
      title: 'Speaker Name',
      type: 'string',
      // validation: Rule => Rule.required().error('Speaker name is required'),
    }),

    defineField({
      name: 'speakerImage',
      title: 'Speaker Image',
      type: 'image',
      options: { hotspot: true },
    }),

    defineField({
      name: 'speakerLinkedIn',
      title: 'Speaker LinkedIn Profile',
      type: 'url',
      validation: Rule => Rule.uri({
        allowRelative: false,
        scheme: ['http', 'https'],
      }),
    }),
    // 🔥 New field: Sections (array of modular content blocks)
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [{ type: 'section' }], // Reference the custom object type below
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
})
