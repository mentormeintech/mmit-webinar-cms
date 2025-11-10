
// import {defineField, defineType} from 'sanity'

// export default defineType({
//   name: 'section',
//   title: 'Section',
//   type: 'object',
//   fields: [
//     defineField({
//       name: 'heading',
//       title: 'Section Heading',
//       type: 'string',
//     }),
//     defineField({
//       name: 'content',
//       title: 'Text Content',
//       type: 'array',
//       of: [{type: 'block'}],
//       description: 'Optional — rich text content for this section.',
//     }),
//     defineField({
//       name: 'images',
//       title: 'Images',
//       type: 'array',
//       of: [{type: 'image', options: {hotspot: true}}],
//       options: {layout: 'grid'},
//       description: 'Optional — add one or more images.',
//     }),
//     defineField({
//       name: 'videoUrl',
//       title: 'Video URL',
//       type: 'url',
//       description: 'Optional — add a YouTube, Vimeo, or other video link.',
//     }),
//   ],
//   preview: {
//     select: {
//       title: 'heading',
//       media: 'images.0',
//       videoUrl: 'videoUrl',
//     },
//     prepare({title, media, videoUrl}) {
//       const subtitle = videoUrl ? 'Video section' : media ? 'Image section' : 'Text section'
//       return {
//         title: title || 'Untitled Section',
//         subtitle,
//         media,
//       }
//     },
//   },
// })

import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'section',
  title: 'Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Text Content',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Optional — rich text content for this section.',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      options: { layout: 'grid' },
      description: 'Optional — add one or more images.',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'Optional — link to a YouTube or Vimeo video.',
    }),

    // 🎧 New: Audio field
    defineField({
      name: 'audio',
      title: 'Audio File',
      type: 'file',
      options: {
        accept: 'audio/*', // allows MP3, WAV, etc.
      },
      description: 'Optional — upload an audio clip (e.g., narration or music).',
    }),

    // Optional: External audio URL (e.g. Spotify, SoundCloud)
    defineField({
      name: 'audioUrl',
      title: 'Audio URL',
      type: 'url',
      description: 'Optional — link to an external audio source.',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'images.0',
      videoUrl: 'videoUrl',
      audio: 'audio',
      audioUrl: 'audioUrl',
    },
    prepare({ title, media, videoUrl, audio, audioUrl }) {
      let subtitle = 'Text section'
      if (videoUrl) subtitle = 'Video section'
      else if (audio || audioUrl) subtitle = 'Audio section'
      else if (media) subtitle = 'Image section'

      return {
        title: title || 'Untitled Section',
        subtitle,
        media,
      }
    },
  },
})
