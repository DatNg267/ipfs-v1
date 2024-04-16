import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { Icons } from '@/themes/_icons'
import { APP_BORDER_RADIUS_PRIMARY, ScrollBarStyled } from '@/themes/_theme'
import { AppStatusAction } from '@/types'
import { formatFileSize, totalSizeFiles } from '@/utils/tools'
import { Box, List, ListItem, Stack, Typography } from '@mui/material'
import { memo } from 'react'
import LocalFileItem from './local-file-item'

type Props = {
  statusUpload: AppStatusAction
  progress: number
  files: File[]
  listProps?: any
}

const LocalFilesUploaded = ({
  files,
  statusUpload,
  progress,
  listProps,
}: Props) => {
  return (
    <>
      <ListItem
        sx={{
          justifyContent: 'space-between',
          p: 0,
          m: 0,
          height: '36px',
          borderBottom: '2px solid',
          borderColor: (theme) => theme.palette.baseGray[700],
        }}
      >
        <Typography
          component={'span'}
          variant='body1'
          fontWeight={'medium'}
          noWrap
          sx={{
            verticalAlign: 'middle',
            overflow: 'unset',
          }}
        >
          Total files: {files.length} &nbsp;
        </Typography>
        <Stack direction={'row'} alignItems={'center'} spacing={1}>
          {statusUpload === 'fail' ? (
            <>
              <Typography
                component={'span'}
                variant='body1'
                fontWeight={'medium'}
                noWrap
                sx={{
                  verticalAlign: 'middle',
                  overflow: 'unset',
                }}
                color='error'
              >
                Uploaded fail
              </Typography>
              <SvgIconCustomized
                component={Icons.CircleError}
                sx={{ fontSize: '20px', color: 'error.main' }}
              />
            </>
          ) : (
            <>
              <Typography
                component={'span'}
                variant='body1'
                fontWeight={'medium'}
                noWrap
                sx={{
                  verticalAlign: 'middle',
                  overflow: 'unset',
                }}
              >
                {formatFileSize((progress * totalSizeFiles(files)) / 100).size}/
                {/* {formatFileSize(totalSizeFiles(files)).unit}/ */}
                {formatFileSize(totalSizeFiles(files)).size}&nbsp;
                {formatFileSize(totalSizeFiles(files)).unit}
              </Typography>
            </>
          )}
        </Stack>
      </ListItem>
      <List
        {...listProps}
        sx={{
          maxHeight: { xs: '200px', md: '314px' },
          overflow: 'auto',
          p: 0,
          pr: 1,
          mr: -1,
          ...ScrollBarStyled,

          // '& .MuiListItem-root:last-child': {
          //   borderBottom: 'none',
          // },
          ...(listProps && listProps.sx),
        }}
      >
        {files.map((file, i) => (
          <LocalFileItem file={file} key={i} />
        ))}
      </List>
    </>
  )
}

export default memo(LocalFilesUploaded)
