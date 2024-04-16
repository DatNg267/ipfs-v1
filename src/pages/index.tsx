import PublicLayout from '@/layouts/landing-page'
import EstimatedMonthlyUsage from '@/modules/home/components/estimated-monthly-usage'
import FaqV2 from '@/modules/home/components/faq-v2'
import FlowStore from '@/modules/home/components/flow-store'
import Intro from '@/modules/home/components/intro'
import StoreFile from '@/modules/home/components/store'
import Why from '@/modules/home/components/why/_index'
import { Box, Container, Paper } from '@mui/material'
import Head from 'next/head'

const Home = () => {
  return (
    <Box>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `history.scrollRestoration = "auto"`,
          }}
        />
      </Head>
      <Paper
        sx={{ p: '60px', backgroundColor: 'inherit', position: 'relative' }}
      >
        <Container maxWidth='lg'>
          <Intro />
        </Container>
      </Paper>
      <Paper
        id='features'
        sx={{
          p: { xs: '16px', md: '60px' },
        }}
      >
        <Container maxWidth='lg'>
          <Why />
        </Container>
      </Paper>
      <Paper sx={{ p: { xs: '16px', md: '60px' } }} id='demo'>
        <Container maxWidth='lg'>
          <StoreFile />
        </Container>
      </Paper>
      <Paper sx={{ p: { xs: '16px', md: '60px' } }}>
        <Container maxWidth='lg'>
          <FlowStore />
        </Container>
      </Paper>
      <Paper sx={{ p: { xs: '16px', md: '60px' } }} id='faq'>
        <Container maxWidth='lg'>
          <FaqV2 />
        </Container>
      </Paper>
      <Paper sx={{ p: { xs: '16px', md: '60px' } }} id='pricing'>
        <Container maxWidth='lg'>
          <EstimatedMonthlyUsage />
        </Container>
      </Paper>
    </Box>
  )
}
Home.Layout = PublicLayout
export default Home

// export async function getServerSideProps() {
//   return { props: {} }
// }

export async function getStaticProps() {
  return { props: {} }
}
