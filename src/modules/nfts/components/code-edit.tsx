import { Box } from '@mui/material'
import FormHelperTextCustomized from '@/components/atoms/form-helper-text'
import { CODE_EXAMPLE_METADATA } from '@/constants/code'
import {
  APP_BORDER_RADIUS_PRIMARY,
  APP_FONT_FAMILY,
  ScrollBarStyled,
  breakpoints,
} from '@/themes/_theme'
import { FormErrorMessage } from '@/utils/error'
import { json } from '@codemirror/lang-json'
import { githubLight } from '@uiw/codemirror-theme-github'
import CodeMirror from '@uiw/react-codemirror'
import { useEffect } from 'react'

type Props = {
  theme?: any
  handleChangeMetadata: (metadata: string) => void
  jsonUploaded?: string | null
  metadata?: string | null
  error: string | null
  setError: any
}

const EditCode = ({
  theme,
  jsonUploaded,
  handleChangeMetadata,
  metadata,
  error,
  setError,
}: Props) => {
  useEffect(() => {
    if (jsonUploaded) {
      setError(null)
      try {
        JSON.parse(jsonUploaded)
      } catch (error) {
        setError(FormErrorMessage.METADATA_FORMAT_IS_NOT_VALID)
      }
      handleChangeMetadata(jsonUploaded)
    }
  }, [jsonUploaded])

  return (
    <>
      <Box
        flex={1}
        sx={{
          overflow: 'auto',
          width: '100%',
          '& .cm-scroller': {
            overflowX: 'unset',
            fontFamily: 'inherit',
          },
          '& .cm-gutters': {
            borderRight: 'none',
          },
          '& .cm-content': {
            whiteSpace: 'unset',
            flexShrink: 'unset',
          },
          '& .cm-theme': {
            overflow: 'unset !important',
          },
          ...ScrollBarStyled,
          [breakpoints.down('md')]: {},
        }}
      >
        <CodeMirror
          value={metadata || CODE_EXAMPLE_METADATA}
          theme={githubLight}
          extensions={[json()]}
          onChange={(value, viewUpdate) => {
            handleChangeMetadata(value)
          }}
          style={{
            fontSize: '18px',
            borderRadius: APP_BORDER_RADIUS_PRIMARY,
            overflow: 'hidden',
            fontFamily: APP_FONT_FAMILY.SECONDARY,
            letterSpacing: '0.05em',
          }}
          basicSetup={{
            lineNumbers: true,
            foldGutter: false,
          }}
        />
      </Box>
      <FormHelperTextCustomized sx={{ fontSize: '16px' }} error={!!error}>
        {error}
      </FormHelperTextCustomized>
    </>
  )
}

export default EditCode
