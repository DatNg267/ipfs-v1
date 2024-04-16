import { Typography, TypographyProps } from '@mui/material'
type Props = {
  [key: string]: any
} & TypographyProps
const TypographyIPFS = ({ ...props }: Props) => {
  return (
    <>
      <Typography
        component='span'
        textAlign={'center'}
        sx={{
          verticalAlign: 'unset',
          color: (theme) => theme.palette.dotPink[500],
        }}
        {...props}
      >
        I
      </Typography>
      <Typography
        component='span'
        textAlign={'center'}
        sx={{
          verticalAlign: 'unset',
          color: (theme) => theme.palette.dotMint[500],
        }}
        {...props}
      >
        P
      </Typography>
      <Typography
        component='span'
        textAlign={'center'}
        sx={{
          verticalAlign: 'unset',
          color: (theme) => theme.palette.dotBlue[500],
        }}
        {...props}
      >
        F
      </Typography>
      <Typography
        component='span'
        textAlign={'center'}
        sx={{
          verticalAlign: 'unset',
          color: (theme) => theme.palette.dotPurple[500],
        }}
        {...props}
      >
        S
      </Typography>
    </>
  )
}

export default TypographyIPFS
