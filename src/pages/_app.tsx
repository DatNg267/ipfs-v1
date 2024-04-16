import ErrorBoundary from '@/components/organisms/error-boundary'
import ToastCustomized from '@/components/organisms/toast'
import store from '@/redux/store'
import getDesignTheme from '@/themes/_theme'
import createEmotionCache from '@/themes/createEmotionCache'
import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import Head from 'next/head'
import * as React from 'react'
import toast, { useToasterStore } from 'react-hot-toast'
import { Provider } from 'react-redux'
// import 'highlight.js/styles/panda-syntax-dark.css'
import { AppRouter } from '@/constants'
import { HEAD_DASHBOARD_SEO, HEAD_DOS_SEO, HEAD_SEO } from '@/constants/seo'
import NoneCheckingAuthLayout from '@/layouts/none'
import { closeLoading } from '@/services/loader'
import 'highlight.js/styles/night-owl.css'
import { useRouter } from 'next/router'
import '../../public/styles/globals.css'
import '../styles/test.css'
import useScrollRestoration from '@/hooks/useScrollRestoration'
// import '../../public/styles/splash-screen.css'

const clientSideEmotionCache = createEmotionCache()
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  Layout?: (props: { children: React.ReactNode }) => React.ReactElement
}
export interface MyAppProps extends AppProps {
  Component: NextPageWithLayout
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    router: propsRouter,
  } = props
  const router = useRouter()
  // useScrollRestoration(propsRouter)
  const Layout = Component.Layout ? Component.Layout : NoneCheckingAuthLayout

  const { toasts } = useToasterStore({
    duration: 5000,
  })

  const TOAST_LIMIT = 2
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      if (
        router.asPath.includes('auth/') ||
        router.asPath.includes(AppRouter.DASHBOARD)
      )
        return
      closeLoading()
    }
  }, [router])

  React.useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= TOAST_LIMIT)
      .forEach((t) => toast.dismiss(t.id))
  }, [toasts])
  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name='viewport' content='initial-scale=1, width=device-width' />
          <meta name='twitter:card' content={HEAD_SEO.twitter.card} />
          <meta name='twitter:image' content={HEAD_SEO.twitter.image} />
          <meta name='twitter:site' content={HEAD_SEO.twitter.site} />
          <meta property='og:image' content={HEAD_SEO.og.ogImage} />
          <meta property='og:site_name' content={HEAD_SEO.og.siteName} />
          <meta name='robots' content='noindex, nofollow' />
          {/* Added this line for robots no index */}
          {/* LP && LOGIN PAGE*/}
          {(router.asPath === '/' || router.asPath.includes('/auth')) && (
            <>
              {/* Main */}
              <title>{HEAD_SEO.title}</title>
              <meta name='description' content={HEAD_SEO.description} />
              {/* OG */}
              <meta property='og:title' content={HEAD_SEO.og.title} />
              <meta
                property='og:description'
                content={HEAD_SEO.og.description}
              />
              <meta property='og:url' content={HEAD_SEO.og.ogUrl} />

              {/* Twitter */}
              <meta name='twitter:title' content={HEAD_SEO.twitter.title} />
              <meta
                name='twitter:description'
                content={HEAD_SEO.twitter.description}
              />
            </>
          )}
          {/* DOCS */}
          {router.asPath.includes(AppRouter.DOCUMENT) &&
            pageProps &&
            pageProps.data && (
              <>
                {/* Main */}
                <title>
                  {pageProps.data.title
                    ? pageProps.data.title + ' | ' + HEAD_DOS_SEO.title
                    : HEAD_DOS_SEO.title}
                </title>
                <meta name='description' content={pageProps.description} />
                {/* OG */}
                <meta
                  property='og:title'
                  content={
                    pageProps.data.title
                      ? pageProps.data.title + ' | ' + HEAD_DOS_SEO.title
                      : HEAD_DOS_SEO.title
                  }
                />
                <meta
                  property='og:description'
                  content={pageProps.description}
                />
                <meta property='og:url' content={HEAD_DOS_SEO.og.ogUrl} />

                {/* Twitter */}
                <meta
                  name='twitter:title'
                  content={
                    pageProps.data.title
                      ? pageProps.data.title + ' | ' + HEAD_DOS_SEO.title
                      : HEAD_DOS_SEO.title
                  }
                />
                <meta
                  name='twitter:description'
                  content={pageProps.description}
                />
              </>
            )}
          {/* DASHBOARD */}
          {router.asPath.includes('dashboard') && (
            <>
              <title>{HEAD_DASHBOARD_SEO.title}</title>
              <meta name='robots' content='noindex,nofollow' />
              <meta
                name='description'
                content={HEAD_DASHBOARD_SEO.description}
              />
              {/* OG */}
              <meta property='og:title' content={HEAD_DASHBOARD_SEO.title} />
              <meta
                property='og:description'
                content={HEAD_DASHBOARD_SEO.description}
              />
              <meta property='og:url' content={HEAD_DASHBOARD_SEO.og.ogUrl} />
              {/* Twitter */}
              <meta name='twitter:title' content={HEAD_DASHBOARD_SEO.title} />
              <meta
                name='twitter:description'
                content={HEAD_DASHBOARD_SEO.description}
              />
            </>
          )}
        </Head>
        <ThemeProvider theme={getDesignTheme('light')}>
          <CssBaseline />
          <ErrorBoundary>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ErrorBoundary>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  )
}
