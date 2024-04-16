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
const SwaggerParameterBody = ({ block }: Props) => {
  let isHasParameter = false
  const lastParameter =
    Object.values(block.data.parameters).findIndex(
      (parameter) => parameter.in === 'body'
    ) || 0

  Object.values(block.data.parameters).forEach((parameter) => {
    if (parameter.in === 'body') {
      isHasParameter = true
      return
    }
  })
  return (
    <>
      {isHasParameter && (
        <SwaggerWrapperParameters title='Body'>
          {Object.values(block.data.parameters).map(
            (parameter, index) =>
              parameter.in === 'body' && (
                <Box key={parameter.name}>
                  <Stack key={parameter.name} justifyContent={'center'}>
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
                      <Stack
                        flex={1}
                        alignItems={'flex-start'}
                        justifyItems={'center'}
                      >
                        {parameter.type ? (
                          <Typography variant={'body2'}>
                            {parameter.type}
                          </Typography>
                        ) : (
                          <>
                            {block.fragments.find(
                              (fragment) =>
                                fragment.fragment ===
                                Object.keys(block.data.parameters)[index]
                            )?.nodes[0] && (
                              <Paragraph
                                block={
                                  block.fragments.find(
                                    (fragment) =>
                                      fragment.fragment ===
                                      Object.keys(block.data.parameters)[index]
                                  )?.nodes[0] as DocumentParagraph
                                }
                              />
                            )}
                          </>
                        )}
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
                </Box>
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
export default memo(SwaggerParameterBody, areEqual)
