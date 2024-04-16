import ButtonCustomized from '@/components/atoms/button'
import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { Icons } from '@/themes/_icons'
import { breakpoints } from '@/themes/_theme'
import { Typography, Stack, Button } from '@mui/material'
import React from 'react'

type Props = {
  handleOpenCreateByCidModal: () => void
  handleOpenUploadFile: () => void
}

const NftEmptyTable = ({
  handleOpenCreateByCidModal,
  handleOpenUploadFile,
}: Props) => {
  return (
    <>
      <SvgIconCustomized
        component={Icons.Image}
        sx={{
          fontSize: '60px',
          color: 'text.secondary',
        }}
      ></SvgIconCustomized>
      <Typography variant='body2' color='text.secondary' textAlign={'center'}>
        No data available.<br></br> Please choose a file or CID to upload.
      </Typography>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        sx={{
          [breakpoints.down('md')]: {
            width: '100%',
          },
        }}
        spacing={4}
      >
        <ButtonCustomized
          variant='contained'
          color='secondary'
          sx={{
            minWidth: '184px',
            minHeight: '44px',
          }}
          startIcon={
            <SvgIconCustomized component={Icons.Export}></SvgIconCustomized>
          }
          onClick={handleOpenUploadFile}
        >
          Upload NFT
        </ButtonCustomized>
        <ButtonCustomized
          variant='contained'
          color='secondary'
          sx={{
            minWidth: '184px',
            minHeight: '44px',
          }}
          startIcon={
            <SvgIconCustomized component={Icons.Link}></SvgIconCustomized>
          }
          onClick={handleOpenCreateByCidModal}
        >
          Upload CID
        </ButtonCustomized>
      </Stack>
    </>
  )
}

export default NftEmptyTable
