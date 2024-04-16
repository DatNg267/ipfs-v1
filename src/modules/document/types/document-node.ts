import { Fragment } from 'ethers/lib/utils'

export type DocumentContent = {
  id: string
  title: string
  kind: string
  type: string
  description: string
  path: string
  slug: string
  pages: DocumentContentPage[]
  document: {
    data: { schemaVersion: number }
    nodes: DocumentNode[]
    object: string
  }
}
export type DocumentContentPage = {
  id: string
  title: string
  kind: string
  type: string
  description: string
  path: string
  slug: string
  pages: DocumentContentPage[]
}
export type DocumentNode = {
  fragments?: Fragment[]
  data: {
    [key: string]: any
  }
  isVoid: boolean
  nodes: DocumentNode[]
  object: string
  type:
    | 'paragraph'
    | 'blockquote'
    | 'code'
    | 'swagger'
    | 'tabs'
    | 'list-unordered'
    | 'heading-1'
    | 'heading-2'
    | 'heading-3'
    | 'heading-4'
    | 'heading-5'
    | 'list'
    | 'list-item'
    | 'list-unordered'
    | 'list-ordered'
  [key: string]: any
}
