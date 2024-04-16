import { PaperStyled } from '@/components/atoms/paper'
import { DOCUMENT_HEADING_MOBILE_HEIGHT } from '@/constants'
import { breakpoints } from '@/themes/_theme'
import { Stack } from '@mui/material'
import { ReactNode } from 'react'
import DocumentHeader from './header'

type Props = {
  children: ReactNode
}

const DocumentLayout = ({ children }: Props) => {
  return (
    <Stack
      id='document-layout'
      sx={{
        overflow: { xs: 'unset', md: 'hidden' },
        height: '100%',
        maxHeight: { xs: 'unset', md: '100vh' },
        minHeight: { xs: '100vh', md: '100vh' },
      }}
    >
      <DocumentHeader />
      <PaperStyled
        id='document-wrapper'
        sx={{
          flex: 1,
          p: { xs: 0, md: 0 },
          m: 1,
          mb: 0,
          mt: 1 / 2,
          position: 'relative',
          display: 'flex',
          background: (theme) => theme.palette.background.default,
          flexDirection: { xs: 'column', md: 'row' },
          maxHeight: { xs: 'unset', md: 'calc(100vh - 68px)' },
          overflow: 'hidden',
          [breakpoints.down('md')]: {
            minHeight: `calc(100vh - ${DOCUMENT_HEADING_MOBILE_HEIGHT}px)`,
          },
        }}
      >
        {children}
      </PaperStyled>
    </Stack>
  )
}
export default DocumentLayout
