import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { DOCUMENT_HEADING_HEIGHT } from '@/constants'
import { Icons } from '@/themes/_icons'
import { fontSize } from '@/themes/font'
import { toKebabCase } from '@/utils/tools'
import {
  Box,
  Button,
  Stack,
  Tab,
  TabProps,
  Tabs,
  Typography,
  styled,
} from '@mui/material'
import { useRouter } from 'next/router'
import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { TreeContentType } from '../../types/tree-content'
import { DocumentContext } from '../../page'
import { isEqual } from 'lodash'

const TreeTab = styled(
  (
    props: TabProps & {
      [key: string]: any
    }
  ) => <Tab {...props} />
)(({ theme }) => ({
  alignItems: 'flex-start',
  textAlign: 'left',
  minHeight: 'unset',
  padding: 0,
  paddingRight: '16px',
  marginTop: '8px',
  textTransform: 'none',
  ...fontSize['16'],
  '&.Mui-selected': {
    color: '#000',
    fontWeight: 'bold',
  },
}))
type Props = {
  treeContent: TreeContentType[] | null
}
const TreeContent = ({ treeContent }: Props) => {
  const { contentTarget, handleUpdateContentTarget } =
    useContext(DocumentContext)

  // const [value, setValue] = useState('')
  const handleChange = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      handleUpdateContentTarget(newValue)
    },
    [handleUpdateContentTarget]
  )
  const router = useRouter()
  const ref = useRef<number | null | ReturnType<typeof setTimeout>>(null)
  const [show, setShow] = useState(false)

  const [prevPosition, setPrevPosition] = useState(0)

  useEffect(() => {
    if (!window) return
    const body = document.querySelector('#document-content-scroller')
    if (!body) return
    body.addEventListener('scroll', (e) => {
      if (ref.current) clearTimeout(ref.current)
      ref.current = setTimeout((e: any) => {
        if (treeContent && treeContent.length > 0) {
          const locationScroll = body.scrollTop
          const arrHeadingContent: (HTMLElement | null)[] = treeContent.map(
            (item, index) => {
              return document.getElementById(
                toKebabCase(item.text)
              ) as HTMLElement
            }
          )
          const positionExpected = arrHeadingContent.findLastIndex(
            (heading) => {
              return heading && heading.offsetTop <= locationScroll + 18
            }
          )

          const positionCurrentValue = treeContent.findIndex(
            (item) => toKebabCase(item.text) === contentTarget
          )
          const isScrollDown = prevPosition < locationScroll
          setPrevPosition(locationScroll)
          if (positionExpected === -1) {
            if (!treeContent || treeContent.length === 0) return
            if (contentTarget === toKebabCase(treeContent[0].text)) return
            handleUpdateContentTarget(toKebabCase(treeContent[0].text))
          } else if (
            treeContent &&
            treeContent.length > positionExpected &&
            contentTarget !== toKebabCase(treeContent[positionExpected].text)
          ) {
            if (!isScrollDown) {
              handleUpdateContentTarget(
                toKebabCase(treeContent[positionExpected].text)
              )
            }
            if (isScrollDown && positionCurrentValue < positionExpected) {
              handleUpdateContentTarget(
                toKebabCase(treeContent[positionExpected].text)
              )
            } else {
              return
            }
          }
        } else {
        }
      }, 20)
    })

    return () => {
      body.removeEventListener('scroll', () => {})
    }
  }, [treeContent, contentTarget, prevPosition])

  useEffect(() => {
    if (treeContent && treeContent.length > 0)
      handleUpdateContentTarget(toKebabCase(treeContent[0].text))
  }, [treeContent])

  useEffect(() => {
    handleUpdateContentTarget(
      router.asPath.slice(router.asPath.indexOf('#') + 1, router.asPath.length)
    )
  }, [router.asPath])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_DOMAIN}` + router.asPath
    )
    setShow(true)
    setTimeout(() => {
      setShow(false)
    }, 300)
  }

  return (
    <Stack
      sx={{
        minWidth: '250px',
        maxWidth: '250px',
        display: { xs: 'none', md: 'flex' },
        ml: '74px',
      }}
    >
      <Stack
        sx={{
          position: 'sticky',
          top: '0',
          right: 0,
          bottom: 0,
        }}
        spacing={4}
      >
        <Stack spacing={4} sx={{}}>
          <Stack direction={'row'} spacing={2}>
            {!show ? (
              <Button
                variant='text'
                onClick={handleCopyLink}
                startIcon={<SvgIconCustomized component={Icons.LinkAlt} />}
                sx={{
                  px: 0,
                }}
                disableRipple
              >
                <Typography variant='body2'>Copy link</Typography>
              </Button>
            ) : (
              <Button
                variant='text'
                startIcon={
                  <SvgIconCustomized
                    component={Icons.Check}
                    sx={{
                      color: (theme) => theme.palette.green[700],
                    }}
                  />
                }
                sx={{
                  px: 0,
                }}
                disableRipple
              >
                <Typography variant='body2'>Copied</Typography>
              </Button>
            )}
          </Stack>
          <Typography variant='body1' color={'text.secondary'}>
            ON THIS PAGE
          </Typography>
          <Stack spacing={2}>
            <Tabs
              orientation='vertical'
              variant='standard'
              value={contentTarget}
              onChange={handleChange}
              sx={{
                borderColor: 'divider',
                marginLeft: '-16px',
                overflow: 'hidden',
              }}
              TabIndicatorProps={{
                sx: {
                  backgroundColor: '#000',
                  left: 0,
                },
              }}
            >
              {treeContent &&
                treeContent.length > 0 &&
                treeContent.map((item, index) => (
                  <TreeTab
                    component='a'
                    href={`#${toKebabCase(item.text)}`}
                    key={index}
                    label={item.text}
                    value={toKebabCase(item.text)}
                    sx={{
                      marginLeft: item.level * 4,
                    }}
                  />
                ))}
            </Tabs>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
function areEqual(prevProps: Props, nextProps: Props) {
  return isEqual(prevProps.treeContent, nextProps.treeContent)
}
export default memo(TreeContent, areEqual)
