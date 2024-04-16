import AuthenticationLayout from '@/layouts/authentication'
import SendEmailForm from '@/modules/login/components/form-forgot'

const ResetPasswordPage = () => {
  return <SendEmailForm />
}
ResetPasswordPage.Layout = AuthenticationLayout
export default ResetPasswordPage
