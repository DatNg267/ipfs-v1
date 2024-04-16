import { Paragraph } from '@/modules/document/components/converter/paragraph'
import { Box, Divider, Stack, Typography } from '@mui/material'
import { memo } from 'react'
import { isEqual } from 'lodash'
import { DocumentSwagger } from './types'
import { DocumentParagraph } from '../paragraph/types'
import SwaggerWrapperParameters from './wrap'
type Props = {
  block: DocumentSwagger
}
const SwaggerParameterHeader = ({ block }: Props) => {
  let isHasParameter = false
  const lastParameter =
    Object.values(block.data.parameters).findIndex(
      (parameter) => parameter.in === 'header'
    ) || 0

  Object.values(block.data.parameters).forEach((parameter) => {
    if (parameter.in === 'header') {
      isHasParameter = true
      return
    }
  })
  return (
    <>
      {isHasParameter && (
        <SwaggerWrapperParameters title='Header'>
          {Object.values(block.data.parameters).map(
            (parameter, index) =>
              parameter.in === 'header' && (
                <Stack key={index} spacing={4}>
                  <Stack>
                    <Stack
                      direction={'row'}
                      alignItems={'baseline'}
                      spacing={2}
                    >
                      <Box flex={1} sx={{ overflow: 'hidden' }}>
                        <Typography
                          variant='body1'
                          component={'span'}
                          sx={{
                            wordWrap: 'break-word',
                          }}
                        >
                          {parameter.name}
                          <Typography
                            variant='body1'
                            component={'span'}
                            color='error'
                          >
                            {parameter.required ? '*' : ''}
                          </Typography>
                        </Typography>
                      </Box>
                      <Stack flex={1} alignItems={'flex-start'}>
                        <Paragraph
                          block={
                            block.fragments.find(
                              (fragment) =>
                                fragment.fragment ===
                                Object.keys(block.data.parameters)[index]
                            )?.nodes[0] as DocumentParagraph
                          }
                        />
                      </Stack>
                    </Stack>
                  </Stack>
                  {index < lastParameter && (
                    <Divider
                      sx={{
                        borderColor: (theme) => theme.palette.baseGray[800],
                      }}
                    />
                  )}
                </Stack>
              )
          )}
        </SwaggerWrapperParameters>
      )}
    </>
  )
}
function areEqual(prevProps: Props, nextProps: Props) {
  return isEqual(prevProps.block, nextProps.block)
}
export default memo(SwaggerParameterHeader, areEqual)
