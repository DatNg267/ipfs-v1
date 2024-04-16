import { isEqual } from 'lodash'
import { memo, useEffect, useState } from 'react'
import { DocumentCode } from './types'
import { Box, IconButton, Typography } from '@mui/material'
import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { Icons } from '@/themes/_icons'
type Props = {
  codeBlock?: DocumentCode
  id?: string
  [key: string]: any
}
const CodeBlock = ({ id, codeBlock, ...props }: Props) => {
  const [show, setShow] = useState(false)
  const handleShow = () => {
    codeBlock &&
      navigator.clipboard.writeText(
        codeBlock.nodes
          .map((item) => `${item.nodes[0].leaves[0].text} \n`)
          .join('')
      )
    setShow(true)
    setTimeout(() => {
      setShow(false)
    }, 300)
  }
  if (codeBlock)
    return (
      <Box
        id={id}
        component={'pre'}
        {...props}
        sx={{
          borderRadius: '10px',
          overflowX: 'auto',
          overflowY: 'hidden',
          width: '100%',
          position: 'relative',
          '&:hover .button-copy-code': {
            display: 'block',
          },
          transition: 'max-height ease-in 0.2s',
          ...props.sx,
        }}
      >
        <code
          className={`codeBlock ${
            codeBlock.data.syntax ? codeBlock.data.syntax : ''
          }`}
        >
          {codeBlock.nodes
            .map((item) => `${item.nodes[0].leaves[0].text}\n`)
            .join('')}
        </code>
        <IconButton
          onClick={handleShow}
          className='button-copy-code'
          sx={{
            display: 'none',
            position: 'absolute',
            top: 2,
            right: 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {!show && (
            <SvgIconCustomized
              component={Icons.CopyCircle}
              sx={{
                fontSize: '38px',
                color: (theme) => theme.palette.baseGray[500],
              }}
            />
          )}

          {show && (
            <Typography
              color='primary.main'
              variant='body2'
              sx={{
                lineHeight: '38px',
              }}
            >
              Copied
            </Typography>
          )}
        </IconButton>
      </Box>
    )
  else return <></>
}
function areEqual(prevProps: Props, nextProps: Props) {
  return isEqual(prevProps.codeBlock, nextProps.codeBlock)
}
export default memo(CodeBlock, areEqual)
