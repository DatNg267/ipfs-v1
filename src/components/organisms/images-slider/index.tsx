import { IPFSGetFolderResponse } from '@/apis/ipfs/type'
import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { Icons } from '@/themes/_icons'
import { IconButton, Stack } from '@mui/material'
import { debounce } from 'lodash'
import { useEffect } from 'react'
import RenderFile from '../render-file'
const BASE_URL = process.env.NEXT_PUBLIC_AIOZ_PUBLIC_IPFS_GATEWAY

type Props = {
  files: IPFSGetFolderResponse['Links']
  handleChangeIndex: (index: number) => void
  currentTargetIndex: number
  cid: string
}

const ImagesSlider = ({
  currentTargetIndex,
  handleChangeIndex,
  files,
  cid,
}: Props) => {
  const TOTAL_ITEM = files?.length

  function pauseVid() {
    let vids = document.querySelectorAll('video')
    vids.forEach((element) => {
      element.pause()
    })
  }
  useEffect(() => {
    pauseVid()
  }, [currentTargetIndex])
  useEffect(() => {
    const handleWindowResize = debounce(() => {
      relocationItem()
    }, 0)
    handleWindowResize()
    window.addEventListener('resize', handleWindowResize)
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [currentTargetIndex])

  const relocationItem = () => {
    const sliderItems = document.querySelectorAll(
      '.slider-item'
    ) as unknown as HTMLElement[]
    const sliderWrapper = document.querySelector(
      '.slider-wrapper'
    ) as HTMLElement
    if (!sliderWrapper || !sliderItems) return

    const sliderWrapperWidth = sliderWrapper.clientWidth
    sliderItems.forEach((element, index) => {
      sliderItems[index].style.transform = `translateX(${
        (index - currentTargetIndex) * sliderWrapperWidth
      }px)`
    })
  }
  const handleNext = () => {
    const sliderItems = document.querySelectorAll(
      '.slider-item'
    ) as unknown as HTMLElement[]
    const sliderWrapper = document.querySelector(
      '.slider-wrapper'
    ) as HTMLElement
    if (!sliderWrapper) return

    const sliderWrapperWidth = sliderWrapper.clientWidth
    if (currentTargetIndex + 1 >= TOTAL_ITEM) {
      // sliderItems.forEach((element, index) => {
      //   sliderItems[index].style.transform = `translateX(${
      //     index * sliderWrapperWidth
      //   }px)`
      // })
      // handleChangeIndex(0)
    } else {
      sliderItems.forEach((element, index) => {
        sliderItems[index].style.transform = `translateX(${
          (index - (currentTargetIndex + 1)) * sliderWrapperWidth
        }px)`
      })
      handleChangeIndex(currentTargetIndex + 1)
    }
  }

  const handlePrev = () => {
    const sliderItems = document.querySelectorAll('.slider-item')
    const sliderWrapper = document.querySelector(
      '.slider-wrapper'
    ) as HTMLElement
    if (!sliderWrapper) return

    const sliderWrapperWidth = sliderWrapper.clientWidth

    if (currentTargetIndex === 0) {
    } else {
      sliderItems.forEach((element, index) => {
        ;(sliderItems[index] as HTMLElement).style.transform = `translateX(${
          (index - (currentTargetIndex - 1)) * sliderWrapperWidth
        }px)`
      })
      handleChangeIndex(currentTargetIndex - 1)
    }
  }

  return (
    <Stack
      flex={1}
      position={'relative'}
      className='slider'
      sx={{
        overflow: 'hidden',
        borderRadius: '8px',
        border: '1px solid',
        borderColor: (theme) => theme.palette.baseGray[800],
      }}
    >
      <Stack
        direction={'row'}
        flex={1}
        className='slider-wrapper'
        sx={{
          transition: `transform 0.4s cubic-bezier(.25,.8,.25,1), color 0.4s cubic-bezier(.25,.8,.25,1), opacity 0.4s cubic-bezier(.25,.8,.25,1)`,
        }}
      >
        {files &&
          cid &&
          files.map((item, i) => (
            <Stack
              key={i}
              alignItems={'center'}
              justifyContent={'center'}
              className='slider-item'
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                transform: `translateX(${i * 100}%)`,
                backgroundColor: (theme) => theme.palette.background.default,
                transition: `transform 0.4s cubic-bezier(.25,.8,.25,1), color 0.4s cubic-bezier(.25,.8,.25,1), opacity 0.4s cubic-bezier(.25,.8,.25,1)`,
              }}
            >
              <RenderFile fileName={item.Name} fileHash={item.Hash['/']} />
            </Stack>
          ))}
      </Stack>

      <IconButton
        sx={{
          position: 'absolute',
          top: '50%',
          left: 8,
          transform: 'translate(0,-50%)',
          color: 'primary.main',
          backgroundColor: 'rgba(0,0,0,0.5)',
          '&:hover': {
            backgroundColor: 'primary.main',
            color: 'text.primary',
          },
        }}
        disabled={currentTargetIndex === 0}
        onClick={handlePrev}
      >
        <SvgIconCustomized
          component={Icons.ChevronLeft}
          sx={{
            fontSize: '32px',
            color: 'inherit',
          }}
        />
      </IconButton>
      <IconButton
        sx={{
          position: 'absolute',
          top: '50%',
          right: 8,
          transform: 'translate(0,-50%)',
          color: 'primary.main',
          backgroundColor: 'rgba(0,0,0,0.5)',
          '&:hover': {
            backgroundColor: 'primary.main',
            color: 'text.primary',
          },
        }}
        disabled={currentTargetIndex + 1 >= TOTAL_ITEM}
        onClick={handleNext}
      >
        <SvgIconCustomized
          component={Icons.ChevronRight}
          sx={{
            fontSize: '32px',
            color: 'inherit',
          }}
        />
      </IconButton>
    </Stack>
  )
}

export default ImagesSlider
