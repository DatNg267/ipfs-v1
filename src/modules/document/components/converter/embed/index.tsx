import React, { useEffect } from 'react'
import { DocumentEmbed } from './types'
import Link from 'next/link'
import { Box, Button, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import { convertBlock } from '../../../convert-gitbook'

type Props = {
  block: DocumentEmbed
  [key: string]: any
}
const getUrl = (href: string) => {
  const splited = href.split('https://')[1]
  const indexSplice = splited.indexOf('/')
  return splited.substring(0, indexSplice)
}
const Embed = ({ block }: Props) => {
  if (getUrl(block.data.url) === 'www.youtube.com') {
    return (
      <Stack>
        <Box
          sx={{
            width: '100%',
            height: 'auto',
            paddingTop: '50%',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              height: '100%',
            }}
            id={block.data.url}
            component={'iframe'}
            src='https://www.youtube.com/embed/tgbNymZ7vqY'
          ></Box>
        </Box>
        {/* Caption */}
        <Stack alignItems='center' mt={2}>
          {block.fragments[0].nodes.map((node: any, index: number) => {
            return <Box key={index}>{convertBlock(node)}</Box>
          })}
        </Stack>
      </Stack>
    )
  } else
    return (
      <>
        <Link
          target='_blank'
          href={block.data.url ? block.data.url : '#'}
          passHref
        >
          <Button
            disableRipple
            fullWidth
            variant='outlined'
            color='primary'
            sx={{
              color: 'primary.main',
              borderColor: (theme) => theme.palette.baseGray[900],
              backgroundColor: (theme) => theme.palette.baseGray[900],
              justifyContent: 'flex-start',
              alignItems: 'center',
              borderRadius: '16px',
              px: 4,
              py: 2,
              '&:hover': {
                borderColor: (theme) => theme.palette.baseGray[900],
                color: '#0085FF',
                backgroundColor: (theme) => theme.palette.baseGray[900],
              },
            }}
          >
            {block.data.url.includes('npm') && (
              <Image
                alt='aioz-ipfs-w3storage-npm-sdk'
                width={40}
                height={40}
                src={
                  'https://static.npmjs.com/1996fcfdf7ca81ea795f67f093d7f449.png'
                }
                style={{
                  marginRight: '12px',
                  borderRadius: '4px',
                }}
              />
            )}
            <Box
              sx={{
                minWidth: 0,
                overflow: 'hidden',
              }}
            >
              <Typography
                flex={1}
                variant='body2'
                textAlign={'left'}
                overflow={'hidden'}
                textOverflow={'ellipsis'}
                noWrap
                sx={{
                  minWidth: 0,
                }}
              >
                {block.data.url}
              </Typography>

              {block.data.url.includes('npm') ? (
                <Typography
                  textAlign={'left'}
                  variant='body1'
                  color='text.secondary'
                >
                  npm
                </Typography>
              ) : (
                <Typography
                  variant='body1'
                  textAlign={'left'}
                  color='text.secondary'
                >
                  {getUrl(block.data.url)}
                </Typography>
              )}
            </Box>
          </Button>
        </Link>
      </>
    )
}

export default Embed
