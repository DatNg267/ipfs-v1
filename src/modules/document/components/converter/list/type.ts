import { DocumentNode } from '../../../types/document-node'

export type DocumentList = Omit<DocumentNode, 'nodes'> & {
  nodes: any[]
}
