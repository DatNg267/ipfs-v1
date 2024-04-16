import { useImageLoader } from '@/components/atoms/loading-image'
import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { Icons } from '@/themes/_icons'
import { FileType } from '@/utils/tools'
import { Box, Skeleton, Typography } from '@mui/material'
import Image from 'next/image'
import { memo, useEffect, useState } from 'react'
import CodeExample from '../code-example'
const BASE_URL = process.env.NEXT_PUBLIC_AIOZ_PUBLIC_IPFS_GATEWAY

const RenderFile = ({
  fileName,
  fileHash,
}: {
  fileName: string
  fileHash: string
}) => {
  const [type, setType] = useState<FileType | null>(null)
  const [text, setText] = useState<string | null>(null)

  // const predictType = getTypeFileFromFileName(fileName)

  useEffect(() => {
    let idInterval = setInterval(() => {
      const url = `${BASE_URL}${fileHash}?filename=${fileName}` // Replace <your_url_here> with the actual URL
      const request = new Request(url, {
        method: 'GET',
      })
      fetch(request)
        .then((res) => {
          if (res.headers.get('content-type')?.toString().startsWith('image')) {
            setType('img')
            clearInterval(idInterval)
            return
          }
          if (res.headers.get('content-type')?.toString().startsWith('video')) {
            setType('video')
            clearInterval(idInterval)
            return
          }
          if (res.headers.get('content-type')?.toString().startsWith('text')) {
            setType('text')
            res.text().then((res) => setText(res))
            clearInterval(idInterval)
            return
          }
          if (
            res.headers
              .get('content-type')
              ?.toString()
              .startsWith('application/json')
          ) {
            setType('json')
            res.text().then((res) => setText(res))
            clearInterval(idInterval)
            return
          }
          setType('file')
          clearInterval(idInterval)
        })
        .catch((err) => {})
    }, 10000)

    return () => {
      if (idInterval) clearInterval(idInterval)
    }
  }, [fileHash])
  const { success, handleSuccess } = useImageLoader()
  // if (predictType && predictType === 'img') {
  // return (
  //   <>
  //     <Image
  //       id={'image' + fileHash}
  //       alt='aioz-w3ipfs-files-preview'
  //       src={`gateway-ipfs.attoaioz.cyou/ipfs/${fileHash}?filename=${fileName}`}
  //       fill
  //       style={{
  //         position: 'absolute',
  //         objectFit: 'cover',
  //         borderRadius: '8px',
  //       }}
  //       onLoadingComplete={() => {
  //         handleSuccess()
  //       }}
  //     />
  //     {!success && (
  //       <Skeleton
  //         animation='wave'
  //         sx={{
  //           position: 'absolute',
  //           top: 0,
  //           left: 0,
  //           right: 0,
  //           bottom: 0,
  //           zIndex: 100,
  //         }}
  //       />
  //     )}
  //   </>
  // )
  // } else
  switch (type) {
    case 'img': {
      return (
        <>
          <Image
            id={'image' + fileHash}
            alt='aioz-w3ipfs-files-preview'
            src={`${BASE_URL}${fileHash}?filename=${fileName}`}
            fill
            style={{
              position: 'absolute',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
            onLoadingComplete={() => {
              handleSuccess()
            }}
          />
          {!success && (
            <Skeleton
              animation='wave'
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 100,
              }}
            />
          )}
        </>
      )
    }
    case 'text': {
      return (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 100,
            overflow: 'hidden',
            '& .cm-theme': {
              p: 2,
            },
            '& .cm-scroller': {
              overflow: 'auto',
              height: '492px',
            },
          }}
        >
          {text && <CodeExample codeString={text}></CodeExample>}
        </Box>
      )
    }
    case 'json': {
      return (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 100,
            overflow: 'hidden',
            '& .cm-theme': {
              p: 2,
            },
            '& .cm-scroller': {
              overflow: 'auto',
              height: '492px',
            },
          }}
        >
          {text && (
            <CodeExample
              codeString={JSON.stringify(JSON.parse(text), null, '\t')}
            ></CodeExample>
          )}
        </Box>
      )
    }
    case 'file': {
      return (
        <>
          <SvgIconCustomized
            component={Icons.EyeOff}
            sx={{
              color: 'text.secondary',
            }}
          />
          <Typography variant='subtitle2' color='text.secondary'>
            We can’t preview this file
          </Typography>
        </>
      )
    }
    case 'video': {
      return (
        <video
          id={'video' + fileHash}
          controls
          src={BASE_URL ? BASE_URL + fileHash : ''}
          style={{
            width: '100%',
            height: '100%',
          }}
        ></video>
      )
    }
    default: {
      return (
        <Skeleton
          animation='wave'
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 100,
          }}
        />
      )
    }
  }
}
export default memo(RenderFile)
// const url = 'gateway-ipfs.attoaioz.cyou/ipfs/bafkreifjxf2wgq6sysv4exop3emvqmnvwi3vkgydtihzh5urw2bzubjqva?filename=shield-preference-experiments.json'; // Replace <your_url_here> with the actual URL
// const request = new Request(url, {
//   method: 'GET',
// });
// fetch(request)
//   .then(data => {
//     // process the response data here
//   })
//   .catch(error => {
//     // handle any errors here
//     console.error('Error:', error);
//   });
