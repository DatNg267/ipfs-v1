import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { AppRouter } from '@/constants'
import { Icons } from '@/themes/_icons'
import { Button, Paper, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import FaqArrow from './arrow'
import ButtonCustomized from '@/components/atoms/button'

type Props = {
  arrColor: any
}

const FaqPannel = ({ arrColor }: Props) => {
  return (
    <Paper
      sx={{
        m: 0,
        maxWidth: { xs: '100%', md: '611px' },
        width: { xs: '100%', md: '611px' },
        backgroundColor: 'background.default',
        p: { xs: 4, md: 4 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        ['--faq-color']: arrColor,
      }}
    >
      <Typography
        variant='h3'
        fontWeight={700}
        color='primary.main'
        mb={{ xs: 8, md: 0 }}
        sx={{
          letterSpacing: '0.04em',
        }}
      >
        FREQUENTLY <br></br>ASKED <br></br>QUESTIONS
      </Typography>
      <FaqArrow arrColor={arrColor} />
      <Stack alignItems={{ xs: 'unset', md: 'center' }} mt={{ xs: 8, md: 2 }}>
        <Link href={`${AppRouter.DOCUMENT + '/faq'}`} passHref>
          <ButtonCustomized
            variant='contained'
            color='primary'
            endIcon={<SvgIconCustomized component={Icons.ArrowRight} />}
            sx={{
              width: { xs: '100%', md: 'fit-content' },
              px: '35px',
            }}
          >
            More FAQs
          </ButtonCustomized>
        </Link>
      </Stack>
    </Paper>
  )
}

export default FaqPannel
