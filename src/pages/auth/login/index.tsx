import AuthenticationLayout from '@/layouts/authentication'
import LoginPageContent from '@/modules/login/pages/login'

const LoginPage = () => {
  return <LoginPageContent />
}
LoginPage.Layout = AuthenticationLayout
export default LoginPage

export async function getServerSideProps() {
  return { props: {} }
}
