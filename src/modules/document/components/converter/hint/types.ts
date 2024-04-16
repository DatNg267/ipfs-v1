import { DocumentNode } from '../../../types/document-node'
import { DocumentParagraph } from '../paragraph/types'

export type DocumentHint = Omit<DocumentNode, 'nodes' | 'data'> & {
  nodes: DocumentParagraph[]
  data: {
    style: 'info'
  }
}
