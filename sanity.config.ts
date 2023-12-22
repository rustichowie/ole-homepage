/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'

// see https://www.sanity.io/docs/api-versioning for how versioning works
import {
  apiVersion,
  dataset,
  previewSecretId,
  projectId,
} from '~/lib/sanity.api'
import { revalidateOnPublish } from '~/lib/sanity.extend'
import { secretsToolbar } from '~/plugin/secret-toolbar'
import { schema } from '~/schemas'
import { productionUrl } from '~/utils/productionUrl'

export const myStructure = (S) =>
  S.list()
    .title('Base')
    .items([
      S.listItem()
        .title('Forside')
        .child(
          S.document().schemaType('landingPage').documentId('landingPage'),
        ),
      ...S.documentTypeListItems().filter(
        (listItem) => !['landingPage'].includes(listItem.getId()),
      ),
    ])

export default defineConfig({
  basePath: '/studio',
  name: 'project-name',
  title: 'Finvåg Service og vedlikehold',
  projectId,
  dataset,
  //edit schemas in './src/schemas'
  schema,
  plugins: [
    deskTool(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    productionUrl({ previewSecretId, types: ['post'], apiVersion }),
    secretsToolbar()
  ],
  document: {
    actions: (prev) =>
      prev.map((originalAction) =>
        originalAction.action === 'publish'
          ? revalidateOnPublish(originalAction)
          : originalAction,
      ),
  },
})
