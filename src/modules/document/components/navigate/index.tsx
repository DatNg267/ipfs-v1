import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { AppRouter } from '@/constants'
import { Icons } from '@/themes/_icons'
import { Box, Button, Stack, Typography } from '@mui/material'
import Link from 'next/link'
type Props = {
  prev: any
  next: any
}

const NavigateFooter = ({ prev, next }: Props) => {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      justifyContent={'space-around'}
      spacing={{ xs: '16px', md: '28px' }}
    >
      <Box
        flex={1}
        sx={{
          overflow: 'hidden',
          display: { xs: prev && prev.title ? 'block' : 'none', md: 'block' },
        }}
      >
        {prev && prev.title && (
          <Link
            href={`${AppRouter.DOCUMENT}/${prev.path}`}
            passHref
            style={{ width: '100%' }}
          >
            <Button
              sx={{
                overflow: 'hidden',
                minWidth: '100px',
                height: '100%',
                padding: { xs: '8px 16px' },
                justifyContent: 'space-between',
                alignItems: 'unset',
                borderRadius: '16px',
                borderColor: (theme) => theme.palette.primary.dark,
                '&:hover': {
                  backgroundColor: 'transparent',
                  '& .MuiTypography-root': {},
                  '& .MuiSvgIcon-root': {
                    borderRadius: '99px',
                    backgroundColor: (theme) =>
                      theme.palette.background.default,
                    borderColor: (theme) => theme.palette.text.primary,
                    '& path': {
                      color: (theme) => theme.palette.primary.main,
                    },
                    '& rect': {
                      stroke: (theme) => theme.palette.background.default,
                    },
                  },
                },
              }}
              fullWidth
              variant='outlined'
              color='secondary'
            >
              <Stack flex={1} justifyContent={'center'} mr={2}>
                <SvgIconCustomized
                  sx={{
                    color: (theme) => theme.palette.border.light,
                  }}
                  component={Icons.CircleArrowLeftThin}
                />
              </Stack>

              <Stack
                justifyContent={'space-between'}
                sx={{
                  overflow: 'hidden',
                }}
              >
                <Typography
                  variant='body1'
                  fontWeight={600}
                  textAlign={'right'}
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    color: 'text.primary',
                  }}
                >
                  {prev.title}
                </Typography>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  textAlign={'right'}
                  sx={{
                    fontWeight: `500 !important`,
                  }}
                >
                  Prev
                </Typography>
              </Stack>
            </Button>
          </Link>
        )}
      </Box>

      <Box
        flex={1}
        sx={{
          overflow: 'hidden',
          display: { xs: next && next.title ? 'block' : 'none', md: 'block' },
        }}
      >
        {next && next.title && (
          <Link
            href={`${AppRouter.DOCUMENT}/${next.path}`}
            passHref
            style={{ width: '100%', display: 'block' }}
          >
            <Button
              sx={{
                overflow: 'hidden',
                minWidth: '100px',
                height: '100%',
                padding: { xs: '8px 16px' },
                justifyContent: 'space-between',
                alignItems: 'unset',
                borderRadius: '16px',
                borderColor: (theme) => theme.palette.primary.dark,
                '&:hover': {
                  backgroundColor: 'transparent',
                  '& .MuiTypography-root': {},
                  '& .MuiSvgIcon-root': {
                    borderRadius: '99px',
                    backgroundColor: (theme) =>
                      theme.palette.background.default,
                    borderColor: (theme) => theme.palette.text.primary,
                    '& path': {
                      color: (theme) => theme.palette.primary.main,
                    },
                    '& rect': {
                      stroke: (theme) => theme.palette.background.default,
                    },
                  },
                },
              }}
              fullWidth
              variant='outlined'
              color='secondary'
            >
              <Stack
                justifyContent={'space-between'}
                sx={{ overflow: 'hidden' }}
                mr={2}
              >
                <Typography
                  variant='body1'
                  fontWeight={600}
                  textAlign={'left'}
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    color: 'text.primary',
                  }}
                >
                  {next.title}
                </Typography>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  textAlign={'left'}
                  noWrap
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontWeight: `500 !important`,
                  }}
                >
                  Next
                </Typography>
              </Stack>
              <Stack justifyContent={'center'}>
                <SvgIconCustomized
                  sx={{
                    color: (theme) => theme.palette.border.light,
                  }}
                  component={Icons.CircleArrowRightThin}
                />
              </Stack>
            </Button>
          </Link>
        )}
      </Box>
    </Stack>
  )
}

export default NavigateFooter
