import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import ThreeCircle from '@/components/organisms/3-circle'
import { Icons } from '@/themes/_icons'
import { Stack, Typography, TypographyProps } from '@mui/material'
import { ReactNode } from 'react'

type Props = {
  title: string
  typoProps?: TypographyProps
  headingChildren?: ReactNode
}

const FormHeading = ({ title, typoProps, headingChildren }: Props) => {
  return (
    <Stack direction={'column'} justifyContent={'space-between'}>
      <Typography
        flex={1}
        variant='h4'
        fontWeight={600}
        textAlign={{ xs: 'center', md: 'left' }}
        {...typoProps}
      >
        {title}
      </Typography>

      {headingChildren}
    </Stack>
  )
}

export default FormHeading
