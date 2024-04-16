import IconButtonCustomized from '@/components/atoms/icon-button'
import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { Icons } from '@/themes/_icons'
import { Paper, Typography, IconButton } from '@mui/material'
import React from 'react'

type Props = {
  title: string
  mainColor: string
  disabledClose: boolean
  handleCloseModal: () => void
}

const PopupHeading = ({
  title,
  mainColor,
  disabledClose,
  handleCloseModal,
}: Props) => {
  return (
    <Paper
      sx={{
        backgroundColor: mainColor
          ? mainColor
          : (theme) => theme.palette.dotPurple[500],
        color: (theme) => theme.palette.text.primary,
        position: 'relative',
        px: 8,
        py: 1,
        mb: 1,
        pr: '40px !important',
      }}
    >
      <Typography
        variant='h4'
        textAlign={'center'}
        noWrap
        overflow={'hidden'}
        textOverflow={'ellipsis'}
      >
        {title}
      </Typography>
      <IconButtonCustomized
        variant='outlined'
        color='error'
        onClick={handleCloseModal}
        disabled={disabledClose}
        sx={{
          p: 0,
          position: 'absolute',
          top: '50%',
          right: 16,
          transform: 'translate(0, -50%)',
        }}
      >
        <SvgIconCustomized
          component={Icons.Close}
          sx={{
            fontSize: '22px',
          }}
        />
      </IconButtonCustomized>
    </Paper>
  )
}

export default PopupHeading
