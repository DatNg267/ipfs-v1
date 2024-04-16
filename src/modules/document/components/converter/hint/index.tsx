import { colorTheme } from '@/themes/_color'
import { Box, Stack } from '@mui/material'
import { isEqual } from 'lodash'
import { memo } from 'react'
import { DocumentHint } from './types'
import { Paragraph } from '../paragraph'
import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { Icons } from '@/themes/_icons'
type Props = {
  block: DocumentHint
}
const Hint = ({ block }: Props) => {
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
          borderColor: (theme) => theme.palette.blue[700],
          borderRadius: '99px',
        },
      }}
    >
      <Stack direction='row' spacing={2}>
        <SvgIconCustomized
          component={Icons.CircleInformation}
          sx={{
            mt: 1,
            color: (theme) => theme.palette.blue[700],
          }}
        />
        <Paragraph variant='body2' block={block.nodes[0]}></Paragraph>
      </Stack>
    </Stack>
  )
}
function areEqual(prevProps: Props, nextProps: Props) {
  return isEqual(prevProps.block, nextProps.block)
}
export default memo(Hint, areEqual)
