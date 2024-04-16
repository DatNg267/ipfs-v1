import { isEqual } from 'lodash'
import { memo } from 'react'

import { Text } from '../text'
import { Box, Stack } from '@mui/material'
import TextInLine from '../text/test-in-line'
import { DocumentParagraph } from './types'
import { DocumentText, DocumentTextInline } from '../text/types'
type Props = {
  block?: DocumentParagraph
  [key: string]: any
}
export const Paragraph = ({ block, ...props }: Props) => {
  if (block)
    return (
      <Box sx={{ display: 'inline-block' }} component={'span'}>
        {block.nodes.map((node, index) =>
          node.object === 'text' ? (
            <Text {...props} key={index} block={node as DocumentText}></Text>
          ) : (
            <TextInLine
              {...props}
              key={index}
              block={node as DocumentTextInline}
            />
          )
        )}
      </Box>
    )
  else return <></>
}
function areEqual(prevProps: Props, nextProps: Props) {
  return isEqual(prevProps.block, nextProps.block)
}
export default memo(Paragraph, areEqual)
