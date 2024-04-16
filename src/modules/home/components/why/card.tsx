import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { Box, Stack, Typography } from '@mui/material'
import RichPreviewIcon from './card-image/rich-preview'
import ShortLinkIcon from './card-image/short-link'
import { CARD_HEIGHT, WHY_ARR } from './variables'

import { APP_BORDER_RADIUS_PRIMARY } from '@/themes/_theme'
import CardImageCommon from './card-image/common'

type Props = {
  title: any
  description: any
  titleIcon: any
  color: any
}

const list = [0, 1, 2]
const Card = ({ title, color, description, titleIcon }: Props) => {
  const cardItem = WHY_ARR.find((item, index) => item.title === title)

  return (
    <Stack
      sx={{
        height: '100%',
        backgroundColor: color,
        border: '1px solid',
        borderColor: (theme) => theme.palette.border.main,
        borderRadius: APP_BORDER_RADIUS_PRIMARY,
        '& .why__card-description': {
          transition: 'all ease-out 0.2s',
          overflow: 'hidden',
          maxHeight: 0,
        },
        '&:hover': {
          '& .why__card-body': {
            backgroundColor: 'white',
            justifyContent: 'normal',
          },
          '& .why__card-description': {},
        },
      }}
    >
      <Stack
        direction={'row'}
        alignItems={'center'}
        sx={{
          height: `${CARD_HEIGHT}px`,
          minHeight: `${CARD_HEIGHT}px`,
          position: 'relative',
        }}
      >
        <Stack flex={1} alignItems={'center'} justifyContent={'center'} px={12}>
          <Typography
            variant='subtitle1'
            fontWeight={'bold'}
            textAlign={'center'}
            sx={{
              wordWrap: 'break-word',
            }}
          >
            {title}
          </Typography>
        </Stack>
        <Stack
          p={4}
          sx={{
            position: 'absolute',
            right: 0,
          }}
        >
          <SvgIconCustomized component={titleIcon} />
        </Stack>
      </Stack>
      <Stack
        className='why__card-body'
        sx={{
          height: '100%',
          backgroundColor: (theme) => theme.palette.background.paper,
          borderTop: '1px solid',
          borderColor: (theme) => theme.palette.border.main,
          borderRadius: APP_BORDER_RADIUS_PRIMARY,
          padding: '16px',
        }}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Box className='why__card-description'>
          <Typography variant='body2'>{description}</Typography>
        </Box>
        <Stack flex={1} justifyContent={'center'}>
          {title === WHY_ARR[1].title ? (
            <ShortLinkIcon />
          ) : title === WHY_ARR[11].title ? (
            <RichPreviewIcon />
          ) : (
            cardItem && (
              <CardImageCommon
                imageUrl={cardItem.imageUrl}
                title={cardItem.title}
                animate={cardItem.animation?.animate}
                transition={cardItem.animation?.transition}
              />
            )
          )}
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Card
