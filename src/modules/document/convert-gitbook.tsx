import CodeBlock from '@/modules/document/components/converter/code'
import Embed from '@/modules/document/components/converter/embed'
import DocumentList from '@/modules/document/components/converter/list'
import { Paragraph } from '@/modules/document/components/converter/paragraph'
import Quote from '@/modules/document/components/converter/quote'
import Swagger from '@/modules/document/components/converter/swagger'
import TabsBlock from '@/modules/document/components/converter/tabs'
import TextHeading from '@/modules/document/components/converter/text/text-heading'

import { Box, Divider, Stack, Typography } from '@mui/material'
import { DocumentCode } from './components/converter/code/types'
import Hint from './components/converter/hint'
import DocumentImageComponent from './components/converter/image'
import { DocumentParagraph } from './components/converter/paragraph/types'
import { DocumentContent } from './types'

export const convert = (data: DocumentContent) => {
  return (
    <>
      <Stack
        spacing={2}
        direction={'row'}
        justifyContent={'space-between'}
        sx={{
          position: 'relative',
        }}
      >
        <Typography fontWeight='bold' variant='h3' mr={{ xs: 0 }}>
          {data.title}
        </Typography>
        {/* <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            top: '50%',
            right: 0,
            transform: 'translateY(-50%)',
          }}
        >
          <ThreeCircle />
        </Box> */}
      </Stack>
      <Divider
        sx={{
          borderColor: (theme) => theme.palette.primary.dark,
        }}
      ></Divider>
      {data.description && (
        <Typography variant='subtitle2' color='text.secondary'>
          {data.description}
        </Typography>
      )}

      <Stack spacing={4}>
        {data.document.nodes.map((node: any, index: number) => {
          return (
            <Box
              key={index}
              sx={{
                '& pre code.hljs': {
                  backgroundColor: (theme) => theme.palette.baseGray[900],
                },
              }}
            >
              {convertBlock(node)}
            </Box>
          )
        })}
      </Stack>
    </>
  )
}

export const convertBlock = (node: any) => {
  const object = node.object
  switch (object) {
    case 'block': {
      const type = node.type
      switch (type) {
        case 'code': {
          return <CodeBlock codeBlock={node as DocumentCode} />
        }
        case 'paragraph': {
          return <Paragraph block={node as DocumentParagraph}></Paragraph>
        }
        case 'blockquote': {
          return <Quote block={node} />
        }
        case 'heading-1': {
          return <TextHeading block={node} variant={'h4'} component={'h1'} />
        }
        case 'heading-2': {
          return <TextHeading block={node} variant={'h5'} component={'h2'} />
        }
        case 'heading-3': {
          return <TextHeading block={node} variant={'h6'} component={'h3'} />
        }
        case 'heading-4': {
          return <TextHeading block={node} variant={'h6'} component={'h4'} />
        }
        case 'heading-5': {
          return <TextHeading block={node} variant={'h6'} component={'h5'} />
        }
        case 'swagger': {
          return <Swagger block={node} />
        }
        case 'tabs': {
          return <TabsBlock tabsBlock={node}></TabsBlock>
        }
        case 'list-ordered': {
          return <DocumentList block={node}></DocumentList>
        }
        case 'list-unordered': {
          return <DocumentList block={node}></DocumentList>
        }
        case 'embed': {
          return <Embed block={node}></Embed>
        }
        case 'images': {
          return <DocumentImageComponent block={node.nodes[0]} />
        }
        case 'hint': {
          return <Hint block={node}></Hint>
        }
        default:
          return <></>
      }
    }
    default:
      return <></>
  }
}
