import { convertBlock } from '@/modules/document/convert-gitbook'
import { Box, Stack } from '@mui/material'
import React from 'react'
import { DocumentFragment } from './types'

type Props = {
  block: DocumentFragment
}

const FragmentCaption = ({ block }: Props) => {
  if (block.fragment === 'caption')
    return (
      <Stack alignItems='center' mt={2}>
        {block.nodes.map((node: any, index: number) => {
          return <Box key={index}>{convertBlock(node)}</Box>
        })}
      </Stack>
    )
  else return <></>
}

export default FragmentCaption
