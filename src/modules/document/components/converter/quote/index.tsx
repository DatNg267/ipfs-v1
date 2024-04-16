import { colorTheme } from '@/themes/_color'
import { Box, Stack } from '@mui/material'
import { isEqual } from 'lodash'
import { memo } from 'react'
import { DocumentQuote } from './types'
import { Paragraph } from '../paragraph'
type Props = {
  block: DocumentQuote
}
const Quote = ({ block }: Props) => {
  return (
    <Stack
      sx={{
        backgroundColor: colorTheme.light.secondary[600],
        position: 'relative',
        borderRadius: '0',
        p: 2,
        m: 0,
        pl: 4,
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          borderLeft: '4px solid black',
          borderRadius: '99px',
        },
      }}
    >
      <Box>
        <Paragraph variant='body2' block={block.nodes[0]}></Paragraph>
      </Box>
    </Stack>
  )
}
function areEqual(prevProps: Props, nextProps: Props) {
  return isEqual(prevProps.block, nextProps.block)
}
export default memo(Quote, areEqual)
