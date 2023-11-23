import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import job from './job'
import landingPage from './landingPage'
import service from './service'

export const schemaTypes = [job, service, landingPage, blockContent]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [job, service, landingPage, blockContent],
}
