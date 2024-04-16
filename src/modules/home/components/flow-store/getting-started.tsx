import ButtonCustomized from '@/components/atoms/button'
import { AppRouter } from '@/constants'
import { AuthorizeStatus } from '@/redux/auth/reducer'
import { Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'

type Props = {}

const GettingStarted = (props: Props) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const router = useRouter()

  // const handleClick = async () => {
  //   const res = await handleCheckAuthorization()
  //   if (res === AuthorizeStatus.NOT_LOGGED || res === AuthorizeStatus.INVALID) {
  //     router.push({
  //       pathname: AppRouter.LOGIN,
  //       query: {
  //         prev: AppRouter.HOME,
  //         pass: AppRouter.IPFS_FILES,
  //       },
  //     })
  //   } else if (res === AuthorizeStatus.VALID) {
  //     router.push({
  //       pathname: AppRouter.IPFS_FILES,
  //     })
  //   } else {
  //   }
  // }
  return (
    <Stack
      spacing={4}
      sx={{
        minWidth: { xs: '100%', md: '611px' },
        maxWidth: { xs: '100%', md: '611px' },
        overflow: { xs: 'hidden', md: 'unset' },
      }}
      justifyContent={'center'}
    >
      <Typography variant={'h4'} textAlign={{ xs: 'center', md: 'right' }}>
        GETTING STARTED IS EASY
      </Typography>
      <Typography
        variant='body2'
        sx={{
          wordWrap: 'break-word',
        }}
        textAlign={{ xs: 'center', md: 'right' }}
      >
        Create your W3IPFS.STORAGE account today and take control of your file
        storage in the Web3 era. Integrate seamlessly with IPFS and NFT storage
        for your Web3 dApps in just seconds. Empower your applications with
        secure and decentralized storage, accelerating your journey in the Web3
        revolution
      </Typography>
      <Stack alignItems={{ xs: 'unset', md: 'flex-end' }}>
        <Link href={AppRouter.IPFS_FILES} passHref>
          <ButtonCustomized
            variant='contained'
            color='secondary'
            sx={{
              width: { xs: '100%', md: 'fit-content' },
              px: '60px',
              py: '8px',
            }}
          >
            Try Now
          </ButtonCustomized>
        </Link>
      </Stack>
    </Stack>
  )
}

export default GettingStarted
