import { Stack, Typography } from '@mui/material'
import { isEqual } from 'lodash'
import { memo } from 'react'
import { DocumentSwagger } from './types'
import SwaggerParameterBody from './swagger-body'
import SwaggerParameterPath from './swagger-path'
import SwaggerParameterHeader from './swagger-header'
import SwaggerResponses from './swagger-responses'
import SwaggerParameterQuery from './swagger-query'
type Props = {
  block: DocumentSwagger
}
const Swagger = ({ block }: Props) => {
  return (
    <Stack
      sx={{
        p: '28px',
        borderRadius: '10px',
        background: (theme) => theme.palette.baseGray[900],
        color: (theme) => theme.palette.primary.main,
      }}
    >
      <Stack spacing={10}>
        {/* head */}
        <Stack spacing={2}>
          <Stack spacing={4} direction={'row'} alignItems={'center'}>
            <Typography
              component={'span'}
              variant='body2'
              sx={{
                backgroundColor:
                  block.data.method === 'post'
                    ? (theme) => theme.palette.green[600]
                    : block.data.method === 'get'
                    ? (theme) => theme.palette.blue[500]
                    : block.data.method === 'delete'
                    ? '#f93e3e'
                    : block.data.method === 'put'
                    ? '#fca130'
                    : (theme) => theme.palette.baseGray[500],
                borderRadius: '16px',
                padding: '2px 8px',
                fontWeight: 'medium',
              }}
            >
              {block.data.method.toUpperCase()}
            </Typography>
            <Typography
              variant='body2'
              component={'span'}
              sx={{
                fontWeight: 'normal',
                overflow: 'hidden',
                wordWrap: 'break-word',
              }}
            >
              {block.data.baseUrl}
            </Typography>
          </Stack>
          {/* Summary */}
          <Typography variant='body2' fontWeight={'medium'}>
            {block.data.summary}
          </Typography>
        </Stack>

        {/* Body */}
        <Stack spacing={4}>
          <Typography variant='body1' fontWeight={'bold'}>
            Parameters
          </Typography>
          <Stack spacing={8}>
            <SwaggerParameterQuery block={block} />
            <SwaggerParameterPath block={block} />
            <SwaggerParameterHeader block={block} />
            <SwaggerParameterBody block={block} />
          </Stack>
        </Stack>

        {/* response */}
        <SwaggerResponses block={block} />
      </Stack>
    </Stack>
  )
}
function areEqual(prevProps: Props, nextProps: Props) {
  return isEqual(prevProps.block, nextProps.block)
}
export default memo(Swagger, areEqual)
