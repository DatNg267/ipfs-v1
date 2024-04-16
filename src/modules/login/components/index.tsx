import ButtonCustomized from '@/components/atoms/button'
import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { AppRouter } from '@/constants/routers'
import { Icons } from '@/themes/_icons'
import { Box, Button, Stack, Typography } from '@mui/material'
import Link from 'next/link'

type Props = {
  pushHrefSuccess?: string
  directionText?: string
  title: string
  description: string
}

const Congratulation = ({
  title,
  description,
  pushHrefSuccess = AppRouter.LOGIN,
  directionText = 'Go to login',
}: Props) => {
  return (
    <Stack spacing={{ xs: 4, md: 4 }}>
      <Box
        flex={1}
        sx={{
          width: { xs: 'unset', md: 'fit-content' },
          position: 'relative',
        }}
      >
        <Typography variant='h4' textAlign={'center'}>
          {title}
        </Typography>

        <SvgIconCustomized
          component={Icons.Subtract}
          viewBox='0 0 25 31'
          sx={{
            position: 'absolute',
            bottom: '-30%',
            left: 'calc(-0% - 14px)',
            transform: 'translateX(-100%)',
            fontSize: '21px',
            color: (theme) => theme.palette.dotPurple[500],
          }}
        ></SvgIconCustomized>
        <SvgIconCustomized
          component={Icons.Subtract}
          viewBox='0 0 25 31'
          sx={{
            position: 'absolute',
            top: '-8px',
            left: '34px',
            transform: 'translate(-0%, -30%)',
            fontSize: '30px',
            color: (theme) => theme.palette.dotMint[500],
          }}
        ></SvgIconCustomized>
        <SvgIconCustomized
          component={Icons.Subtract}
          viewBox='0 0 25 31'
          sx={{
            position: 'absolute',
            top: '-8px',
            left: '34px',
            transform: 'translate(100%, -70%)',
            fontSize: '21px',
            color: (theme) => theme.palette.dotBlue[500],
          }}
        ></SvgIconCustomized>

        <SvgIconCustomized
          component={Icons.Subtract}
          viewBox='0 0 25 31'
          sx={{
            position: 'absolute',
            top: '0%',
            right: '-30px',
            transform: 'translate(40%, -10%)',
            fontSize: '34px',
            color: (theme) => theme.palette.dotOrange[500],
          }}
        ></SvgIconCustomized>
        <SvgIconCustomized
          component={Icons.Subtract}
          viewBox='0 0 25 31'
          sx={{
            position: 'absolute',
            bottom: '0%',
            right: '-30px',
            transform: 'translate(-10%, -10%)',
            fontSize: '21px',
            color: (theme) => theme.palette.dotYellow[600],
          }}
        ></SvgIconCustomized>
      </Box>
      <Typography variant='body1' textAlign={{ xs: 'center', md: 'left' }}>
        {description}
      </Typography>

      <Link href={pushHrefSuccess} passHref>
        <ButtonCustomized
          variant='contained'
          color='secondary'
          fullWidth
          size='large'
        >
          {directionText}
        </ButtonCustomized>
      </Link>
    </Stack>
  )
}

export default Congratulation
