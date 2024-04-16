import { isEmpty } from 'lodash'
import { DocumentContent } from '../types'
import { TreeContentType } from '../types/tree-content'

export function getTreeContent(
  data: DocumentContent | null
): TreeContentType[] | null | any {
  if (!data) return null

  return data.document.nodes
    .map((node: any, index: number) => {
      if (node.type.includes('heading')) {
        return {
          text: node.nodes[0].leaves[0].text,
          level: parseInt((node.type as string).replace('heading-', '')),
        }
      }
    })
    .filter((item) => !isEmpty(item))
}
