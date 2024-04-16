import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import CodeExample from '@/components/organisms/code-example'
import { CODE_GET_FILE_BY_CID_STRING } from '@/constants/code'
import {
  DEDICATE_GATEWAY,
  GLOBAL_IPFS_GATEWAYS,
  PUBLIC_GATEWAY,
} from '@/constants/gateways'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { modalDownloadProgressActions } from '@/redux/modal-download-progress/reducer'
import {
  RequestZippingFolderFromUrls,
  useDownloadAndZip,
} from '@/services/zip-n-download'
import { Icons } from '@/themes/_icons'
import { breakpoints } from '@/themes/_theme'
import { Button, Paper, Stack } from '@mui/material'
import { debounce } from 'lodash'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import TabFolder from '../preview-file/folder/tab-folder'
import { handleChangeTabPreview } from '../preview-file/services'
import TabHeading from './tab-heading'
import { useGetStatusSubcribeGateways } from '@/modules/gateway/resources/hooks'
import { useDownloadFile } from '@/services/download-file'
import ButtonCustomized from '@/components/atoms/button'

const TabReviewFolder = () => {
  const [tabIndex, setTabIndex] = React.useState(0)
  const { folder, isReviewFileDataTab, indexFileTarget, cid, name, size } =
    useAppSelector((state) => state.modalReviewFolder)

  const handleCheckUsedDecidateGateways = useGetStatusSubcribeGateways()
  const [isSubribeDedicatedGateways, setIsSubribeDedicatedGateways] =
    useState(false)

  const onZipDowloadFolder = useDownloadAndZip()
  const onDownloadFile = useDownloadFile()

  const dispatch = useAppDispatch()

  useLayoutEffect(() => {
    handleCheckUsedDecidateGateways({})
      .then((res) => {
        setIsSubribeDedicatedGateways(true)
      })
      .catch((err) => {
        setIsSubribeDedicatedGateways(false)
      })
  }, [])

  useEffect(() => {
    const handleWindowResize = debounce(() => {
      handleChangeTabPreview(tabIndex, 108, 58)
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
  const handleDownloadFolder = () => {
    if (folder && folder.Links && folder.Links.length > 0) {
      dispatch(modalDownloadProgressActions.open())
      const URL_GATEWAYS = isSubribeDedicatedGateways
        ? DEDICATE_GATEWAY || GLOBAL_IPFS_GATEWAYS
        : PUBLIC_GATEWAY || GLOBAL_IPFS_GATEWAYS
      const request: RequestZippingFolderFromUrls = {
        files: folder.Links.map((link) => {
          return {
            url: URL_GATEWAYS + link.Hash['/'],
            fileName: link.Hash['/'],
          }
        }),
        size: size,
        folderName: cid,
      }
      onZipDowloadFolder(request)
    }
  }
  const handleDownloadFile = () => {
    if (folder && folder.Links) {
      dispatch(modalDownloadProgressActions.open())
      try {
        const URL_GATEWAYS = isSubribeDedicatedGateways
          ? DEDICATE_GATEWAY || GLOBAL_IPFS_GATEWAYS
          : PUBLIC_GATEWAY || GLOBAL_IPFS_GATEWAYS
        onDownloadFile({
          cid: folder?.Links[indexFileTarget].Hash['/'],
          gateway: URL_GATEWAYS,
          fileName: folder?.Links[indexFileTarget].Name,
          size: folder?.Links[indexFileTarget].Tsize,
        })
      } catch (error) {}
    }
  }
  const handleDownload = () => {
    if (isReviewFileDataTab) {
      handleDownloadFile()
    } else {
      handleDownloadFolder()
    }
  }
  return (
    <Stack sx={{ height: '100%' }} spacing={1 / 2}>
      <TabHeading
        handleChange={handleChangeMainTabIndex}
        tabIndex={tabIndex}
        labelLeft={'Review files'}
        labelRight={'Code'}
      />
      <Paper
        sx={{
          backgroundColor: 'background.default',
          flex: 1,
          color: 'primary.main',
          p: tabIndex === 1 ? '0px' : '16px',
          [breakpoints.down('md')]: {
            p: tabIndex === 1 ? '0px' : '16px',
          },
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          m: 0,
          border: '1px solid',
          borderColor: 'primary.main',
        }}
      >
        <Stack
          sx={{ display: tabIndex === 1 ? 'flex' : 'none', height: '100%' }}
        >
          <CodeExample codeString={CODE_GET_FILE_BY_CID_STRING} />
        </Stack>
        <Stack
          sx={{
            display: tabIndex === 0 ? 'flex' : 'none',
            minHeight: '0px',
            height: '100%',
            position: 'relative',
          }}
          spacing={4}
        >
          <TabFolder />
          <Stack alignItems={'center'}>
            <ButtonCustomized
              variant='outlined'
              color='primary'
              onClick={handleDownload}
              fullWidth={false}
              sx={{
                '& .MuiButton-startIcon': {
                  marginRight: '4px',
                },
              }}
              startIcon={
                <SvgIconCustomized
                  component={Icons.Download}
                  sx={{
                    fontSize: '20px',
                  }}
                ></SvgIconCustomized>
              }
            >
              {isReviewFileDataTab ? 'Download file' : 'Download folder'}
            </ButtonCustomized>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  )
}

export default TabReviewFolder
