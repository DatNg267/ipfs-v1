import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { Icons } from '@/themes/_icons'
import { APP_FONT_FAMILY, breakpoints } from '@/themes/_theme'
import { fontSize } from '@/themes/font'
import {
  Box,
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material'
import React from 'react'

type Props = {
  open: boolean
  index: number
  handleOpen: (index: number) => void
  title: string
  content: string
  color: string
}

const Question = ({
  open,
  handleOpen,
  index,
  title,
  content,
  color,
}: Props) => {
  return (
    <Paper
      sx={{
        mx: 0,
        padding: 4,
        backgroundColor: open ? color : 'transparent',
        ...(open && {
          flex: 1,
        }),
        boxShadow: 'none',
        border: '1px solid',
        borderColor: 'border.dark',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: color,
          '& .MuiSvgIcon-root': {
            transition: 'all 0.5s',
            transform: 'rotate(180deg)',
          },
        },
      }}
      onClick={() => handleOpen(index)}
    >
      <ListItemButton
        disableGutters
        disableRipple
        sx={{
          justifyContent: 'flex-start',
          m: 0,
          p: 0,
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
      >
        <ListItemText
          primary={title}
          sx={{
            m: 0,
            '& .MuiTypography-root': {
              ...fontSize['18'],
              fontFamily: APP_FONT_FAMILY.ARRAY,
              fontWeight: 600,
              [breakpoints.down('md')]: {
                ...fontSize['16'],
                fontFamily: APP_FONT_FAMILY.ClashGrotesk,
                fontWeight: 600,
              },
            },
          }}
        />
        {open ? (
          <SvgIconCustomized component={Icons.CircleRemove} />
        ) : (
          <SvgIconCustomized component={Icons.CircleAdd} />
        )}
      </ListItemButton>
      <Collapse in={open} timeout='auto' sx={{ mt: open ? '16px' : '0' }}>
        {content}
      </Collapse>
    </Paper>
  )
}

export default Question
