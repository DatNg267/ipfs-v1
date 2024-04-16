import CodeExample from '@/components/organisms/code-example'
import { breakpoints } from '@/themes/_theme'
import { Box, Paper, Stack } from '@mui/material'
import { debounce } from 'lodash'
import React, { useEffect } from 'react'
import ResultPreviewHeading from '../components/main-heading'
import { handleChangeTabPreview } from '../services'
import TabFolder from './tab-folder'
import { useAppSelector } from '@/redux/hooks'
import FolderInfo from '../components/folder-info'
import FileInfo from '../components/file-info'
import { getSumSize } from '../../../../redux/modal-review-folder/hooks'

type Props = {
  codeString: string
}

const ResultPreviewFolder = ({ codeString }: Props) => {
  const [tabIndex, setTabIndex] = React.useState(0)
  const { folder, isReviewFileDataTab, indexFileTarget, cid, name, size } =
    useAppSelector((state) => state.modalReviewFolder)

  // useEffect(() => {
  //   const handleWindowResize = debounce(() => {
  //     handleChangeTabPreview(tabIndex)
  //   }, 50)
  //   handleWindowResize()
  //   window.addEventListener('resize', handleWindowResize)
  //   return () => {
  //     window.removeEventListener('resize', handleWindowResize)
  //   }
  // }, [tabIndex])

  const handleChangeMainTabIndex = (
    event: React.SyntheticEvent,
    tabIndex: number
  ) => {
    setTabIndex(tabIndex)
  }

  return (
    <Stack sx={{ height: '100%' }}>
      <ResultPreviewHeading
        handleChange={handleChangeMainTabIndex}
        tabIndex={tabIndex}
      />
      <Paper
        sx={{
          backgroundColor: 'background.default',
          flex: 1,
          color: 'primary.main',
          p: tabIndex === 1 ? '0px' : '16px 28px',
          [breakpoints.down('md')]: {
            p: tabIndex === 1 ? '0px' : '8px',
          },
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          maxHeight: { xs: '487px', md: 'unset' },
        }}
      >
        <Stack
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
          spacing={{ xs: 2, md: 4 }}
        >
          <TabFolder />
          <Box>
            {isReviewFileDataTab === false && (
              <FolderInfo
                name={name}
                size={folder ? getSumSize(folder.Links) : undefined}
                hash={cid}
                totalFiles={folder ? folder.Links.length : undefined}
              />
            )}
            {folder && isReviewFileDataTab === true && (
              <FileInfo
                name={folder.Links[indexFileTarget].Name}
                size={folder ? folder.Links[indexFileTarget].Tsize : undefined}
                hash={
                  folder ? folder.Links[indexFileTarget].Hash['/'] : undefined
                }
              />
            )}
          </Box>
        </Stack>
      </Paper>
    </Stack>
  )
}

export default ResultPreviewFolder
