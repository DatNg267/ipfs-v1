import { arrayFont } from '@/themes/font'
import React from 'react'

type Props = {
  text: string
  initColor?: string
  mainColor?: string
}

const TyporaphyLoading = ({ text }: Props) => {
  return (
    <div
      className='loading-text'
      style={{
        position: 'relative',
        background: `linear-gradient(to right, black 50%, #ccccbd 0%)`,
        // background: 'black',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '400% 100%',
        backgroundPosition: 'right bottom',
        animation: 'loading-text 2s ease-in 0s forwards',
      }}
    >
      <p
        style={{
          fontWeight: 'bold',
          color: 'transparent',
          fontFamily: arrayFont.style.fontFamily,
        }}
      >
        {text}
      </p>
    </div>
  )
}

export default TyporaphyLoading
