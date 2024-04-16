import { backgroundToggleKeyframes } from '@/themes/_animation'
import { APP_FONT_FAMILY } from '@/themes/_theme'
import { fontSize } from '@/themes/font'
import { Box, Paper, Tab, Tabs } from '@mui/material'

type Props = {
  tabIndex: number
  handleChange: (e: any, tabIndex: number) => void
  labelLeft?: string
  labelRight?: string
}

const TabHeading = ({
  tabIndex,
  handleChange,
  labelRight,
  labelLeft,
}: Props) => {
  return (
    <Paper
      sx={{
        backgroundColor: 'background.default',
        height: '56px',
        color: 'primary.main',
        py: '0px !important',
        display: 'flex',
        border: '1px solid',
        borderColor: 'primary.main',
        boxShadow: 'none',
        borderRadius: '16px',
        maxHeight: '44px',
        px: 2,
        mx: 0,
      }}
    >
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        indicatorColor='secondary'
        textColor='inherit'
        variant='fullWidth'
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
            height: '100%',
            padding: 0,
            width: 'fit-content',
            minWidth: 0,
            flex: 'unset',
            ...fontSize['18'],
            color: 'inherit',
            fontFamily: APP_FONT_FAMILY.ClashGrotesk,
            textTransform: 'none',
            fontWeight: 500,
            borderRadius: '16px',
            px: 2,
            minHeight: '0px',
            transition: 'all ease-in 0.2s',
            display: 'flex',
            border: 'none !important',
          },
          '& .MuiTabs-indicator': {
            backgroundColor: 'transparent',
          },
          '& .MuiTouchRipple-root': {
            display: 'none',
          },
        }}
      >
        <Box
          id='tab-indicator'
          sx={{
            position: 'absolute',
            width: '21px',
            height: '21px',
            borderRadius: '50%',
            transition: 'all 0.5s ',
            animation: `${backgroundToggleKeyframes} 1s infinite `,
          }}
        />
        <Tab
          label={labelLeft ? labelLeft : 'Preview files'}
          value={0}
          id={'tab-0'}
          sx={{
            alignItems: 'flex-start',
            paddingRight: '32px',
          }}
        />
        <Tab
          label={labelRight ? labelRight : 'Preview code'}
          value={1}
          id={'tab-1'}
          sx={{
            alignItems: 'flex-end',
          }}
        />
      </Tabs>
    </Paper>
  )
}

export default TabHeading
