import {
  AppRouter,
  DOCUMENT_HEADING_MOBILE_HEIGHT,
  MOBILE_HEADING_DOCUMENT_NOT_SCROLLING_HEIGHT,
  MOBILE_HEADING_DOCUMENT_SCROLLING_HEIGHT,
} from '@/constants'
import { Icons } from '@/themes/_icons'
import {
  Box,
  Paper,
  Stack,
  Typography,
  listItemButtonClasses,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import List from '@mui/material/List'
import { NavBarItemType } from '../../../../layouts/document/types'
import NavChildrenItem from './nav-child-item'
import NavParentItem from './nav-parent-item'
import { useEffect } from 'react'
import {
  getDocumentNavbarItemColor,
  getDocumentNavbarItemObjColor,
  renderIcon,
} from './services'
import { Navs } from '../../types'
import { ScrollBarStyled } from '@/themes/_theme'
import { colorTheme } from '@/themes/_color'

type Props = { navList: Navs }

const renderChild = (
  pages: any[],
  level: number,
  parentIndex: number
): NavBarItemType[] => {
  return pages.map((item, index) => {
    const itemNavData: NavBarItemType = {
      index: parentIndex,
      type: 'child',
      level: level,
      slug: item.slug,
      path: item.path,
      text: item.title,
      icon: Icons.Home,
      childs: item.pages ? renderChild(item.pages, level + 1, parentIndex) : [],
      color: getDocumentNavbarItemColor(parentIndex),
      objColor: getDocumentNavbarItemObjColor(parentIndex),
    }
    // if (item.path === 'concepts/ipfs-protocol') {
    //   return {
    //     ...itemNavData,
    //     hasFollowNav: true,
    //     followNavBaseHref: AppRouter.DOCUMENT + '/concepts/ipfs-protocol',
    //   }
    // }
    return itemNavData
  })
}

const DocumentNav = ({ navList }: Props) => {
  let convertedList: NavBarItemType[] = navList.pages.map(
    (item: any, index: number) => {
      const itemNavData: NavBarItemType = {
        index: index,
        type: 'parent',
        level: 0,
        slug: item.slug,
        path: item.path,
        text: item.title,
        icon: renderIcon(item.slug),
        childs: item.pages ? renderChild(item.pages, 1, index) : [],
        color: getDocumentNavbarItemColor(index),
        objColor: getDocumentNavbarItemObjColor(index),
      }
      // if (item.path === 'concepts/ipfs-protocol') {
      //   return {
      //     ...itemNavData,
      //     hasFollowNav: true,
      //     followNavBaseHref:
      //       '/' + AppRouter.DOCUMENT + '/concepts/ipfs-protocol',
      //   }
      // }
      return itemNavData
    }
  )
  // Responsive document
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    if (!isMobile) {
      handleOpenNavbar()
    } else {
      handleCloseNavbar()
    }
  }, [isMobile])
  const handleCloseNavbar = () => {
    let navbar = document.querySelector('#document-navbar') as HTMLElement
    let body = document.querySelector('body') as HTMLElement
    navbar.classList.remove('open')
    navbar.style.transform = 'translate(-110%, 0)'
    navbar.style.display = 'none'
    body.style.overflowY = 'unset'
  }
  const handleOpenNavbar = () => {
    let navbar = document.querySelector('#document-navbar') as HTMLElement
    let body = document.querySelector('body') as HTMLElement
    let wrapper = document.querySelector('#document-wrapper') as HTMLElement

    navbar.style.transform = 'translate(0, 0)'
    body.style.overflowY = 'unset'
    wrapper.style.overflow = 'unset'
    navbar.style.display = 'flex'
  }

  // useEffect(() => {
  //   window.addEventListener('scroll', (e) => {
  //     const documentNavbar = document.querySelector(
  //       '#document-navbar'
  //     ) as HTMLElement
  //     if (!documentNavbar) return
  //     if (!isMobile) {
  //       documentNavbar.style.top = `${0}px`
  //       documentNavbar.style.maxHeight = `calc(100vh - ${0}px)`
  //       documentNavbar.style.height = `calc(100vh - ${0}px)`
  //     }

  //     if (window.scrollY > 32 && isMobile) {
  //       documentNavbar.style.top = `${MOBILE_HEADING_DOCUMENT_SCROLLING_HEIGHT}px`
  //       documentNavbar.style.maxHeight = `calc(100vh - ${MOBILE_HEADING_DOCUMENT_SCROLLING_HEIGHT}px)`
  //       documentNavbar.style.height = `calc(100vh - ${MOBILE_HEADING_DOCUMENT_SCROLLING_HEIGHT}px)`
  //     }
  //     if (window.scrollY <= 32 && isMobile) {
  //       documentNavbar.style.top = `${MOBILE_HEADING_DOCUMENT_NOT_SCROLLING_HEIGHT}px`
  //       documentNavbar.style.maxHeight = `calc(100vh - ${MOBILE_HEADING_DOCUMENT_NOT_SCROLLING_HEIGHT}px)`
  //       documentNavbar.style.height = `calc(100vh - ${MOBILE_HEADING_DOCUMENT_NOT_SCROLLING_HEIGHT}px)`
  //     }
  //   })

  //   return () => {
  //     window.removeEventListener('scroll', (e) => {})
  //   }
  // }, [isMobile])
  return (
    <Stack
      id={'document-navbar'}
      className=''
      sx={{
        width: { xs: 'unset', md: '340px' },
        minWidth: { xs: 'unset', md: '340px' },
        top: { xs: `${56}px`, md: `${68}px` },
        bottom: 0,
        zIndex: 300,
        position: { xs: 'fixed', md: 'sticky' },
        right: { xs: '2px', md: 'unset' },
        left: { xs: '2px', md: 'unset' },
        mr: { xs: 0, md: 1 },
        transition: { xs: 'all ease-in 0.2s', md: 'all ease-in 0.05s' },
        transform: { xs: 'translate(-110%, 0px)', md: 'unset' },
      }}
    >
      <Paper
        sx={{
          margin: 0,
          flex: 1,
          px: '4px',
          pt: '0px',
          justifyContent: 'space-between',
          display: 'flex',
          flexDirection: 'column',
          height: { xs: 'auto', md: `calc(100vh - ${68}px)` },
          maxHeight: { xs: 'auto', md: `calc(100vh - ${68}px)` },
          ...(isMobile && {
            maxHeight: `calc(100vh - ${DOCUMENT_HEADING_MOBILE_HEIGHT}px)`,
            height: `calc(100vh - ${DOCUMENT_HEADING_MOBILE_HEIGHT}px)`,
            px: '4px !important',
          }),
        }}
      >
        <Box
          sx={{
            overflowY: { xs: 'auto', md: 'auto' },
            px: '16px',
            pt: '16px',
            ...ScrollBarStyled,
          }}
        >
          <Box
            sx={{
              margin: 0,
              flex: 1,
            }}
          >
            <List
              disablePadding
              sx={{
                width: '100%',
                bgcolor: 'background.paper',
                [`& a:first-of-type .${listItemButtonClasses.root}`]: {
                  marginTop: 0,
                },
              }}
              component='div'
            >
              {convertedList &&
                convertedList.map((item, index) => {
                  return renderItem(item, AppRouter.DOCUMENT)
                })}
            </List>
          </Box>
        </Box>
        <Stack
          // sx={{ height: '128px', minHeight: '128px' }}
          alignItems={'center'}
          justifyContent={'flex-end'}
          pt={'28px'}
          pb={'8px'}
        >
          <Typography
            variant='button'
            sx={{
              color: colorTheme.light.primary[900],
            }}
            fontWeight={600}
            textTransform={'none'}
          >
            Powered by AIOZ Network
          </Typography>
          <Typography
            variant='button'
            sx={{
              color: colorTheme.light.primary[700],
            }}
            fontWeight={500}
            textTransform={'none'}
          >
            Version 1.0.1
          </Typography>
        </Stack>
      </Paper>
    </Stack>
  )
}

const renderItem = (item: NavBarItemType, parentHref: string) => {
  if (item.type === 'parent') {
    if (item.childs.length > 0) {
      return (
        <NavParentItem
          parentHref={parentHref}
          path={item.path}
          key={item.text}
          icon={item.icon}
          text={item.text}
          isCollapsed={item.childs.length > 0}
          hasFollowNav={item.hasFollowNav}
          color={item.color}
        >
          {item.childs &&
            item.childs.map((child) => renderItem(child, parentHref))}
        </NavParentItem>
      )
    } else {
      return (
        <NavParentItem
          parentHref={parentHref}
          path={item.path}
          key={item.text}
          icon={item.icon}
          text={item.text}
          isCollapsed={item.childs.length > 0}
          hasFollowNav={item.hasFollowNav}
          color={item.color}
        />
      )
    }
  } else {
    if (item.childs.length > 0)
      return (
        <NavChildrenItem
          parentHref={parentHref}
          path={item.path}
          key={item.text}
          isCollapsed={item.childs.length > 0}
          text={item.text}
          level={item.level}
          hasFollowNav={item.hasFollowNav}
          color={item.color}
          objColor={item.objColor}
          followNavBaseHref={item.followNavBaseHref}
        >
          {item.childs &&
            item.childs.map((child) => renderItem(child, parentHref))}
        </NavChildrenItem>
      )
    else
      return (
        <Box key={item.text}>
          <NavChildrenItem
            parentHref={parentHref}
            path={item.path}
            isCollapsed={item.childs.length > 0}
            text={item.text}
            level={item.level}
            hasFollowNav={item.hasFollowNav}
            color={item.color}
            objColor={item.objColor}
            followNavBaseHref={item.followNavBaseHref}
          />
        </Box>
      )
  }
}
export default DocumentNav
