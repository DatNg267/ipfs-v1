import { DocumentCode } from '../code/types'
import { DocumentNode } from '../../../types/document-node'

export type DocumentTabs = Omit<DocumentNode, 'nodes'> & {
  nodes: DocumentTabItem[]
}
export type DocumentTabItem = Omit<DocumentNode, 'nodes' | 'data'> & {
  nodes: DocumentCode[]
  data: {
    title: string
  }
}
