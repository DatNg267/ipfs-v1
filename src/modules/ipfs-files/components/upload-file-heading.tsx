import IconButtonCustomized from '@/components/atoms/icon-button'
import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { Icons } from '@/themes/_icons'
import { APP_FONT_FAMILY, breakpoints } from '@/themes/_theme'
import { Paper, Stack, Typography } from '@mui/material'
import { useContext } from 'react'
import { IpfsFilesPageContext } from '../resources'
import { useAppSelector } from '@/redux/hooks'
import { useCancelProgress } from '@/redux/cancel-progress/hooks'

const UploadFileHeading = ({ title }: { title: string }) => {
  const { handleCloseUploadFile } = useContext(IpfsFilesPageContext)
  const { source } = useAppSelector((state) => state.cancelProgress)
  const handleCancelProgress = useCancelProgress()
  return (
    <Paper
      sx={{
        backgroundColor: (theme) => theme.palette.dotMint[500],
        px: { xs: 2, md: '28px' },
        py: 2,
      }}
    >
      <Stack direction='row' justifyContent={'space-between'}>
        <Stack direction={'row'} alignItems={'center'} spacing={8}>
          <Typography
            fontFamily={APP_FONT_FAMILY.ARRAY}
            fontWeight={'medium'}
            sx={{
              fontSize: { xs: '26px', md: '60px !important' },
              lineHeight: { xs: '34px', md: '64px !important' },
            }}
          >
            {title}
          </Typography>
        </Stack>

        <Stack direction={'row'} alignItems={'center'} spacing={2}>
          <IconButtonCustomized
            variant='outlined'
            color='error'
            sx={{
              width: '44px',
              height: '44px',
              [breakpoints.down('md')]: {
                width: '32px',
                height: '32px',
              },
            }}
            onClick={() => {
              if (source) {
                handleCancelProgress()
              }
              handleCloseUploadFile()
            }}
          >
            <SvgIconCustomized component={Icons.Close}></SvgIconCustomized>
          </IconButtonCustomized>
        </Stack>
      </Stack>
    </Paper>
  )
}

export default UploadFileHeading
