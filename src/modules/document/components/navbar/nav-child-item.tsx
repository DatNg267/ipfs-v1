import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { Icons } from '@/themes/_icons'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import {
  Box,
  ListItemButtonProps,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import React, { ReactNode, useEffect } from 'react'
import {
  ListItemButtonChildrenStyled,
  ListItemIconChildrenStyled,
  ListItemTextChilrenStyled,
} from './styled'
import { useRouter } from 'next/router'
import { AppRouter } from '@/constants'
import Link from 'next/link'
import { handleToggleNavbar } from '@/layouts/document/services'
import FollowNav from './follow-nav'

type Props = {
  parentHref: string
  path: string
  text: string
  children?: ReactNode
  level: number
  isCollapsed?: boolean
  hasFollowNav?: boolean
  color?: string
  objColor?: any
  followNavBaseHref?: string
} & ListItemButtonProps
export const renderLevel = (level: number) => {
  switch (level) {
    case 1: {
      return '16px'
    }
    case 2: {
      return '48px'
    }
    case 3: {
      return '96px'
    }
    default: {
      return '96px'
    }
  }
}
const NavChildrenItem = ({
  parentHref,
  path,
  text,
  children,
  level,
  isCollapsed = false,
  hasFollowNav,
  color,
  objColor,
  followNavBaseHref,
  ...props
}: Props) => {
  const router = useRouter()
  const routePath = router.asPath
  if (routePath.includes('gateway')) {
  }
  const [open, setOpen] = React.useState(
    routePath.includes(AppRouter.DOCUMENT + '/' + path)
  )

  useEffect(() => {
    if (open === false) setOpen(routePath.includes(path))
  }, [router.asPath])

  const isSelected = hasFollowNav
    ? routePath.includes(AppRouter.DOCUMENT + '/' + path)
    : routePath === AppRouter.DOCUMENT + '/' + path
  const handleClick = () => {
    setOpen(!open)
  }
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>
      <Link href={`${parentHref}/${path}`} passHref>
        <ListItemButtonChildrenStyled
          className={isSelected ? 'selected' : ''}
          sx={{
            marginBottom: '0px',
            ml: renderLevel(level),
            ...props.sx,
          }}
          {...props}
        >
          <Stack
            direction={'row'}
            flex={1}
            onClick={(e) => {
              if (isMobile) {
                handleToggleNavbar()
              }
            }}
          >
            <ListItemIconChildrenStyled>
              <Box
                sx={{
                  width: '12px',
                  height: '12px',
                  border: '1px solid',
                  borderRadius: '99px',
                }}
              />
            </ListItemIconChildrenStyled>
            <ListItemTextChilrenStyled primary={text} />
            {hasFollowNav}
          </Stack>

          {(isCollapsed || hasFollowNav) && (
            <>
              {open ? (
                <ExpandLess
                  onClick={(e) => {
                    e.preventDefault()
                    isCollapsed || hasFollowNav ? handleClick() : undefined
                  }}
                />
              ) : (
                <ExpandMore
                  onClick={(e) => {
                    e.preventDefault()
                    isCollapsed || hasFollowNav ? handleClick() : undefined
                  }}
                />
              )}
            </>
          )}
        </ListItemButtonChildrenStyled>
      </Link>

      {isCollapsed && (
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List disablePadding>{children}</List>
        </Collapse>
      )}
      {hasFollowNav && (
        <Collapse in={open} timeout='auto' unmountOnExit>
          <FollowNav
            followNavBaseHref={followNavBaseHref}
            objColor={objColor}
            level={level + 1}
          ></FollowNav>
        </Collapse>
      )}
    </>
  )
}

export default NavChildrenItem
