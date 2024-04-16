import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { ZINDEX_TOAST_NOTIFY } from '@/constants/ui-index'
import { Icons } from '@/themes/_icons'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import { toast, useToaster } from 'react-hot-toast'

const ToastCustomized = () => {
  const { toasts, handlers } = useToaster({ duration: 5000 })
  const { startPause, endPause, calculateOffset, updateHeight } = handlers
  return (
    <Box
      style={{
        position: 'fixed',
        zIndex: ZINDEX_TOAST_NOTIFY,
        height: 'fit-content',
        left: '50%',
        top: 4,
        // inset: '16px',
        display: toasts.length > 0 ? 'block' : 'none',
      }}
      onMouseEnter={startPause}
      onMouseLeave={endPause}
    >
      {toasts.map((toastItem) => {
        const offset = calculateOffset(toastItem, {
          reverseOrder: false,
          gutter: 10,
        })
        const ref = (el: any) => {
          if (el && !toastItem.height) {
            const height = el.getBoundingClientRect().height
            updateHeight(toastItem.id, height)
          }
        }
        return (
          <Stack
            key={toastItem.id}
            ref={ref}
            justifyContent={'center'}
            alignItems={'center'}
            sx={{
              top: 0,
              left: 0,
              right: 0,
              position: 'absolute',
              transition: 'all 0.2s',
              transform: `translateY(${offset}px)`,
              opacity: toastItem.visible ? 1 : 0,
            }}
          >
            <Stack
              direction={'row'}
              spacing={1}
              alignItems={'center'}
              sx={{
                backgroundColor: (theme) => theme.palette.background.paper,
                borderRadius: '16px',
                border: '1px solid',
                borderColor: (theme) => theme.palette.baseGray[1000],
                width: { xs: '80vw', md: '540px' },
                maxWidth: { xs: '80vw', md: '540px' },
                overflow: 'hidden',
                padding: 1,
              }}
            >
              <Stack
                alignItems={'center'}
                justifyContent={'center'}
                sx={{
                  width: '88px',
                  height: '88px',
                  backgroundColor:
                    toastItem.type === 'success'
                      ? (theme) => theme.palette.dotGreen[300]
                      : toastItem.type === 'error'
                      ? (theme) => theme.palette.red[200]
                      : (theme) => theme.palette.baseGray[100],
                  borderRadius: '16px',
                }}
              >
                <Stack
                  alignItems='center'
                  justifyContent='center'
                  sx={{
                    borderRadius: '99px',
                    width: '40px',
                    height: '40px',
                    backgroundColor:
                      toastItem.type === 'success'
                        ? (theme) => theme.palette.dotGreen[500]
                        : toastItem.type === 'error'
                        ? (theme) => theme.palette.red[500]
                        : (theme) => theme.palette.baseGray[100],
                  }}
                >
                  <SvgIconCustomized
                    component={
                      toastItem.type === 'success'
                        ? Icons.Check
                        : toastItem.type === 'error'
                        ? Icons.WarningNoCircle
                        : Icons.Check
                    }
                    sx={{
                      fontSize: '20px',

                      color: (theme) => theme.palette.baseGray[1000],
                    }}
                  />
                </Stack>
              </Stack>
              <Stack justifyContent={'center'} flex={1} p={2}>
                <Typography variant='subtitle2' fontWeight={600}>
                  {toastItem.type === 'success'
                    ? 'Success'
                    : toastItem.type === 'error'
                    ? 'Error'
                    : ''}
                  !
                </Typography>
                <Typography variant='body2' fontWeight={500}>
                  {toastItem && toastItem.message?.toString()}
                </Typography>
              </Stack>
              <IconButton
                onClick={(e) => {
                  toast.dismiss(toastItem.id)
                  toast.remove(toastItem.id)
                }}
              >
                <SvgIconCustomized component={Icons.CloseCircle} />
              </IconButton>
            </Stack>
          </Stack>
        )
      })}
    </Box>
  )
}

export default ToastCustomized
