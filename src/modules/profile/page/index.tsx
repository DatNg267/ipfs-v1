import { PaperStyled } from '@/components/atoms/paper'
import { Container, Stack } from '@mui/material'
import AccountForm from '../components/account-form'
import ChangePasswordForm from '../components/change-password'
import ProfileHeading from '../components/heading'
import ProfilePanel from '../components/panel'

type Props = {}

const ProfilePageContent = (props: Props) => {
  return (
    <>
      <ProfileHeading />
      <PaperStyled
        sx={{
          flex: 'none',
          padding: { xs: '8px', md: '28px' },
        }}
      >
        <Container maxWidth='xl'>
          <ProfilePanel />
        </Container>
      </PaperStyled>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        flex={1}
        spacing={1}
        sx={{
          m: '2px 4px',
        }}
      >
        <AccountForm />
        <ChangePasswordForm />
      </Stack>
    </>
  )
}

export default ProfilePageContent
