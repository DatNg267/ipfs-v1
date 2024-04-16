import { AppRouter } from '@/constants'
import { useFindPage } from '@/redux/document/hooks'
import { Box } from '@mui/material'
import Link from 'next/link'
import Text from '.'
import { DocumentText, DocumentTextInline } from './types'
import { useAppSelector } from '@/redux/hooks'

type Props = {
  block: DocumentTextInline
  component?: any
  variant?: any
  [key: string]: any
}

const TextInLine = ({ block, component, variant, ...props }: Props) => {
  const getPageData = useFindPage()
  const pageRefsMapping = useAppSelector(
    (state) => state.document.pageRefsMapping
  )
  const type = block.data.ref.kind
  const isLink = block.type === 'link'
  const pageData = block.data.ref.page
    ? pageRefsMapping[block.data.ref.page] || '#'
    : '#'
  // block.data.ref.kind === 'page' && block.data.ref.page
  //   ? getPageData(block.data.ref.page)
  //   : ''
  const href = isLink
    ? type === 'page'
      ? `${AppRouter.DOCUMENT}/${pageData.path}`
      : type === 'url'
      ? block.data.ref.url
      : type === 'anchor'
      ? `${AppRouter.DOCUMENT}/${pageData.path}#${block.data.ref.anchor}`
      : '#'
    : '#'
  return (
    <>
      {isLink && (
        <Link
          href={href}
          passHref
          target={block.data.ref.kind === 'url' ? '_blank' : '_self'}
        >
          <Box
            sx={{
              color: (theme) => theme.palette.blue[600],
              '&:hover .MuiTypography-root': {
                color: (theme) => theme.palette.blue[600],
                textDecoration: 'underline',
                textDecorationColor: (theme) => theme.palette.blue[600],
              },
            }}
            component='span'
          >
            <Text block={block.nodes[0] as DocumentText} {...props}></Text>
          </Box>
        </Link>
      )}
      {!isLink && (
        <Box component='span'>
          <Text block={block.nodes[0] as DocumentText} {...props}></Text>
        </Box>
      )}
    </>
  )
}

export default TextInLine
