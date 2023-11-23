import { defineType } from 'sanity'

export default defineType({
  type: 'document',
  name: 'landingPage',

  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Tittel',
    },
    {
      type: 'string',
      name: 'subTitle',
      title: 'Salgstekst',
    },
    {
      type: 'array',
      of: [{ type: 'image' }],
      name: 'images',
      title: 'Bilder',
    },
    {
      type: 'string',
      name: 'ctaLabel',
      title: 'Tittel kontaktknapp',
    },
    {
      type: 'string',
      name: 'ctaLink',
      title: 'Lenke kontaktknapp',
    },
    {
      type: 'array',
      of: [{ type: 'reference', to: [{type: 'job'}] }],
      name: 'highlightedJobs',
      title: 'Fremhevde jobber',
    },
    {
      type: 'array',
      of: [{ type: 'reference', to: [{type: 'service'}] }],
      name: 'highlightedServices',
      title: 'Tilgjengelige tjenester',
    },
  ],
})
