import TyporaphyLoading from '@/components/molecules/typo-loading'
const LoadingPageComponent = () => {
  return (
    <div id='splash-screen'>
      {/* <TyporaphyLoading text='WEB3IPFS' /> */}

      <div
        style={{
          width: '60px',
          height: '60px',
          position: 'relative',
        }}
      >
        <svg
          width='30'
          height='30'
          viewBox='0 0 30 30'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            bottom: 0,
            transform: 'translate(-50%, -50%)',
            fontSize: '30px',
            color: 'transparent',
            animation: `led-text 2s infinite alternate-reverse linear ,
               move-top-left 2s infinite  linear`,
          }}
        >
          <circle
            cx='12'
            cy='12'
            r='10'
            transform='rotate(-180 12 12)'
            fill='currentColor'
          />
        </svg>
        <svg
          width='30'
          height='30'
          viewBox='0 0 30 30'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          style={{
            position: 'absolute',
            top: '50%',
            right: '50%',
            bottom: 0,
            transform: 'translate(50%,-50%)',
            fontSize: '30px',
            color: 'transparent',
            animation: `led-text 2s infinite alternate-reverse linear,
                move-top-right 2s infinite  linear`,
          }}
        >
          <circle
            cx='12'
            cy='12'
            r='10'
            transform='rotate(-180 12 12)'
            fill='currentColor'
          />
        </svg>
        <svg
          width='30'
          height='30'
          viewBox='0 0 30 30'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          style={{
            position: 'absolute',
            bottom: '50%',
            left: '50%',
            transform: 'translate(-50%, 50%)',
            fontSize: '30px',
            color: 'transparent',
            animation: `led-text 2s infinite alternate-reverse linear ,
            move-bottom-left 2s infinite  linear`,
          }}
        >
          <circle
            cx='12'
            cy='12'
            r='10'
            transform='rotate(-180 12 12)'
            fill='currentColor'
          />
        </svg>
        <svg
          width='30'
          height='30'
          viewBox='0 0 30 30'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          style={{
            position: 'absolute',
            right: '50%',
            bottom: '50%',
            transform: 'translate(50%, 50%)',
            fontSize: '30px',
            color: 'transparent',
            animation: `led-text 2s infinite alternate-reverse linear ,
            move-bottom-right 2s infinite  linear`,
          }}
        >
          <circle
            cx='12'
            cy='12'
            r='10'
            transform='rotate(-180 12 12)'
            fill='currentColor'
          />
        </svg>
      </div>

      {/* <TyporaphyLoading text='STORAGE' /> */}
    </div>
  )
}
export default LoadingPageComponent
