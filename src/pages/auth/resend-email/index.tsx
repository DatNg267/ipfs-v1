import AuthenticationLayout from '@/layouts/authentication'
import { resendEmail } from '@/modules/login/hooks'
import ResendMailContent from '@/modules/login/pages/resend-mail'
import React from 'react'

const ResendMailPage = () => {
  return <ResendMailContent></ResendMailContent>
}
ResendMailPage.Layout = AuthenticationLayout
export default ResendMailPage

export const getServerSideProps = async (context: any) => {
  const { email } = context?.query

  if (email) {
    await resendEmail({ email: email as string })
      .then((res) => {})
      .catch((err: Error) => {})
  }
  return {
    props: {},
  }
}
