import { Box } from '@mui/material'

export const CustomeBottomLine = ({
  alignment,
  lineHeight = 50,
  leftLineHeight = 50,
  rightLineHeight = 50,
  horizontalLineHeight = 60,
  lineWidth = 20,
  color = 'black',
  margin = 40,
}: {
  alignment: 'left' | 'right'
  lineHeight?: number
  leftLineHeight?: number
  rightLineHeight?: number
  horizontalLineHeight?: number
  lineWidth?: number
  color?: string
  margin?: number
}) => {
  return (
    <>
      {/* Inner Border*/}
      <Box
        sx={{
          position: 'absolute',
          bottom: `-${margin}px`,
          top: `100%`,
          ...(alignment === 'left'
            ? {
                left: `-${margin}px`,
                right: `100%`,
              }
            : {
                right: `-${margin}px`,
                left: `100%`,
              }),
          borderBottom: `20px solid ${color}`,
          ...(alignment === 'left'
            ? {
                borderLeft: `20px solid ${color}`,
                borderBottomLeftRadius: '40px',
              }
            : {
                borderRight: `20px solid ${color}`,
                borderBottomRightRadius: '40px',
              }),
        }}
      ></Box>
      {/* Line Horizontal Bottom */}
      <Box
        sx={{
          position: 'absolute',
          bottom: `-${margin}px`,
          right:
            alignment === 'right'
              ? `-${margin}px`
              : `${100 - horizontalLineHeight}%`,
          left:
            alignment === 'left'
              ? `-${margin}px`
              : `${100 - horizontalLineHeight}%`,
          height: `${lineWidth}px`,
          backgroundColor: `${color}`,
          ...(alignment === 'left'
            ? {
                borderTopRightRadius: '99px',
                borderBottomRightRadius: '99px',
              }
            : {
                borderTopLeftRadius: '99px',
                borderBottomLeftRadius: '99px',
              }),
        }}
      />
      {/* Line Vertical Left And Right*/}
      <Box
        sx={{
          position: 'absolute',
          bottom: `-${margin}px`,
          ...(alignment === 'left'
            ? {
                top: `${100 - leftLineHeight}%`,
                left: `-${margin}px`,
              }
            : {
                right: `-${margin}px`,
                top: `${100 - rightLineHeight}%`,
              }),

          width: `${lineWidth}px`,
          backgroundColor: `${color}`,
          ...(alignment === 'left'
            ? {
                borderTopRightRadius: '99px',
                borderTopLeftRadius: '99px',
              }
            : {
                borderTopRightRadius: '99px',
                borderTopLeftRadius: '99px',
              }),
        }}
      />
    </>
  )
}

export const CustomeTopLine = ({
  alignment,
  lineHeight = 50,
  rightLineHeight = 50,
  leftLineHeight = 50,
  horizontalLineHeight = 60,
  lineWidth = 20,
  color = 'black',
  margin = 40,
}: {
  alignment: 'left' | 'right'
  lineHeight?: number
  leftLineHeight?: number
  rightLineHeight?: number
  horizontalLineHeight?: number
  lineWidth?: number
  color?: string
  margin?: number
}) => {
  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          top: `-${margin}px`,
          bottom: `100%`,
          ...(alignment === 'left'
            ? {
                left: `-${margin}px`,
                right: `100%`,
              }
            : {
                right: `-${margin}px`,
                left: `100%`,
              }),
          borderTop: `20px solid ${color}`,
          ...(alignment === 'left'
            ? {
                borderLeft: `20px solid ${color}`,
                borderTopLeftRadius: '40px',
              }
            : {
                borderRight: `20px solid ${color}`,
                borderTopRightRadius: '40px',
              }),
        }}
      ></Box>
      <Box
        sx={{
          position: 'absolute',
          top: `-${margin}px`,
          right:
            alignment === 'right'
              ? `-${margin}px`
              : `${100 - horizontalLineHeight}%`,
          left:
            alignment === 'left'
              ? `-${margin}px`
              : `${100 - horizontalLineHeight}%`,
          height: `${lineWidth}px`,
          backgroundColor: `${color}`,
          ...(alignment === 'left'
            ? {
                borderTopRightRadius: '99px',
                borderBottomRightRadius: '99px',
              }
            : {
                borderTopLeftRadius: '99px',
                borderBottomLeftRadius: '99px',
              }),
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: `-${margin}px`,
          ...(alignment === 'left'
            ? {
                left: `-${margin}px`,
                bottom: `${100 - leftLineHeight}%`,
              }
            : {
                right: `-${margin}px`,
                bottom: `${100 - rightLineHeight}%`,
              }),
          width: `${lineWidth}px`,
          backgroundColor: `${color}`,
          borderBottomLeftRadius: '99px',
          borderBottomRightRadius: '99px',
        }}
      />
    </>
  )
}
