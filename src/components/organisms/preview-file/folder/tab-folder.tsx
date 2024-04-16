import { IPFSApis } from '@/apis/ipfs'
import { useAppSelector } from '@/redux/hooks'
import { Stack } from '@mui/material'
import { useEffect } from 'react'
import {
  useChangeIndexFileTarget,
  useChangeIsReviewFileDataTab,
  useResetReviewFolder,
  useSetFolder,
} from '../../../../redux/modal-review-folder/hooks'
import ImagesSlider from '../../images-slider'
import HeadingPreviewFiles from '../components/heading-preview-files'
import LayerLoading from '../components/layer-loading'
import ListFile from './list-file'

const TabFolder = () => {
  const { folder, isReviewFileDataTab, indexFileTarget, cid, name, size } =
    useAppSelector((state) => state.modalReviewFolder)

  const handleChangeIndexFileTarget = useChangeIndexFileTarget()
  const handleChangePreviewFilesTabIndex = useChangeIsReviewFileDataTab()
  const handleSetFolder = useSetFolder()

  const handleResetReviewFolderState = useResetReviewFolder()
  useEffect(() => {
    return () => {
      handleResetReviewFolderState()
    }
  }, [])

  const handlePreviewFile = (index: number) => {
    handleChangeIndexFileTarget(index)
    handleChangePreviewFilesTabIndex(true)
  }

  const handleGetFolder = ({ stale, cid }: { stale: boolean; cid: string }) => {
    console.log('handle get folder')
    IPFSApis.getFolder(cid)
      .then((res) => {
        console.log({ res })
        if (!stale) {
          handleSetFolder(res)
        }
      })
      .catch((err) => {})
  }

  useEffect(() => {
    let stale = false
    if (!cid) return
    handleGetFolder({ stale, cid })
    return () => {
      stale = true
    }
  }, [cid])

  return (
    <>
      {!folder && <LayerLoading />}
      <HeadingPreviewFiles
        currentFiles={indexFileTarget + 1}
        totalFiles={folder?.Links.length}
        checked={isReviewFileDataTab}
        handleChange={(e, checked) => {
          handleChangePreviewFilesTabIndex(checked)
        }}
      />

      <ListFile
        listFile={folder?.Links}
        handlePreviewFile={handlePreviewFile}
        sx={{
          display: isReviewFileDataTab === false ? 'flex' : 'none',
        }}
      />

      <Stack
        sx={{
          display: isReviewFileDataTab === true ? 'flex' : 'none',
          height: '100%',
        }}
      >
        {folder && (
          <ImagesSlider
            cid={cid}
            currentTargetIndex={indexFileTarget}
            handleChangeIndex={handleChangeIndexFileTarget}
            files={folder?.Links}
          />
        )}
      </Stack>
    </>
  )
}

export default TabFolder
