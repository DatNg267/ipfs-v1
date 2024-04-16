import { DocumentNode } from '../../../types/document-node'

export type DocumentText = {
  object: string
  leaves: DocumentLeaf[]
}
export type DocumentLeaf = {
  object: string
  marks: {
    type: string
    [key: string]: any
  }[]
  selections: any[]
  text: string
}

export type DocumentTextInline = Omit<DocumentNode, 'nodes'> & {
  nodes: DocumentText[]
  data: {
    ref: {
      kind: string
      page?: string //page id
      url?: string //page id
    }
  }
}
