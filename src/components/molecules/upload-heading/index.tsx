import IconButtonCustomized from '@/components/atoms/icon-button'
import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { useCancelProgress } from '@/redux/cancel-progress/hooks'
import { useAppSelector } from '@/redux/hooks'
import { useStopAnimateLoading } from '@/redux/upload-wrapper/hooks'
import { Icons } from '@/themes/_icons'
import { APP_FONT_FAMILY } from '@/themes/_theme'
import { Container, Paper, Stack, Typography } from '@mui/material'

type Props = {
  handleCloseUpload: () => void
  color: string
  text: string
}

const UploadHeading = ({ handleCloseUpload, color, text }: Props) => {
  const { source } = useAppSelector((state) => state.cancelProgress)
  const handleCancelProgress = useCancelProgress()
  const handleStopAnimateLoading = useStopAnimateLoading()

  return (
    <Paper
      sx={{
        backgroundColor: color,
        px: { xs: 2, md: '28px' },
        height: { xs: '48px', md: 'unset' },
      }}
    >
      <Container maxWidth='xl'>
        <Stack direction='row' justifyContent={'space-between'}>
          <Stack
            direction={'row'}
            alignItems={'center'}
            spacing={8}
            overflow={'hidden'}
          >
            <Typography
              fontFamily={APP_FONT_FAMILY.ARRAY}
              fontWeight={'medium'}
              overflow={'hidden'}
              textOverflow={'ellipsis'}
              sx={{
                whiteSpace: 'nowrap',
                fontSize: { xs: '26px', md: '60px !important' },
                lineHeight: { xs: '34px', md: '64px !important' },
              }}
            >
              {text}
            </Typography>
          </Stack>

          <Stack direction={'row'} alignItems={'center'} spacing={2}>
            <IconButtonCustomized
              sx={{
                height: { xs: '32px', md: '44px' },
                width: { xs: '32px', md: '44px' },
              }}
              variant='outlined'
              color='error'
              onClick={() => {
                if (source) {
                  handleStopAnimateLoading()
                  handleCancelProgress()
                }
                handleCloseUpload()
              }}
            >
              <SvgIconCustomized
                component={Icons.Close}
                sx={{
                  fontSize: { xs: '16px', md: '24px' },
                }}
              ></SvgIconCustomized>
            </IconButtonCustomized>{' '}
          </Stack>
        </Stack>
      </Container>
    </Paper>
  )
}

export default UploadHeading
