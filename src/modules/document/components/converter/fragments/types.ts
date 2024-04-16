import { DocumentNode } from '@/modules/document/types'
import { DocumentParagraph } from '../paragraph/types'
import { DocumentCode } from '../code/types'

export type DocumentFragment = Omit<DocumentNode, 'nodes'> & {
  fragment: string | 'description' | 'caption'
  nodes: (DocumentNode | DocumentParagraph | DocumentCode)[]
  object: string
  type?: string
}
