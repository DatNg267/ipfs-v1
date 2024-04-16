import { backgroundToggleKeyframes } from '@/themes/_animation'
import { APP_FONT_FAMILY, breakpoints } from '@/themes/_theme'
import { fontSize } from '@/themes/font'
import { Box, Paper, Tab, Tabs } from '@mui/material'
import { debounce } from 'lodash'
import { useEffect, useRef } from 'react'

type Props = {
  tabIndex: number
  handleChange: (e: any, tabIndex: number) => void
  labelLeft?: string
  labelRight?: string
}

const ResultPreviewMainHeading = ({
  tabIndex,
  handleChange,
  labelRight,
  labelLeft,
}: Props) => {
  const btnLeftRef = useRef<HTMLElement | any | null>(null)
  const btnRightRef = useRef<HTMLElement | any | null>(null)
  const tabRootRef = useRef<HTMLElement | any | null>(null)
  const indicatorRef = useRef<HTMLElement | any | null>(null)

  useEffect(() => {
    const handleWindowResize = debounce(() => {
      const tabsRoot = tabRootRef.current as HTMLElement
      const tabLeft = btnLeftRef.current as HTMLElement
      const tabRight = btnRightRef.current as HTMLElement
      const indicator = indicatorRef.current as HTMLElement
      if (!tabLeft || !tabRight || !tabsRoot || !indicator) return
      if (tabIndex === 1) {
        indicator.style.transform = `translate(${
          tabsRoot.offsetWidth - tabRight.offsetWidth + 6
        }px ,-50%)`
        tabRight.style.borderColor = `#000`
        tabLeft.style.borderColor = `transparent`
      } else {
        indicator.style.transform = `translate(${
          tabLeft.offsetWidth - indicator.offsetWidth - 6
        }px ,-50%)`
        tabLeft.style.borderColor = `#000`
        tabRight.style.borderColor = `transparent`
      }
    }, 0)
    handleWindowResize()
    window.addEventListener('resize', handleWindowResize)
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [tabIndex])

  return (
    <Paper
      sx={{
        backgroundColor: 'background.paper',
        height: '56px',
        color: 'text.primary',
        py: '0px !important',
        display: 'flex',
        border: '1px solid',
        borderColor: 'border.dark',
        boxShadow: 'none',
        borderRadius: '48px',
        maxHeight: { xs: '40px', md: '48px' },
        px: { xs: 1, md: 2 },
        position: 'relative',
      }}
    >
      <Tabs
        ref={tabRootRef}
        value={tabIndex}
        onChange={handleChange}
        indicatorColor='secondary'
        textColor='inherit'
        id='tabs-root'
        sx={{
          flex: 1,
          minHeight: '0px',
          overflow: 'unset !important',
          '& .MuiTabs-scroller.MuiTabs-fixed': {
            overflow: 'unset !important',
          },
          '& .MuiTabs-flexContainer': {
            height: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
          '& .MuiButtonBase-root.MuiTab-root': {
            display: 'flex',
            alignItems: 'center',
            padding: 0,
            minWidth: 0,
            flex: 'unset',
            ...fontSize['24'],
            color: 'inherit',
            fontFamily: APP_FONT_FAMILY.ClashGrotesk,
            textTransform: 'none',
            fontWeight: 600,
            border: '1px solid',
            borderColor: 'border.dark',
            borderRadius: '16px',
            height: { xs: '32px', md: '32px' },
            minHeight: '0px',
            transition: 'all ease-in 0.2s',
            paddingRight: { xs: '26px', md: '32px' },
            paddingLeft: '8px',
            '&:last-child': {
              paddingLeft: { xs: '26px', md: '32px' },
              paddingRight: '8px',
            },

            [breakpoints.down('md')]: {
              ...fontSize['16'],
            },
          },
          '& .MuiTabs-indicator': {
            backgroundColor: 'transparent',
          },
        }}
      >
        <Tab
          ref={btnLeftRef}
          label={labelLeft ? labelLeft : 'Preview files'}
          value={0}
          sx={{
            alignItems: 'flex-start',
            border: '1px solid',
          }}
        />
        <Tab
          ref={btnRightRef}
          label={labelRight ? labelRight : 'Preview code'}
          value={1}
          sx={{
            alignItems: 'flex-end',
          }}
        />
      </Tabs>
      <Box
        component={'span'}
        ref={indicatorRef}
        id='tab-indicator'
        sx={{
          top: '50%',
          position: 'absolute',
          width: { xs: '20px', md: '24px' },
          height: { xs: '20px', md: '24px' },
          borderRadius: '50%',
          transition: 'all 0.4s ease ',
          animation: `${backgroundToggleKeyframes} 1s infinite `,
        }}
      />
    </Paper>
  )
}

export default ResultPreviewMainHeading
