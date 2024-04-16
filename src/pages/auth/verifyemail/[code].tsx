import { VerifyEmailReponse } from '@/apis/auth/type'
import AuthenticationLayout from '@/layouts/authentication'
import { verifyEmail } from '@/modules/login/hooks'
import VerifyEmailContent from '@/modules/login/pages/verify-email'
import { UserErrorMessage } from '@/utils/error'

const VerifyEmailPage = ({
  status,
  data,
}: {
  status: 'error' | 'success'
  data: string | VerifyEmailReponse
}) => {
  return <VerifyEmailContent status={status} data={data} />
}
VerifyEmailPage.Layout = AuthenticationLayout

export default VerifyEmailPage
export async function getServerSideProps({ query }: { query: any }) {
  const { code } = query
  if (!code) {
    return {
      status: 'error',
      data: UserErrorMessage.AN_ERROR_HAS_OCCURRED.toString(),
    }
  }
  const res = await verifyEmail({ code })
    .then((res) => {
      return {
        status: 'success',
        data: res,
      }
    })
    .catch((err: Error) => {
      return {
        status: 'error',
        data: UserErrorMessage.VERIFY_EMAIL_EXPERIED.toString(),
      }
    })

  return {
    props: {
      ...res,
    },
  }
}
