import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { useCancelDownload } from '@/redux/download-and-zipping/hooks'
import { Icons } from '@/themes/_icons'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import ProgressBar from './progress-bar'
import {
  DownloadStatus,
  DownloadType,
} from '@/redux/download-and-zipping/reducer'

type Props = {
  id: string
  name: string
  value: number
  done: boolean
  status: DownloadStatus
  type: DownloadType
}

const FileZippingProgress = ({
  id,
  name,
  value,
  done,
  status,
  type,
}: Props) => {
  const handleStop = useCancelDownload()
  return (
    <Box>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        overflow={'hidden'}
        mb={1}
      >
        <Stack
          direction={'row'}
          alignItems={'center'}
          overflow={'hidden'}
          spacing={1}
        >
          <SvgIconCustomized
            component={type === 'folder' ? Icons.Folder : Icons.Document}
            sx={{
              fontSize: '20px',
            }}
          />
          <Typography
            variant='body2'
            overflow={'hidden'}
            textOverflow={'ellipsis'}
            sx={{
              whiteSpace: 'nowrap',
            }}
          >
            {name}
          </Typography>
        </Stack>
        {status === 'canceled' && <></>}
        {status !== 'canceled' && (
          <IconButton
            sx={{ p: 0, m: 0 }}
            onClick={() => {
              if (!done) {
                handleStop(id)
              }
            }}
          >
            <SvgIconCustomized
              component={!done ? Icons.CloseCircle : Icons.CircleCheckFilled}
              sx={{
                ...(!done && {
                  '& rect': {
                    fill: (theme) => theme.palette.red[500],
                    stroke: (theme) => theme.palette.red[500],
                  },
                  '& path': {
                    fill: (theme) => theme.palette.primary.main,
                    color: (theme) => theme.palette.primary.main,
                  },
                }),
                ...(done && {
                  '& path': {
                    fill: (theme) => theme.palette.primary.main,
                    color: (theme) => theme.palette.primary.main,
                  },
                  '& rect:nth-child(1)': {
                    fill: (theme) => theme.palette.green[600],
                  },
                  '& rect:nth-child(3)': {
                    fill: 'none',
                  },
                  '& rect:nth-child(4)': {
                    stroke: (theme) => theme.palette.green[600],
                  },
                }),
              }}
            />
          </IconButton>
        )}
      </Stack>
      {/* progress */}
      <ProgressBar value={value} success={done} status={status} type={type} />
    </Box>
  )
}

export default FileZippingProgress
