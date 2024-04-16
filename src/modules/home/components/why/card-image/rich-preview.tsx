import { ImagesHomePage } from '@/themes/_images'
import { Box, Stack, keyframes } from '@mui/material'
import { times } from 'lodash'
import Image from 'next/image'

const generateKeyframes = (itemIndex, total) => {
  let obj = {}
  times(total * 2, () => null).forEach((element, index) => {
    obj = {
      ...obj,
      [`${(100 / (total * 2)) * index}%`]: {
        visibility:
          itemIndex === index + 1 ||
          index + 1 === total + (total - itemIndex + 1)
            ? 'visible'
            : 'hidden',
      },
    }
  })
  return keyframes`
  ${obj}
`
}
const keyframs = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }

`

type Props = {}
const RichPreviewIcon = (props: Props) => {
  return (
    <Box
      sx={{
        width: '150px',
        height: '150px',
        overflow: 'hidden',
      }}
    >
      <Stack
        direction={'row'}
        sx={{
          position: 'relative',
        }}
      >
        <Box
          sx={{
            zIndex: 1,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <Image
            alt={'aioz'}
            src={ImagesHomePage.WhyOption8_1}
            width={150}
            height={150}
            loading='lazy'
          />
        </Box>
        {[2, 3, 4].map((item, index) => (
          <Box
            key={index}
            sx={{
              zIndex: 2,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              visibility: 'hidden',

              animation: `${generateKeyframes(item, 4)} 5s infinite `,
            }}
          >
            <Image
              alt={'aioz'}
              src={ImagesHomePage[`WhyOption8_${item}`]}
              width={150}
              height={150}
              loading='lazy'
            />
          </Box>
        ))}
      </Stack>
    </Box>
  )
}

export default RichPreviewIcon
