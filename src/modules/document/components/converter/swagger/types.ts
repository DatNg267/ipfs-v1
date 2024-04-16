import { DocumentNode } from '../../../types/document-node'
import { DocumentText } from '../text/types'
import { DocumentFragment } from '../fragments/types'

export type DocumentSwagger = Omit<DocumentNode, 'nodes' | 'data'> & {
  nodes: DocumentText[]
  data: DocumentSwaggerData
  fragments: DocumentFragment[]
}
export type DocumentSwaggerData = {
  baseUrl: String
  method: String
  parameters: {
    [key: string]: {
      in: string
      name: string
      orderIndex: string
      required?: boolean
      type?: string
    }
  }
  path: string
  responses: {
    [key: string]: {
      description: string
      orderIndex: string
      status: string
    }
  }
  summary: string
}
