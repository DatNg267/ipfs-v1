import FormHeading from '@/components/molecules/form-heading'
import { Stack, StackProps, TypographyProps } from '@mui/material'
import React, { ReactNode } from 'react'

type Props = {
  title: string
  children: ReactNode
  typoTitleProps?: TypographyProps
  headingChildren?: ReactNode
  [key: string]: any
}

const FormWrap = ({
  title,
  children,
  typoTitleProps,
  headingChildren,
  ...props
}: Props) => {
  return (
    <Stack
      flex={1}
      component={'form'}
      justifyContent={'center'}
      {...props}
      sx={{
        height: '100%',
        width: '100%',
        maxWidth: { xs: 'unset', md: '476px' },
        ...props.sx,
      }}
      spacing={{ xs: 4, md: '24px' }}
    >
      {/* HEADING */}
      <FormHeading
        headingChildren={headingChildren}
        typoProps={typoTitleProps}
        title={title}
      />
      {children}
    </Stack>
  )
}

export default FormWrap
