import { styled, menuItemClasses, MenuItem, MenuItemProps } from '@mui/material'
import React from 'react'

export const MenuItemStyled = styled(MenuItem)(({ theme }) => ({
  border: 'none',
  borderRadius: '0px',
  fontWeight: 700,
  '&:hover': {
    backgroundColor: theme.palette.baseGray[800],
    color: theme.palette.primary.main,
    borderRadius: '0px',
  },
  [`& .${menuItemClasses}`]: {},
}))
export const MenuItemDangerStyled = styled(MenuItem)(({ theme }) => ({
  border: 'none',
  borderRadius: '0px',
  fontWeight: 700,
  color: theme.palette.red[500],
  '&.Mui-selected': {
    backgroundColor: theme.palette.red[500],
    color: theme.palette.primary.main,
    borderRadius: '0px',
  },
  '&:hover': {
    backgroundColor: theme.palette.red[500],
    color: theme.palette.primary.main,
    borderRadius: '0px',
  },
  '&:hover.Mui-selected': {
    backgroundColor: theme.palette.red[500],
    color: theme.palette.primary.main,
    borderRadius: '0px',
  },
  [`& .${menuItemClasses}`]: {},
}))
export type MenuItemCustomizedType = {
  type?: 'normal' | 'danger'
}
const MenuItemCustomized = (props: MenuItemCustomizedType & MenuItemProps) => {
  const { type } = props
  if (type === 'danger')
    return <MenuItemDangerStyled className='danger' {...props} />
  else return <MenuItemStyled {...props} />
}
export default MenuItemCustomized
