import { Box } from '@mui/material'

import {
  APP_BORDER_RADIUS_PRIMARY,
  APP_FONT_FAMILY,
  ScrollBarStyled,
  breakpoints,
} from '@/themes/_theme'
import { json } from '@codemirror/lang-json'
import { githubLight } from '@uiw/codemirror-theme-github'
import CodeMirror from '@uiw/react-codemirror'
type Props = {
  codeString: string
}

const CodeCheck = ({ codeString }: Props) => {
  return (
    <Box
      sx={{
        overflow: 'auto',
        width: '100%',
        '& .cm-gutters': {
          borderRight: 'none',
        },
        '& .cm-content': {},
        '& .cm-scroller': {
          overflowX: 'unset',
          fontFamily: 'inherit',
        },
        ...ScrollBarStyled,
        [breakpoints.down('md')]: {
          minHeight: '200px',
        },
      }}
    >
      <CodeMirror
        value={codeString}
        theme={githubLight}
        editable={false}
        readOnly={true}
        extensions={[json()]}
        style={{
          fontSize: '18px',
          borderRadius: APP_BORDER_RADIUS_PRIMARY,
          // overflow: 'auto',
          fontFamily: APP_FONT_FAMILY.SECONDARY,
          letterSpacing: '0.05em',
        }}
        basicSetup={{
          lineNumbers: true,
          foldGutter: false,
        }}
      />
    </Box>
  )
}

export default CodeCheck
