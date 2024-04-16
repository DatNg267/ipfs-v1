'use client'
import { useAppSelector } from '@/redux/hooks'
import Image from 'next/image'
import React from 'react'
import { DocumentImage } from './types'
import FragmentCaption from '../fragments'
import { Stack } from '@mui/material'
import SimpleDialog from './dialog-image'
type Props = {
  block: DocumentImage
}

const DocumentImageComponent = ({ block }: Props) => {
  const { files } = useAppSelector((state) => state.document)

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      {files && (
        <>
          <Stack
            alignItems={'center'}
            position={'relative'}
            sx={{
              width: '100%',
              paddingTop: '62.5%',
            }}
          >
            <Image
              onClick={handleOpen}
              alt='aioz-sdk-image'
              src={files[block.data.ref.file]?.downloadURL}
              fill
              style={{ cursor: 'pointer', objectFit: 'contain' }}
            />
          </Stack>
          <SimpleDialog
            open={open}
            onClose={handleClose}
            url={files[block.data.ref.file]?.downloadURL}
          />
        </>
      )}

      {block.fragments.map((fragment, index) => (
        <FragmentCaption block={fragment} key={index} />
      ))}
    </>
  )
}

export default DocumentImageComponent
