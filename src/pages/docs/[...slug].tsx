import { DocumentApis } from '@/apis/document'
import { HEAD_DOS_SEO } from '@/constants/seo'
import { DOCS_NAVS, PAGE_DATA } from '@/data/docs/_index'
import DocumentLayout from '@/layouts/document'
import DocumentPageContent from '@/modules/document/page'
import {
  DocumentContent,
  DocumentFiles,
  DocumentFilesResponse,
  DocumentNode,
  NavPage,
  Navs,
} from '@/modules/document/types'
import { PageRefsMapping } from '@/modules/document/types/page-refs'
import { isEmpty } from 'lodash'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
type Props = {
  files: DocumentFiles
  data: DocumentContent | null
  navList: Navs | null
  prev: NavPage | null
  next: NavPage | null
  pageRefsMapping: PageRefsMapping
}
const DocumentPage = ({ ...props }: Props) => {
  const { files, data, navList, prev, next, pageRefsMapping } = props
  const router = useRouter()
  // useEffect(() => {
  //   window.addEventListener('scroll', (e) => {})

  //   router.events.on('routeChangeComplete', (e) => {
  //     const hasScrollHistory = sessionStorage.getItem(
  //       `__next_scroll_${window.history.state.key}`
  //     )
  //     if (hasScrollHistory) {
  //       if (JSON.parse(hasScrollHistory)['y']) {
  //         window.scrollTo({
  //           top: JSON.parse(hasScrollHistory)['y'],
  //           left: 0,
  //           behavior: 'instant',
  //         })
  //       }
  //     }
  //   })
  //   return () => {
  //     window.removeEventListener('scroll', (e) => {})
  //     router.events.off('routeChangeComplete', (url) => {})
  //   }
  // }, [router])

  return <>{data && navList && <DocumentPageContent {...props} />}</>
}
DocumentPage.Layout = DocumentLayout

export default DocumentPage
export async function getStaticPaths() {
  try {
    if (process.env.NEXT_PUBLIC_SKIP_RENDER_SIDE === 'true') {
      return {
        paths: [],
        fallback: 'blocking',
      }
    }
    const navList = await DocumentApis.getNavbar()
      .then((res) => res)
      .catch((err) => DOCS_NAVS)

    let newPathList: any[] = []
    const renderParams = (parent: any) => {
      if (parent.pages.length === 0) {
        newPathList.push(parent.path)
      } else {
        for (let index = 0; index < parent.pages.length; index++) {
          renderParams(parent.pages[index])
        }
      }
    }
    renderParams(navList)
    let paths = newPathList.map((item) => {
      return {
        params: { slug: item.split('/') },
      }
    })
    return {
      paths: paths,
      fallback: 'blocking',
    }
  } catch (error) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }
}

const findPathItem = (
  list: NavPage,
  path: string,
  prevPage?: NavPage,
  nextPage?: NavPage
):
  | {
      prev?: NavPage
      main?: NavPage
      next?: NavPage
    }
  | undefined => {
  for (let index = 0; index < list.pages.length; index++) {
    const element = list.pages[index]
    if (element.path === path) {
      return {
        prev: list.pages[index - 1] ? list.pages[index - 1] : list,
        main: element,
        next:
          list.pages[index].pages && list.pages[index].pages.length > 0
            ? list.pages[index].pages[0]
            : list.pages[index + 1]
            ? list.pages[index + 1]
            : nextPage,
      }
    } else {
      const value = findPathItem(
        element,
        path,
        list.pages[index - 1] ? list.pages[index - 1] : list,
        list.pages[index + 1] ? list.pages[index + 1] : nextPage
      )
      if (value) return value
    }
  }
}

const getCurrentPageByName = (navList: Navs, path: string) => {
  let itemFound: {
    prev?: NavPage
    main?: NavPage
    next?: NavPage
  } = {
    main: undefined,
    next: undefined,
    prev: undefined,
  }
  if (path) {
    for (let index = 0; index < navList.pages.length; index++) {
      const element = navList.pages[index]
      if (element.path === path) {
        itemFound = {
          prev: navList.pages[index - 1] ? navList.pages[index - 1] : undefined,
          main: element,
          next:
            navList.pages[index].pages && navList.pages[index].pages.length > 0
              ? navList.pages[index].pages[0]
              : navList.pages[index + 1]
              ? navList.pages[index + 1]
              : undefined,
        }
        break
      } else {
        const value = findPathItem(
          element,
          path,
          navList.pages[index - 1] ? navList.pages[index - 1] : undefined,
          navList.pages[index + 1] ? navList.pages[index + 1] : undefined
        )
        if (value?.main) {
          itemFound = value
          break
        }
      }
    }
  }
  return itemFound
}
const getFiles = async () => {
  const files = await DocumentApis.getFiles()
  return files
}
//
// STATIC PROPS
//
export const getDescriptionDependOnPageContent = (pageContent: any) => {
  return pageContent.description
    ? pageContent.description
    : pageContent.document.nodes.find((item: any) => item.type === 'paragraph')
        .nodes[0].leaves[0].text
}
const getDescription = (slug: string[]) => {
  if (!slug) return HEAD_DOS_SEO.description
  switch ((slug as string[]).join('/')) {
    case 'quick-start': {
      return `This document will guide you through the quick start process to help you get started with our W3IPFS service. Let's dive in!`
    }
    case 'concepts/decentralized-storage': {
      return 'Cloud storage has become indispensable in our digital lives, but traditional centralized solutions have raised concerns about data ownership, privacy, security, and scalability. Entrusting data to centralized providers brings the risk of data breaches and unauthorized access, and users often lack control over their own data...'
    }
    case 'concepts/ipfs-protocol': {
      return 'The IPFS (InterPlanetary File System) protocol is transforming data storage and retrieval through its decentralized and innovative approach. Instead of traditional location addressing, IPFS utilizes content addressing, enabling data to be identified and accessed based on its content'
    }
    case 'aioz-w3ipfs-infrastructure': {
      return 'AIOZ W3IPFS.STORAGE is the top layer of the AIOZ Network dCDN (decentralized Content Delivery Network), developing its robust architecture and infrastructure to provide a powerful IPFS Web3 storage solution'
    }
    case 'tutorials/store-and-mint-nfts-using-erc-1155-metadata-standards': {
      return 'This document will guide you through the process of using our service to store and mint NFTs using the ERC-1155 metadata standards. With our service, you can easily upload and store your NFT assets, generate ERC-1155 compliant metadata, and store the metadata on IPFS. '
    }
    case 'tutorials/store-and-mint-nfts-using-custom-metadata': {
      return 'The AIOZ W3IPFS.STORAGE pinning service is a service that allows users to store and mint NFTs using custom metadata. It leverages the power of the InterPlanetary File System (IPFS) for decentralized and resilient storage of NFT assets and metadata.'
    }
    case 'tutorials/getting-upload-status': {
      return 'When using the AIOZ W3IPFS.STORAGE pinning service for uploading and storing data, you can check the status of your upload using the following methods'
    }
    case 'tutorials/retrieve-nft-data-from-ipfs': {
      return `Learn to find and manage your NFT's IPFS address. Explore w3ipfs.storage gateways and running IPFS on your computer. Safeguard your NFT data for long-term control and accessibility. Master the art of IPFS for NFTs.`
    }
    case 'w3ipfs-api/users': {
      return 'Discover how to effortlessly retrieve and edit user information in AIOZ W3IPFS.STORAGE. This page provides step-by-step instructions and insights on accessing and updating user data securely using AIOZ W3IPFS.STORAGE. Enhance user experiences and data management with our intuitive platform.'
    }
    case 'w3ipfs-api/apikeys': {
      return `In this step-by-step guide, you'll gain insights into creating a w3ipfs.storage API key, enabling programmatic interaction with the service using either the JavaScript client library or command-line tools.`
    }
    case 'w3ipfs-api/pinning': {
      return 'This document will provide a step-by-step guide on how to upload a file to AIOZ W3IPFS.STORAGE for pinning to IPFS.'
    }
    case 'w3ipfs-api/nft': {
      return `Discover the process of creating a AIOZ W3IPFS.STORAGE NFT pinning configuration in this easy-to-follow guide, allowing seamless interaction with the service through JavaScript client libraries or command-line tools`
    }
    case 'w3ipfs-api/gateways': {
      return `The AIOZ W3IPFS.STORAGE API offers access to a variety of gateways, including both public and dedicated options, providing convenient pathways to access content across the IPFS network.`
    }
    case 'w3ipfs-api/pinning-services-api': {
      return `The Pinning Services API is a standardized specification for developers who want to build applications on top of IPFS. It allows seamless integration with a pinning service without requiring knowledge of the service's unique API.`
    }
    case 'w3ipfs-api/billing': {
      return `This page guides you in using the API to retrieve billing information, empowering you to manage your finances effectively. Explore key features for insights into your account's financial activity, making informed decisions and streamlining your billing processes with ease.`
    }

    case 'gateway/understanding-gateways-and-their-importance-in-ipfs': {
      return 'This article aims to explain the purpose of gateways, why they are needed, and how they facilitate the retrieval of content from IPFS.'
    }
    case 'gateway/the-w3ipfs-public-gateway': {
      return 'This documentation provides an overview of the W3IPFS.STORAGE public gateway, a publicly accessible node that serves content pinned on the IPFS'
    }
    case 'gateway/dedicated-gateways': {
      return 'This documentation provides a guide to dedicated gateways for the W3IPFS pinning service. Dedicated gateways offer faster speeds and increased rate limits for retrieving content stored on the IPFS'
    }
    case 'sdk': {
      return 'The official AIOZ W3IPFS.STORAGE API Node.js SDK. This is the easiest way to start developing with AIOZ W3IPFS.STORAGE.'
    }
    case 'nfts': {
      return 'Welcome to the NFTs page, where you can create and manage your non-fungible tokens (NFTs). NFTs represent unique assets that can be owned, bought, and sold on the blockchain. This documentation will guide you through the process of creating NFTs using our platform.'
    }
    case 'payment': {
      return `This comprehensive document outlines the payment details and terms of service for AIOZ W3IPFS.STORAGE`
    }
    case 'limit': {
      return `This page provides comprehensive information about rate limits on the AIOZ W3IPFS.STORAGE platform's API and guidelines for using public and dedicated gateways`
    }
    case 'faq': {
      return 'Our aim is to provide you with a delightful experience. Here are some frequently asked questions to help you better understand AIOZ W3IPFS.STORAGE Pinning Service'
    }
    default: {
      return HEAD_DOS_SEO.description
    }
  }
}
export const getStaticProps: GetStaticProps = async (context) => {
  try {
    if (process.env.NEXT_PUBLIC_SKIP_RENDER_SIDE == 'true') {
      return {
        props: {},
      }
    }
    const navList = await DocumentApis.getNavbar()
      .then((res) => res)
      .catch((err) => DOCS_NAVS)

    let itemFound = null
    if (navList) {
      const path = context.params?.slug
        ? (context.params.slug as string[]).join('/')
        : null
      if (path) {
        itemFound = getCurrentPageByName(navList, path)
      }
    }

    const pathItem = itemFound?.main ? itemFound.main : null
    const next = itemFound?.next ? itemFound.next : null
    const prev = itemFound?.prev ? itemFound.prev : null

    console.log({ pathItem })

    const pageData = PAGE_DATA.find(
      (item) => item.pageProps.data.id === pathItem?.id
    )!

    return {
      props: {
        ...pageData.pageProps,
      },
    }

    // let pageContent: any = null
    // if (pathItem) {
    //   pageContent = await DocumentApis.getPageContent(pathItem?.id)
    //   console.log(
    //     pathItem?.id,
    //     pageContent.path,
    //     ` ${(
    //       Buffer.byteLength(JSON.stringify(pageContent).toString(), 'utf8') /
    //       1024
    //     ).toFixed(2)} kB `
    //   )
    // }

    // let pageRefs = findAllRef(pageContent) || []

    // let pageRefsMapping = {}
    // for (let index = 0; index < navList.pages.length; index++) {
    //   mappingPageRef(pageRefsMapping, pageRefs, navList.pages[index])
    // }
    // const files = await getFiles()
    // let resFiles = null
    // try {
    //   let documentNodeImages = findAllFilesBlock(
    //     [],
    //     'image',
    //     pageContent.document.nodes
    //   )
    //   const filesMapping = getFilesMapping('image', documentNodeImages, files)
    //   resFiles = !isEmpty(filesMapping) ? filesMapping : null
    // } catch (error) {}

    // return {
    //   props: {
    //     description: getDescription(context?.params?.slug as string[]),
    //     files: resFiles,
    //     data: pageContent,
    //     navList: navList ? navList : null,
    //     prev: prev,
    //     next: next,
    //     pageRefsMapping: pageRefsMapping,
    //   },
    // }
  } catch (error) {
    console.log(error)
    // revalidate is to keep the previously generated page if an error is thrown.
    throw error
  }
}
type RawPageRef = {
  page: string
  anchor?: string
  kind: 'anchor' | 'url' | 'page'
}
const getRef = (
  node: DocumentNode
): (null | RawPageRef)[] | RawPageRef | null => {
  if (node.data?.ref?.kind === 'anchor' || node.data?.ref?.kind === 'page') {
    return { ...node.data?.ref }
  } else {
    if (node.nodes && node.nodes.length > 0) {
      return [
        ...node.nodes
          .map((element) => {
            return getRef(element)
          })
          .flat(),
      ]
    } else return null
  }
}
const findAllRef = (pageContent: DocumentContent): any => {
  return (
    getRef(
      pageContent.document as unknown as DocumentNode
    ) as (null | RawPageRef)[]
  )
    .flat()
    .filter((item) => item !== null)
}
const mappingPageRef = (
  pageRefsMapping: any,
  pageRefs: any[],
  navListPage: NavPage
) => {
  const indexFounded = pageRefs.findIndex(
    (item, index) => item.page === navListPage.id
  )
  if (indexFounded >= 0) {
    const anchor = pageRefs[indexFounded].anchor
      ? pageRefs[indexFounded].anchor
      : ''
    pageRefsMapping[`${pageRefs[indexFounded].page}`] = {
      path: navListPage.path,
    }
    pageRefs[indexFounded].path = navListPage.path
    return
  } else {
    if (navListPage.pages && navListPage.pages.length >= 0) {
      navListPage.pages.forEach((element) => {
        mappingPageRef(pageRefsMapping, pageRefs, element)
      })
    } else {
      return
    }
  }
}
const getFilesMapping = (
  type: 'image' | 'video',
  nodes: DocumentNode[],
  files: DocumentFilesResponse
): { [key: string]: DocumentFilesResponse['items'] } => {
  let object = {}
  nodes.forEach((element) => {
    object = {
      ...object,
      [element.nodes[0].data.ref.file]:
        files.items.find(
          (item) => item.id === element.nodes[0].data.ref.file
        ) || null,
    }
  })
  return object
}
const findAllFilesBlock = (
  prevArr: DocumentNode[],
  type: 'image' | 'video',
  nodes: DocumentNode
) => {
  let arr = []
  for (let index = 0; index < nodes.length; index++) {
    const element = nodes[index]

    if (element.type === 'images') {
      arr.push(element)
    }
  }
  return [...prevArr, ...arr]
}
