import { DocumentNode } from '../../../types/document-node'
import { DocumentFragment } from '../fragments/types'

export type DocumentEmbed = Omit<DocumentNode, 'data'> & {
  data: {
    url: string
  }
  fragments: DocumentFragment[]
}
