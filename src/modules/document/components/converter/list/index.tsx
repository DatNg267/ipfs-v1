import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { Icons } from '@/themes/_icons'
import { Box, Stack, Typography } from '@mui/material'
import Paragraph from '../paragraph'
import { DocumentParagraph } from '../paragraph/types'
import { DocumentList } from './type'

type Props = {
  block: DocumentList
}
const renderListItem = (
  block: any,
  index: number,
  level: number,
  type: 'list-ordered' | 'list-unordered' | 'paragraph',
  parentType: 'list-ordered' | 'list-unordered' | 'paragraph',
  isFirstNode: boolean
) => {
  switch (block.type) {
    case 'list-item': {
      return (
        <>
          {block.nodes.map((item: any, itemIndex: number) => {
            return renderListItem(
              item,
              index,
              level,
              item.type,
              parentType,
              itemIndex === 0
            )
          })}
        </>
      )
    }
    case 'paragraph': {
      return (
        <>
          <Stack
            component={'span'}
            direction='row'
            sx={{
              marginTop: '4px',
              marginLeft: `${32 * (level - 1)}px`,
              '& .MuiTypography-root': {
                lineHeight: '24px',
              },
            }}
          >
            <Box
              component={'span'}
              sx={{
                width: '16px',
                minWidth: '16px',
                maxWidth: '16px',
                mx: '4px',
              }}
            >
              {parentType === 'list-ordered' && isFirstNode ? (
                <Typography component={'span'} variant='body2'>
                  {index + 1}.
                </Typography>
              ) : parentType === 'list-unordered' ? (
                <>
                  <SvgIconCustomized
                    component={Icons.Ellipse}
                    sx={{
                      fontSize: '8px',
                      height: '24px',
                    }}
                  />
                </>
              ) : (
                <></>
              )}
            </Box>

            <Paragraph block={block as DocumentParagraph} />
          </Stack>
        </>
      )
    }
    case 'list-unordered': {
      return (
        <ul style={{ marginTop: '8px' }}>
          {block.nodes.map((item: any, itemIndex: any) => {
            return renderListItem(
              item,
              itemIndex,
              level + 1,
              item.type,
              'list-unordered',
              itemIndex === 0
            )
          })}
        </ul>
      )
    }
    case 'list-ordered': {
      return (
        <ol>
          {block.nodes.map((item: any, itemIndex: any) => {
            return renderListItem(
              item,
              item.data.start ? item.data.start - 1 : itemIndex,
              level + 1,
              item.type,
              'list-ordered',
              itemIndex === 0
            )
          })}
        </ol>
      )
    }
    default:
      return <></>
  }
}
const renderList = (list: DocumentList) => {
  return (
    <>
      {list.nodes.map((item, index) => {
        return renderListItem(
          item,
          list.data.start ? list.data.start - 1 : index,
          1,
          item.type,
          list.type,
          index === 0
        )
      })}
    </>
  )
}
const DocumentList = ({ block }: Props) => {
  return <ol>{renderList(block)}</ol>
}

export default DocumentList
