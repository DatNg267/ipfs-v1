import { SvgIcon, SvgIconProps, styled } from '@mui/material'

// Set color of svg element = htmlColor property
export const SvgIconCustomized = styled(
  (props: SvgIconProps & { [key: string]: any }) => (
    <SvgIcon htmlColor='inherit' {...props} />
  )
)<SvgIconProps>((_props) => {
  const { sx, theme } = _props
  return theme.unstable_sx({
    fill: 'none',
    fontSize: '24px',
    '& path, rect, circle, ellipse, line, polyline, polygon': {
      color: 'currentcolor',
      // stroke: 'currentcolor',
    },
    ...sx,
  })
})
