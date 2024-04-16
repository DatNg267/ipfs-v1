import { PaperStyled } from '@/components/atoms/paper'
import DocumentArticleSection from '@/modules/document/components/converter/article-section'
import DocumentNav from '@/modules/document/components/navbar/nav'
import NavigateFooter from '@/modules/document/components/navigate'
import {
  useUpdateDocumentContent,
  useUpdateDocumentFiles,
  useUpdateNavbarData,
  useUpdatePageRefsMapping,
} from '@/redux/document/hooks'
import { DocumentContentBarStyled } from '@/themes/_theme'
import { Box, Container, Grid, Stack, Typography } from '@mui/material'
import hljs from 'highlight.js'
import javascript from 'highlight.js/lib/languages/javascript'
import { isEmpty } from 'lodash'
import { createContext, useEffect, useState } from 'react'
import TreeContent from './components/tree-content'
import { convert } from './convert-gitbook'
import { DocumentContent, DocumentFiles, NavPage, Navs } from './types'
import { PageRefsMapping } from './types/page-refs'
import { TreeContentType } from './types/tree-content'

type Props = {
  files: DocumentFiles
  data: DocumentContent | null
  navList: Navs | null
  prev: NavPage | null
  next: NavPage | null
  pageRefsMapping: PageRefsMapping
}
type DocumentContextType = {
  treeContent: TreeContentType[] | null
  contentTarget: string
  handleUpdateContentTarget: (href: string) => void
}
export const DocumentContext = createContext<DocumentContextType>({
  treeContent: [],
  contentTarget: '',
  handleUpdateContentTarget: (href: string) => {},
})
const DocumentPageContent = ({
  files,
  data,
  navList,
  prev,
  next,
  pageRefsMapping,
}: Props) => {
  const [contentTarget, setContentTarget] = useState('')
  const handleUpdateContentTarget = (href: string) => setContentTarget(href)

  const handleUpdateNavList = useUpdateNavbarData()
  const handleUpdateDocumentContent = useUpdateDocumentContent()
  const handleUpdateDocumentFiles = useUpdateDocumentFiles()
  const handleUpdatePageRefsMapping = useUpdatePageRefsMapping()

  useEffect(() => {
    if (document) {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
      const documentContent = document.getElementById('document-content')
      // if (documentContent)
      //   documentContent.scrollIntoView({
      //     behavior: 'smooth',
      //   })
    }
  }, [data])
  useEffect(() => {
    handleUpdateNavList(navList)
    handleUpdateDocumentContent(data)
    handleUpdateDocumentFiles(files)
    handleUpdatePageRefsMapping(pageRefsMapping)
    try {
      const block = document.querySelectorAll(`.codeBlock`)
      if (!block) return
      block.forEach((element) => {
        if (element) {
          hljs.registerLanguage('javascript', javascript)
          hljs.highlightBlock(element as HTMLElement)
        }
      })
    } catch (error) {}
  }, [data, navList, files, pageRefsMapping])

  const treeContent: TreeContentType[] | null | any =
    (data &&
      data.document.nodes
        .map((node: any, index: number) => {
          if (node.type.includes('heading')) {
            return {
              text: node.nodes[0].leaves[0].text,
              level: parseInt((node.type as string).replace('heading-', '')),
            }
          }
        })
        .filter((item) => !isEmpty(item))) ||
    null
  return (
    <DocumentContext.Provider
      value={{
        treeContent,
        contentTarget,
        handleUpdateContentTarget,
      }}
    >
      {navList && <DocumentNav navList={navList} />}
      <PaperStyled
        id='document-content'
        sx={{
          m: 0,
          flexDirection: 'row',
          justifyContent: 'center',
          minWidth: '0px',
          px: 1,
          py: 0,
        }}
      >
        <Box
          id='document-content-scroller'
          flex={1}
          sx={{
            overflowY: 'auto',
            ...DocumentContentBarStyled,
            p: { xs: '0', md: '28px' },
            pl: { xs: '0', md: '60px' },
          }}
        >
          <Container
            maxWidth='lg'
            sx={{
              display: 'flex',
              px: 0,
              justifyContent: 'center',
              height: 'fit-content',
            }}
          >
            <Stack
              sx={{
                width: '100%',
                minWidth: '0px',
                maxWidth: '750px',
                overflow: 'hidden',
              }}
              spacing={'28px'}
            >
              <Stack spacing={4}>{data && convert(data)}</Stack>

              {/* Page navigate */}
              <Box>
                {data && (
                  <Stack>
                    {data.pages && data.pages.length > 0 && (
                      <Typography
                        variant='body1'
                        mb={'16px'}
                        fontWeight={'medium'}
                      >
                        Here are the articles in this section:
                      </Typography>
                    )}
                    <Grid
                      container
                      spacing={{ xs: 2, md: '28px' }}
                      sx={{ marginLeft: '-28px' }}
                    >
                      {data.pages.map((item, index) => {
                        return (
                          <Grid item xs={12} md={6} key={index}>
                            <DocumentArticleSection
                              title={item.title}
                              path={item.path}
                            />
                          </Grid>
                        )
                      })}
                    </Grid>
                  </Stack>
                )}
              </Box>
              <NavigateFooter next={next} prev={prev} />
              {/* <DocumentFooter></DocumentFooter> */}
            </Stack>
            <TreeContent treeContent={treeContent} />
          </Container>
        </Box>
      </PaperStyled>
    </DocumentContext.Provider>
  )
}
export default DocumentPageContent
