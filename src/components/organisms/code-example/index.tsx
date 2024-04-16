import { Box, IconButton, Stack, Typography } from '@mui/material'
import {
  APP_BORDER_RADIUS_PRIMARY,
  CodeScrollBarStyled,
  ScrollBarStyled,
  breakpoints,
} from '@/themes/_theme'
import { javascript } from '@codemirror/lang-javascript'
import { dracula } from '@uiw/codemirror-theme-dracula'
import { oneDark } from '@codemirror/theme-one-dark'

import CodeMirror from '@uiw/react-codemirror'
import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { Icons } from '@/themes/_icons'
import { useEffect, useState } from 'react'
import hljs from 'highlight.js'
import { ZINDEX_BTN_COPY_CODE } from '@/constants/ui-index'

type Props = {
  codeString: string
  theme?: any
}

const CodeExample = ({ codeString, theme }: Props) => {
  const [show, setShow] = useState(false)
  const handleShow = () => {
    codeString && navigator.clipboard.writeText(codeString)
    setShow(true)
    setTimeout(() => {
      setShow(false)
    }, 300)
  }
  useEffect(() => {
    hljs.highlightAll()
  }, [])
  return (
    <Box
      flex={1}
      className='code-sample'
      sx={{
        position: 'relative',
        overflow: 'hidden',
        height: '100%',

        '& .cm-theme': {
          height: '100%',
          backgroundColor: 'black',
          padding: { xs: '8px', md: '16px' },
          fontSize: '18px',
          borderRadius: APP_BORDER_RADIUS_PRIMARY,
          overflow: 'hidden',
          [breakpoints.down('md')]: {
            fontSize: '16px',
          },
        },
        '& .cm-gutters': {
          backgroundColor: 'black',
        },
        '& .cm-editor': {
          backgroundColor: 'black',
          height: '100%',
        },
        '& .cm-content': {},
        '& .cm-scroller': {
          overflow: 'auto',
          ...CodeScrollBarStyled,
        },
      }}
    >
      <CodeMirror
        value={codeString}
        theme={dracula}
        extensions={[javascript()]}
        onChange={(value, viewUpdate) => {}}
        style={{}}
        editable={false}
        readOnly={true}
        basicSetup={{
          lineNumbers: true,
          foldGutter: false,
        }}
      />
      <IconButton
        onClick={handleShow}
        className='button-copy-code'
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 8,
          zIndex: ZINDEX_BTN_COPY_CODE,
          alignItems: 'center',
          justifyContent: 'center',
          '&:hover': {
            '& .MuiSvgIcon-root': {
              color: 'primary.main',
            },
          },
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
}

export default CodeExample
