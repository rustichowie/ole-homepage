import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Tjeneste',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'excerpt',
      title: 'Kort beskrivelse',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'mainImage',
      title: 'Velg ikon (jobber med forhåndsvisning av ikon)',
      type: 'string',
      options: {
        list: [
          {
            title: 'Hammer',
            value: 'hammer',
          },
          {
            title: 'Hjelm',
            value: 'helmet',
          },
          {
            title: 'Hus',
            value: 'house',
          },
          {
            title: 'Skiftnøkkel',
            value: 'wrench',
          },
          {
            title: 'Verktøykasse',
            value: 'toolbox',
          },
          {
            title: 'Pickup',
            value: 'pickup',
          },
          {
            title: 'Malekost',
            value: 'brush',
          }
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
    }
  },
})
