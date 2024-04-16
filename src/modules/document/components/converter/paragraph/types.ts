import { DocumentNode } from '../../../types/document-node'
import { DocumentText, DocumentTextInline } from '../text/types'

export type DocumentParagraph = Omit<DocumentNode, 'nodes'> & {
  nodes: (DocumentText | DocumentTextInline)[]
}
