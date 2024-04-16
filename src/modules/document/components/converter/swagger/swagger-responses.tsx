import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import CodeBlock from '@/modules/document/components/converter/code'
import { Icons } from '@/themes/_icons'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import { memo, useEffect } from 'react'
import { isEqual } from 'lodash'
import { DocumentSwagger } from './types'
import { DocumentCode } from '../code/types'
import SwaggerWrapperParameters from './wrap'
type Props = {
  block: DocumentSwagger
}

const SwaggerResponses = ({ block }: Props) => {
  const iconOpenResponseId =
    'icon-open-response-' + Object.keys(block.data.responses)[0]
  const preBlockResponseId =
    'code-block-response-' + Object.keys(block.data.responses)[0]

  const handleOpen = (e: any) => {
    const preBlock = document.querySelector(
      `#${preBlockResponseId}`
    ) as HTMLElement
    const codeBLock = document.querySelector(
      `#${preBlockResponseId} code`
    ) as HTMLElement

    const icon = document.querySelector(`#${iconOpenResponseId}`) as HTMLElement
    if (preBlock && codeBLock) {
      if (preBlock.getBoundingClientRect().height > 0) {
        preBlock.style.maxHeight = '0px'
        icon.style.transform = 'rotate(0deg)'
      } else {
        preBlock.style.maxHeight =
          codeBLock.getBoundingClientRect().height.toString() + 'px'
        icon.style.transform = 'rotate(90deg)'
      }
    }
  }
  return (
    <>
      <SwaggerWrapperParameters title='Response'>
        {Object.values(block.data.responses).map((response, index) => {
          return (
            <Stack spacing={6} key={Object.keys(block.data.parameters)[index]}>
              <Stack direction={'row'} justifyContent={'space-between'}>
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  flex={1}
                  spacing={1}
                >
                  <SvgIconCustomized
                    component={Icons.Ellipse}
                    sx={{
                      fontSize: '8px',
                      color: (theme) => theme.palette.success.dark,
                    }}
                  />
                  <Typography
                    variant='body1'
                    component={'span'}
                    fontWeight={'medium'}
                  >
                    {response.status}
                  </Typography>
                </Stack>
                <Stack>
                  <IconButton onClick={handleOpen}>
                    <SvgIconCustomized
                      id={iconOpenResponseId}
                      component={Icons.ChevronRight}
                      sx={{
                        color: 'white',
                        transition: 'transform  ease-in 0.1s',
                      }}
                    />
                  </IconButton>
                </Stack>
              </Stack>

              <Box
                flex={1}
                sx={{
                  '& pre code.hljs': {
                    backgroundColor: (theme) => theme.palette.baseGray[800],
                  },
                }}
              >
                <CodeBlock
                  id={preBlockResponseId}
                  codeBlock={
                    block.fragments.find(
                      (fragment) =>
                        fragment.fragment ===
                        Object.keys(block.data.responses)[index]
                    )?.nodes[0] as DocumentCode
                  }
                  sx={{
                    maxHeight: 0,
                  }}
                />
              </Box>
            </Stack>
          )
        })}
      </SwaggerWrapperParameters>
    </>
  )
}
function areEqual(prevProps: Props, nextProps: Props) {
  return isEqual(prevProps.block, nextProps.block)
}
export default memo(SwaggerResponses, areEqual)
