import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { usePageColor } from '@/hooks/usePageColor'
import { Icons } from '@/themes/_icons'
import { APP_FONT_FAMILY } from '@/themes/_theme'
import { IconButton, Paper, Stack, Typography } from '@mui/material'

const DocumentHeading = () => {
  const handleGetPageColor = usePageColor()
  const color = handleGetPageColor()

  const handleToggleNavbar = () => {
    // let layout = document.querySelector('#document-layout') as HTMLElement
    let navbar = document.querySelector('#document-navbar') as HTMLElement
    let wrapper = document.querySelector('#document-wrapper') as HTMLElement
    let body = document.querySelector('body') as HTMLElement

    if (navbar.classList.contains('open')) {
      navbar.classList.remove('open')
      navbar.style.transform = 'translate(-110%, 0px)'
      body.style.overflowY = 'unset'
      navbar.style.display = 'flex'
      wrapper.style.overflow = 'unset'
      // layout.style.overflow = 'unset'
    } else {
      navbar.classList.add('open')
      navbar.style.transform = 'translate(0%, 0px)'
      body.style.overflowY = 'hidden'
      navbar.style.display = 'flex'
      wrapper.style.overflow = 'hidden'
      // layout.style.overflow = 'hidden'
    }
  }
  return (
    <Paper
      sx={{
        backgroundColor: color,
        px: '28px',
      }}
    >
      <Stack
        direction='row'
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Stack direction={'row'} alignItems={'center'} spacing={8}>
          <Typography
            variant='h3'
            fontFamily={APP_FONT_FAMILY.ARRAY}
            sx={{
              fontSize: { md: '60px', xs: '26px' },
              lineHeight: { md: '72px', xs: '34px' },
            }}
          >
            Documentation
          </Typography>
        </Stack>
        <IconButton
          sx={{
            display: { xs: 'inline-flex', md: 'none' },
            backgroundColor: 'black',
            width: '32px',
            height: '32px',
            '&:hover': {
              backgroundColor: 'black',
            },
          }}
          onClick={(e) => {
            handleToggleNavbar()
          }}
        >
          <SvgIconCustomized
            component={Icons.Menu}
            sx={{
              color: 'primary.main',
            }}
          />
        </IconButton>
      </Stack>
    </Paper>
  )
}

export default DocumentHeading
