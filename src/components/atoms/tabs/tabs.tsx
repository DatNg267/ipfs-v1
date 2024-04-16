import { APP_FONT_FAMILY } from '@/themes/_theme'
import { Tabs, styled } from '@mui/material'

export const TabsStyled = styled(Tabs)(({ theme, sx, style }) => {
  return {
    backgroundColor: '#ccccbd',
    position: 'relative',
    overflow: 'unset',
    borderBottom: '1px solid',
    borderColor: theme.palette.baseGray[1000],
    '& .MuiTabs-flexContainer': {
      display: 'flex',
      justifyContent: 'space-around',
    },
    '& .MuiTab-root': {
      color: theme.palette.baseGray[500],
      textTransform: 'none',
      fontWeight: 'bold',
      fontFamily: APP_FONT_FAMILY.ARRAY,
      fontSize: '26px',
      lineHeight: '36px',
      letterSpacing: '-0.04em',
      padding: 16,
    },
    '& .MuiTabs-scroller': {
      overflow: 'unset !important',
    },
    '& .MuiTab-root.Mui-selected': {
      color: 'black',
    },

    '& .MuiTabs-indicator': {
      backgroundColor: 'transparent',
      height: '2px',
      bottom: 0,
      borderRadius: '99px',
    },
    '& .MuiTabs-indicator::before': {
      content: '""',
      position: 'absolute',
      width: '24px',
      backgroundColor: 'black',
      height: '24px',
      bottom: 0,
      right: '50%',
      borderRadius: '99px',
      transform: 'translateY(50%) translateX(50%)',
    },
  }
})
