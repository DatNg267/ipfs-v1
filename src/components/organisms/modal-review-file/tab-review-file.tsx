import CodeExample from '@/components/organisms/code-example'
import { CODE_GET_FILE_BY_CID_STRING } from '@/constants/code'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { breakpoints } from '@/themes/_theme'
import { Button, Paper, Stack } from '@mui/material'
import { debounce } from 'lodash'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import TabHeading from '../modal-review-files/tab-heading'
import { handleChangeTabPreview } from '../preview-file/services'
import RenderFile from '../render-file'
import { useGetStatusSubcribeGateways } from '@/modules/gateway/resources/hooks'
import { useDownloadFile } from '@/services/download-file'
import { useDownloadAndZip } from '@/services/zip-n-download'
import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { Icons } from '@/themes/_icons'
import { GLOBAL_IPFS_GATEWAYS, PUBLIC_GATEWAY } from '@/constants/gateways'
import { modalDownloadProgressActions } from '@/redux/modal-download-progress/reducer'
import ButtonCustomized from '@/components/atoms/button'

const TabReviewFile = () => {
  const [tabIndex, setTabIndex] = React.useState(0)
  const { name, cid, size } = useAppSelector((state) => state.modalReviewFile)
  const onDownloadFile = useDownloadFile()
  const dispatch = useAppDispatch()
  useEffect(() => {
    const handleWindowResize = debounce(() => {
      handleChangeTabPreview(tabIndex, 97, 58)
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
  const handleDownload = () => {
    if (cid && name) {
      try {
        const URL_GATEWAYS = PUBLIC_GATEWAY || GLOBAL_IPFS_GATEWAYS
        dispatch(modalDownloadProgressActions.open())
        onDownloadFile({
          cid: cid,
          gateway: URL_GATEWAYS,
          fileName: name,
          size: size,
        })
      } catch (error) {}
    }
  }
  return (
    <Stack sx={{ height: '100%' }} spacing={1 / 2}>
      <TabHeading
        handleChange={handleChangeMainTabIndex}
        tabIndex={tabIndex}
        labelLeft={'Review file'}
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
            <RenderFile fileName={name} fileHash={cid} />
          </Stack>
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
              {'Download file'}
            </ButtonCustomized>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  )
}

export default TabReviewFile
