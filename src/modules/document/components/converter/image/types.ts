import { DocumentNode } from '@/modules/document/types'
import { DocumentFragment } from '../fragments/types'

export type DocumentImage = Omit<DocumentNode, 'data'> & {
  data: {
    alt: string
    ref: {
      file: string
      kind: string
    }
  }
  fragments: DocumentFragment[]
}
