import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const NoneCheckingAuthLayout = ({ children }: Props) => {
  return <>{children}</>
}

export default NoneCheckingAuthLayout
