import { DocumentNode } from '../../../types/document-node'
import { DocumentText } from '../text/types'

export type DocumentCode = Omit<DocumentNode, 'nodes' | 'data'> & {
  nodes: DocumentCodeLine[]
  data: {
    syntax: String
  }
}
export type DocumentCodeLine = Omit<DocumentNode, 'nodes'> & {
  nodes: DocumentText[]
}
