import CodeExample from '@/components/organisms/code-example'
import {
  CODE_GET_NFT_BY_ID_STRING,
  CODE_GET_NFT_LIST_STRING,
  CODE_UPLOAD_NFT_STRING,
} from '@/constants/code'
import { breakpoints } from '@/themes/_theme'
import { Paper, Stack } from '@mui/material'
import { debounce } from 'lodash'
import React, { useEffect } from 'react'
import RenderFile from '../../render-file'
import FileInfo from '../components/file-info'
import LayerLoading from '../components/layer-loading'
import ResultPreviewHeading from '../components/main-heading'
import { handleChangeTabPreview } from '../services'

type Props = {
  fileSize?: number
  fileName: string
  cid: string
  pinned: boolean
  codeString: string
}

function ResultPreviewFile({
  pinned,
  fileName,
  fileSize,
  cid,
  codeString,
}: Props) {
  const [tabIndex, setTabIndex] = React.useState(0)

  useEffect(() => {
    const handleWindowResize = debounce(() => {
      handleChangeTabPreview(tabIndex)
    }, 50)
    handleWindowResize()
    window.addEventListener('resize', handleWindowResize)
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [tabIndex])

  const handleChangeMainTabIndex = (
    event: React.SyntheticEvent,
    tabIndex: number
  ) => {
    setTabIndex(tabIndex)
  }

  return (
    <Stack sx={{ height: '100%' }} flex={1}>
      <ResultPreviewHeading
        handleChange={handleChangeMainTabIndex}
        tabIndex={tabIndex}
      />
      <Paper
        sx={{
          backgroundColor: 'background.default',
          flex: 1,
          color: 'primary.main',
          p: tabIndex === 1 ? '0px' : '28px',
          [breakpoints.down('md')]: {
            p: tabIndex === 1 ? '8px' : '8px',
          },
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <Stack
          flex={1}
          sx={{ display: tabIndex === 1 ? 'flex' : 'none', height: '100%' }}
        >
          <CodeExample codeString={codeString} />
        </Stack>
        <Stack
          sx={{
            display: tabIndex === 0 ? 'flex' : 'none',
            minHeight: '0px',
            height: '100%',
            position: 'relative',
          }}
          flex={1}
          spacing={4}
        >
          {!pinned && <LayerLoading></LayerLoading>}
          <Stack
            flex={1}
            alignItems={'center'}
            justifyContent={'center'}
            sx={{
              padding: 2,
              border: '1px solid',
              borderColor: (theme) => theme.palette.baseGray[800],
              borderRadius: '8px',
              overflow: 'hidden',
              position: 'relative',
              mt: '0 !important',
            }}
          >
            <RenderFile fileName={fileName} fileHash={cid} />
          </Stack>
          <FileInfo name={fileName} size={fileSize} hash={cid} />
        </Stack>
      </Paper>
    </Stack>
  )
}

export default ResultPreviewFile
