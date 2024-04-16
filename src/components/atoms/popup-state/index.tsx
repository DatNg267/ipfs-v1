import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { Box } from '@mui/material'
import React, { MouseEvent, useState } from 'react'

type PopupWrapperProps = {
  children: (data: PopupWrapperExportData) => ReactJSXElement
}

export type PopupWrapperExportData = {
  handleClick: (event: MouseEvent<HTMLElement>) => void
  anchorEl: null | HTMLElement
  handleClose: () => void
  open: boolean
}

const PopupWrapper = ({ children }: PopupWrapperProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return children({
    handleClick,
    anchorEl,
    handleClose,
    open,
  })
}

export default PopupWrapper
