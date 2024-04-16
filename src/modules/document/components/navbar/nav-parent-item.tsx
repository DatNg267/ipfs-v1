import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import React, { ReactNode, useEffect } from 'react'
import {
  ListItemButtonStyled,
  ListItemIconStyled,
  ListItemTextStyled,
} from './styled'
import { useRouter } from 'next/router'
import { AppRouter } from '@/constants'
import Link from 'next/link'
import { getDocumentNavbarItemColor } from './services'
import {
  Stack,
  listItemIconClasses,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { colorTheme } from '@/themes/_color'
import { handleToggleNavbar } from '@/layouts/document/services'

type Props = {
  parentHref: string
  path: string
  icon: any
  text: string
  children?: ReactNode
  isCollapsed?: boolean
  hasFollowNav?: boolean
  color?: string
}

const NavParentItem = ({
  parentHref,
  path,
  icon,
  text,
  children,
  isCollapsed = false,
  hasFollowNav,
  color,
}: Props) => {
  const router = useRouter()
  const routePath = router.asPath
  const [open, setOpen] = React.useState(
    routePath.includes(AppRouter.DOCUMENT + '/' + path)
  )
  const isSelected = routePath.includes(AppRouter.DOCUMENT + '/' + path)
  useEffect(() => {
    if (open === false)
      setOpen(routePath.includes(AppRouter.DOCUMENT + '/' + path))
  }, [router.asPath])

  const handleClick = () => {
    setOpen(!open)
  }

  const Icon = icon

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const handleCloseNavbar = () => {
    let navbar = document.querySelector('#document-navbar') as HTMLElement
    let body = document.querySelector('body') as HTMLElement
    navbar.classList.remove('open')
    navbar.style.transform = 'translate(-110%, 0)'
    navbar.style.display = 'none'
    body.style.overflowY = 'unset'
  }
  return (
    <>
      {isCollapsed && (
        <ListItemButtonStyled
          className={isSelected ? 'selected' : ''}
          onClick={(e) => {
            e.preventDefault()
            isCollapsed ? handleClick() : undefined
          }}
        >
          <Stack direction={'row'} flex={1} alignItems={'center'}>
            <ListItemIconStyled>
              <Icon />
            </ListItemIconStyled>
            <ListItemTextStyled primary={text} />
          </Stack>

          {isCollapsed && <>{open ? <ExpandLess /> : <ExpandMore />}</>}
        </ListItemButtonStyled>
      )}
      {!isCollapsed && (
        <Link href={`${parentHref}/${path}`} passHref>
          <ListItemButtonStyled className={isSelected ? 'selected' : ''}>
            <Stack
              direction={'row'}
              flex={1}
              alignItems={'center'}
              onClick={(e) => {
                if (isMobile) {
                  handleToggleNavbar()
                }
              }}
            >
              <ListItemIconStyled>
                <Icon />
              </ListItemIconStyled>
              <ListItemTextStyled primary={text} />
            </Stack>
          </ListItemButtonStyled>
        </Link>
      )}
      {isCollapsed && (
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List>{children}</List>
        </Collapse>
      )}
    </>
  )
}

export default NavParentItem
