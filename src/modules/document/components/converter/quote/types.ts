import { DocumentNode } from '../../../types/document-node'
import { DocumentParagraph } from '../paragraph/types'

export type DocumentQuote = Omit<DocumentNode, 'nodes'> & {
  nodes: DocumentParagraph[]
}
