import TypographyIPFS from '@/components/atoms/typography-ipfs'
import CodeTabs from '@/components/organisms/code-tabs'
import { AppRouter } from '@/constants'
import {
  CODE_GET_FILE_BY_CID_STRING,
  CODE_UPLOAD_FILE_STRING,
} from '@/constants/code'
import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useState } from 'react'
import StoreDropZone from './drop-zone'
import ButtonCustomized from '@/components/atoms/button'
const MultiCol = dynamic(() => import('./multi-col'), { ssr: false })
type Props = {}
export const STORE_MAX_HEIGH = 520
export const STORE_MAX_HEIGH_MB = 408
const StoreFile = (props: Props) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [tabIndex, setTabIndex] = useState(0)
  const handleChangeTabIndex = (
    event: React.SyntheticEvent,
    tabIndex: number
  ) => {
    setTabIndex(tabIndex)
  }
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={{ xs: '16px', md: '8px' }}
      sx={{
        maxHeight: {
          xs: `auto`,
          md: ` ${STORE_MAX_HEIGH}px`,
        },
        minHeight: {
          xs: `auto`,
          md: ` ${STORE_MAX_HEIGH}px`,
        },
        // paddingTop: '12px',
      }}
    >
      <Stack
        spacing={4}
        sx={{
          width: { xs: '100%', md: '516px' },
          overflow: 'hidden',
        }}
        justifyContent={'space-between'}
      >
        <Typography
          variant='h3'
          component='span'
          letterSpacing={'0.04em'}
          textAlign={{ xs: 'center', md: 'left' }}
          sx={{
            verticalAlign: 'middle',
          }}
        >
          STORE FILES IN W3
          <TypographyIPFS variant='h3' component='span'></TypographyIPFS>
          .STORAGE
        </Typography>
        <Box>
          <Typography variant='body1'>
            Eliminate silos with the W3IPFS.STORAGE platform. Using IPFS and
            other decentralized protocols, create a true data layer that
            connects you, your users, and the Web, regardless of where content
            is stored - client-side, in the cloud, or elsewhere.
          </Typography>
          <br></br>
          <Typography variant='body1'>
            Sounds hard? It ${`isn't`}. Our client libraries are super
            easy-to-use, abstracting the complexity of these decentralized
            protocols.
            <br></br> And we provide services like data storage designed to
            natively support these protocols, so things just work without you
            ever being locked-in.
          </Typography>
        </Box>
        <Link
          href={`${
            AppRouter.DOCUMENT +
            '/tutorials/store-and-mint-nfts-using-erc-1155-metadata-standards'
          }`}
          passHref
          target='_blank'
        >
          <ButtonCustomized
            variant='outlined'
            color='secondary'
            size='large'
            sx={{ width: { xs: '100%', md: '187px' } }}
          >
            Learn More
          </ButtonCustomized>
        </Link>
      </Stack>
      <Box
        flex={1}
        sx={{
          maxWidth: { xs: '100%', md: '100%' },
          width: { xs: '100%', md: '100%' },
          position: 'relative',
          ...(isMobile && {
            maxHeight: {
              xs: `${STORE_MAX_HEIGH_MB}px`,
              md: ` ${STORE_MAX_HEIGH}px`,
            },
            minHeight: {
              xs: `${STORE_MAX_HEIGH_MB}px`,
              md: ` ${STORE_MAX_HEIGH}px`,
            },
          }),
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            border: '1px solid #A6A69A',
            borderRadius: '16px',
          }}
        >
          <MultiCol></MultiCol>
        </Box>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            background: 'transparent',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '24px',
              left: '24px',
              right: '24px',
              bottom: '24px',
            }}
          >
            <StoreDropZone
              handleChangeTabIndex={handleChangeTabIndex}
            ></StoreDropZone>
          </Box>
        </Box>
      </Box>
      <Box flex={1} sx={{ overflow: 'hidden' }}>
        {/* <Code></Code> */}
        <CodeTabs
          codeStringLeft={CODE_UPLOAD_FILE_STRING}
          codeStringRight={CODE_GET_FILE_BY_CID_STRING}
          labelLeft={'STORE'}
          labelRight={'READ'}
          overrideChangeMainTabIndex={handleChangeTabIndex}
          overrideTabIndex={tabIndex}
        />
      </Box>
    </Stack>
  )
}

export default StoreFile

// <Box
// sx={{
//   height: '408px',
//   // backgroundColor: 'white',
//   // // border: '9px dotted black ',
//   // // borderCollapse: 'collapse',
//   // // borderSpacing: '0px',
//   // borderColor: (theme) => theme.palette.border.light,
//   // border: '9px dotted ',
//   // borderImage: `url(/icons/add.svg)`,
//   // borderImageRepeat: 'repeat',
//   // background: 'url(/icons/ellipse.svg) ',
//   [' -webkit-mask']: 'url(/icons/ellipse.svg) round ',
//   mask: ' url(/icons/ellipse.svg) round ',
//   backgroundColor: 'white',
//   backgroundSize: '10px',
//   overflow: 'hidden',
//   resize: 'bold',
//   position: 'relative',

//   '&:before': {
//     content: '""',
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     top: '0%',
//     left: '0%',
//     right: '0',
//     bottom: '0',
//     // backgroundPosition: '0 0, 100% 0, 100% 100%, 0 100%',
//     // backgroundRepeat: 'no-repeat',
//     // backgroundSize: '50% 50%,50% 70%',
//     // backgroundImage: `linear-gradient(#bfcde7, #ffffff),
//     //  linear-gradient(#fff, #ffff),
//     //  linear-gradient(#fff, #fff),
//     //  linear-gradient(#377af5, #377af5)`,
//     backgroundRepeat: 'no-repeat',
//     backgroundPosition: 'center',
//     // backgroundSize:
//     //   'calc(100% - (24px * 2)) calc(100% - (24px * 2)), cover',
//     // backgroundImage:
//     //   'conic-gradient(from var(--border-angle), #213, #112 50%, #213), conic-gradient(from var(--border-angle), transparent 20%, #08f, #f03)',
//     animation: 'bg-spin 3s infinite linear',
//   },
//   display: 'grid',
//   placeItems: 'center',
// }}
// ></Box>
