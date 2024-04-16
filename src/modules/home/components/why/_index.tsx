import MansoryLayout, {
  MansoryContent,
  MansoryItem,
} from '@/components/atoms/masonry'
import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import Card from './card'
import { CAP, CARD_HEIGHT, CARD_WIDTH, WHY_ARR } from './variables'
import {
  LineLeftBottom,
  LineRightBottom,
  LineTopLeft,
  LineTopRight,
} from './line-revamp'
import { useEffect } from 'react'

type Props = {}

const Why = (props: Props) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const handleMouseLeave = (e: any) => {
    const description = e.srcElement.querySelector(
      '.why__card-description '
    ) as HTMLParagraphElement
    if (description) {
      description.style.setProperty('max-height', `${0}px`)
    }
  }
  const handleHover = (e: any) => {
    const description = e.srcElement.querySelector(
      '.why__card-description '
    ) as HTMLParagraphElement
    const content = e.srcElement.querySelector(
      '.why__card-description p'
    ) as HTMLParagraphElement
    if (content && description) {
      const height = content.clientHeight
      description.style.setProperty('max-height', `${height.toString()}px`)
    }
  }
  useEffect(() => {
    const mansoryContent = document.querySelectorAll(
      '.mansory-content > .MuiStack-root:first-of-type'
    ) as any
    if (mansoryContent && mansoryContent.length > 0) {
      mansoryContent.forEach((element: HTMLDivElement) => {
        element.addEventListener('mouseover', handleHover)
        // element.addEventListener('touchstart', handleHover)

        element.addEventListener('mouseenter', handleHover)
        element.addEventListener('mouseleave', handleMouseLeave)
        // element.addEventListener('touchstart', handleHover)
        // element.addEventListener('touchend', handleMouseLeave)
        // element.removeEventListener('touchmove', handleMouseLeave)
      })
    }
    return () => {
      if (mansoryContent && mansoryContent.length > 0) {
        mansoryContent.forEach((element: HTMLDivElement) => {
          element.removeEventListener('mouseover', handleHover)
          // element.removeEventListener('touchstart', handleHover)

          element.removeEventListener('mouseenter', handleHover)
          element.removeEventListener('mouseleave', handleMouseLeave)

          // element.removeEventListener('touchstart', handleHover)
          // element.removeEventListener('touchmove', handleMouseLeave)
        })
      }
    }
  }, [])
  return (
    <Stack spacing={{ xs: '16px', md: '32px' }}>
      <Stack
        alignItems={'center'}
        sx={{ paddingBottom: { xs: '0px', md: '16px' } }}
      >
        <Stack spacing={4}>
          <Typography component={'span'} textAlign={'center'}>
            <Typography
              fontWeight='bold'
              variant='h3'
              component='span'
              textAlign={'center'}
            >
              WHY W3
            </Typography>
            <Typography
              fontWeight='bold'
              variant='h3'
              component='span'
              textAlign={'center'}
              sx={{
                color: (theme) => theme.palette.dotPink[500],
              }}
            >
              I
            </Typography>
            <Typography
              fontWeight='bold'
              variant='h3'
              component='span'
              textAlign={'center'}
              sx={{
                color: (theme) => theme.palette.dotMint[500],
              }}
            >
              P
            </Typography>
            <Typography
              fontWeight='bold'
              variant='h3'
              component='span'
              textAlign={'center'}
              sx={{
                color: (theme) => theme.palette.dotBlue[500],
              }}
            >
              F
            </Typography>
            <Typography
              fontWeight='bold'
              variant='h3'
              component='span'
              textAlign={'center'}
              sx={{
                color: (theme) => theme.palette.dotPurple[500],
              }}
            >
              S
            </Typography>
            <Typography
              fontWeight='bold'
              variant='h3'
              component='span'
              textAlign={'center'}
            >
              .STORAGE?
            </Typography>
          </Typography>

          <Typography
            sx={{
              maxWidth: '855px',
            }}
            variant='body1'
            textAlign={'center'}
            fontWeight={500}
          >
            W3IPFS.STORAGE is the ultimate choice for developers, creators, and
            businesses seeking reliable data storage solutions for Web3 dApps.
            Explore the features and benefits that set W3IPFS.STORAGE apart and
            learn how it can revolutionize your Web3 projects
          </Typography>
        </Stack>
      </Stack>

      {/* MANSORY LAYOUT */}
      <Stack alignItems={'center'} sx={{}}>
        <MansoryLayout>
          {WHY_ARR.map((item, index) => (
            <Box key={index}>
              {item.size === 0 && (
                <MansoryItem
                  key={index}
                  className='mansory-item'
                  sx={{
                    position: 'relative',
                    zIndex: 2,
                    breakInside: 'avoid',
                    '&:first-of-type .mansory-content': {
                      mt: 0,
                    },
                    pb: { xs: '16px', md: '16px' },
                    px: { xs: 0, md: '16px' },
                    ml: { xs: 0, md: '-16px' },
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      height: '491px',
                      minHeight: '491px',
                      // width: `${CARD_WIDTH}px`,
                      overflow: 'hidden',
                      transition: 'height ease 0.2s',
                    }}
                  >
                    <MansoryContent
                      sx={{
                        transition: 'height ease 0.2s',

                        height: '475px',
                        minHeight: '475px',
                        p: '16px',
                        pt: 0,
                        '&:hover': {
                          height: '490px',
                          pb: '16px',
                        },
                      }}
                    >
                      <Card
                        color={item.color}
                        title={item.title}
                        description={item.desciption}
                        titleIcon={item.titleIcon}
                      />
                    </MansoryContent>
                    {/* {!isMobile && <>{item.lines}</>} */}
                    {item.bottom && (
                      <Stack
                        sx={{
                          height: '16px',
                          backgroundColor: '#000',
                          // border: '16px solid #000',
                          position: 'relative',
                          ...(item.bottom.left && {
                            marginRight: '50%',
                            borderTopRightRadius: '99px',
                            borderBottomRightRadius: '99px',
                          }),
                          ...(item.bottom.right && {
                            marginLeft: '50%',
                            borderTopLeftRadius: '99px',
                            borderBottomLeftRadius: '99px',
                          }),
                          alignItems: 'flex-end',
                          display: { xs: 'none', md: 'block' },
                        }}
                      >
                        <Box
                          sx={{
                            position: 'absolute',
                            bottom: `0px`,
                            left: '-16px',
                            height: '32px',
                            width: '32px',
                            borderBottom: `16px solid #000`,
                            borderLeft: `16px solid #000`,
                            borderBottomLeftRadius: '32px',
                            display: { xs: 'none', md: 'block' },

                            ...(item.bottom.right && {
                              display: 'none',
                            }),
                          }}
                        />
                        {/* TOP RIGHT */}
                        <Box
                          sx={{
                            position: 'absolute',
                            bottom: `0px`,
                            right: '-16px',
                            height: '32px',
                            width: '32px',
                            borderBottom: `16px solid #000`,
                            borderRight: `16px solid #000`,
                            borderBottomRightRadius: '32px',
                            display: { xs: 'none', md: 'block' },
                            ...(item.bottom.left && {
                              display: 'none',
                            }),
                          }}
                        />
                      </Stack>
                    )}
                  </Box>

                  {/* POSITION PUT LINE LEFT AND RIGHT */}
                  {item.topLines && item.topLines.left && (
                    <LineTopLeft percentHeight={item.topLines.left.percent} />
                  )}
                  {item.topLines && item.topLines.right && <LineTopRight />}
                  {item.bottomLines && item.bottomLines.left && (
                    <LineLeftBottom />
                  )}
                  {item.bottomLines && item.bottomLines.right && (
                    <LineRightBottom />
                  )}
                  {/* POSITION BOTTOM */}
                  {item.bottom && (
                    <Box
                      sx={{
                        position: 'absolute',
                        left: '16px',
                        right: '16px',
                        height: '16px',
                        overflow: 'hidden',
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: `0px`,
                          right: '-16px',
                          height: '32px',
                          width: '32px',
                          borderTop: `16px solid #000`,
                          borderRight: `16px solid #000`,
                          borderTopRightRadius: '32px',
                          display: { xs: 'none', md: 'block' },

                          ...(item.bottom.left && {
                            display: 'none',
                          }),
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: `0px`,
                          left: '-16px',
                          height: '32px',
                          width: '32px',
                          borderTop: `16px solid #000`,
                          borderLeft: `16px solid #000`,
                          borderTopLeftRadius: '32px',
                          display: { xs: 'none', md: 'block' },

                          ...(item.bottom.right && {
                            display: 'none',
                          }),
                        }}
                      />
                    </Box>
                  )}
                </MansoryItem>
              )}
              {item.size === 2 && (
                <MansoryItem
                  key={index}
                  sx={{
                    height: '200px',
                    minHeight: '200px',
                    display: { xs: 'none', md: 'block' },
                  }}
                >
                  <Box></Box>
                </MansoryItem>
              )}
              {item.size === 1 && (
                <MansoryItem
                  key={index}
                  sx={{
                    height: `calc(${CARD_HEIGHT}px - ${CAP}px)`,
                    minHeight: `calc(${CARD_HEIGHT}px - ${CAP}px)`,
                    display: { xs: 'none', md: 'block' },
                  }}
                >
                  <Box></Box>
                </MansoryItem>
              )}
            </Box>
          ))}
        </MansoryLayout>
      </Stack>
      <></>
    </Stack>
  )
}

export default Why
