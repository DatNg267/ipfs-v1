import { HEAD_SEO } from '@/constants/seo'
import React from 'react'

type Props = {
  title: string
  description: string
}

const DocumentHeadSeo = ({ title, description }: Props) => {
  return (
    <>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:site' content={'Aioz W3ipfs Docs'} />
    </>
  )
}

export default DocumentHeadSeo
