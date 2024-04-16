import CodeExample from '@/components/organisms/code-example'
import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { CODE_UPLOAD_FILE_STRING } from '@/constants/code'
import { Icons } from '@/themes/_icons'
import { Paper, Stack, Typography } from '@mui/material'

type Props = {}

const Code = (props: Props) => {
  return (
    <Stack sx={{ height: '100%' }}>
      <Paper
        sx={{
          height: 'fit-content',
          backgroundColor: (theme) => theme.palette.background.default,
          padding: { xs: '8px 16px', md: '16px 28px' },
          m: 0,
        }}
      >
        <Stack direction='row' justifyContent={'space-between'}>
          <Stack direction={'row'} alignItems='center' spacing={1}>
            <Typography
              variant='subtitle2'
              color={'primary'}
              fontWeight={'bold'}
            >
              STORE
            </Typography>
            <SvgIconCustomized
              component={Icons.Ellipse}
              sx={{
                color: (theme) => theme.palette.dotPink[500],
              }}
            />
          </Stack>

          <Typography
            variant='subtitle2'
            color='text.secondary'
            fontWeight={'bold'}
          >
            READ
          </Typography>
        </Stack>
      </Paper>

      <Paper
        sx={{
          m: 0,
          mt: 1,
          flex: 1,
          backgroundColor: (theme) => theme.palette.background.default,
          padding: { xs: '0', md: '0' },
          '& pre': {
            background: 'inherit !important',
          },
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        <CodeExample codeString={CODE_UPLOAD_FILE_STRING} />
      </Paper>
    </Stack>
  )
}

export default Code
