import { colorTheme } from '@/themes/_color'
import { Icons } from '@/themes/_icons'
import { ImagesHomePage } from '@/themes/_images'
export const CARD_HEIGHT = 88
export const CARD_WIDTH = 327
export const CAP = 40
export const WHY_ARR = [
  {
    size: 0,
    title: 'IPFS File Storage',
    color: colorTheme.general.dotMint[500],
    desciption: `Seamlessly store and retrieve data within the decentralized InterPlanetary File System (IPFS). Experience the benefits of distributed storage, immutability, and data availability, ensuring the integrity and security of your files.`,
    titleIcon: Icons.TitleVideoOptimization,
    bottom: {
      isFull: false,
      left: false,
      right: true,
    },
    topLines: null,
    bottomLines: {
      left: null,
      right: {
        percent: 50,
      },
    },
    imageUrl: ImagesHomePage.WhyOption1,
    animation: {
      animate: {
        rotate: [0, -90, 0, 90, 0],
      },
      transition: {
        duration: 6,
        times: [0, 0.4, 0.6, 0.8, 1],
        repeat: Infinity,
      },
    },
  },
  {
    size: 0,
    title: 'Data Replication and Encryption by AIOZ Network',
    color: colorTheme.general.dotCoban[500],
    desciption: `Ensure the security and durability of your stored data with AIOZ Network's advanced replication and encryption mechanisms. Your files are replicated across multiple nodes in diverse locations, providing redundancy and safeguarding your data from unauthorized access`,
    titleIcon: Icons.TitleShortLink,
    bottom: null,
    topLines: {
      right: {
        percent: 30,
      },
    },
    bottomLines: null,
    imageUrl: ImagesHomePage.WhyOption2,
    animation: {
      animate: {
        rotate: [0, -360],
        scale: [1, 0.8, 1, 1.2, 1],
      },
      transition: {
        duration: 6,
        times: [0, 0.4, 0.6, 0.8, 1],
        repeat: Infinity,
      },
    },
  },
  {
    size: 2,
  },
  {
    size: 1,
  },
  {
    size: 0,
    title: 'Built-in CDN',
    color: colorTheme.general.dotPink[500],
    desciption: `Amplify the performance of your content delivery with our built-in Content Delivery Network (CDN). Enjoy fast and efficient distribution of your files across the globe, reducing latency and ensuring seamless experiences for your users.`,
    titleIcon: Icons.TitleBuildInCdn,
    bottom: {
      isFull: true,
    },
    topLines: null,
    bottomLines: {
      left: {
        percent: 70,
      },
      right: {
        percent: 30,
      },
    },
    imageUrl: ImagesHomePage.WhyOption2,
    animation: {
      animate: {
        rotate: [0, -360],
        scale: [1, 0.8, 1, 1.2, 1],
      },
      transition: {
        duration: 6,
        times: [0, 0.4, 0.6, 0.8, 1],
        repeat: Infinity,
      },
    },
  },
  {
    size: 0,
    title: 'Developer Friendly Integration',
    color: colorTheme.general.dotYellow[500],
    desciption: `Accelerate your development process with our developer-friendly integration options. Leverage our well-documented SDKs, APIs, and tools to seamlessly integrate
    W3IPFS.STORAGE into your applications, regardless of your expertise level.`,
    titleIcon: Icons.TitleUnlockableContent,
    bottom: null,
    topLines: {
      left: {
        percent: 10,
      },
      right: {
        percent: 30,
      },
    },
    imageUrl: ImagesHomePage.WhyOption3,
    animation: {
      animate: {
        rotate: -360,
      },
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  },
  {
    size: 0,
    title: 'Dedicated Gateways',
    color: colorTheme.general.dotBlue[500],
    desciption: `Access your IPFS-stored data effortlessly through our dedicated gateways. Benefit from reliable and speedy access to your content, with optimized routes and low-latency connections, enhancing the overall user experience.`,
    titleIcon: Icons.TitleDedicatedGateway,
    bottom: {
      isFull: true,
    },
    topLines: null,
    bottomLines: {
      left: {
        percent: 70,
      },
      right: {
        percent: 70,
      },
    },
    imageUrl: ImagesHomePage.WhyOption4,
    animation: {
      animate: {
        rotate: [0, -180, 0],
        scale: [1, 0.5, 1],
      },
      transition: {
        duration: 4,
        times: [0, 0.8, 1],
        repeat: Infinity,
      },
    },
  },
  {
    size: 0,
    title: 'NFT Focused Solution',
    color: colorTheme.general.dotMint[500],
    desciption: `Simplify the storage and management of Non-Fungible Tokens (NFTs) with our comprehensive NFT-focused tools. From minting to pinning and managing, we provide a one-stop-shop solution for all your NFT storage needs.`,
    titleIcon: Icons.TitleFastAndSecure,
    bottom: null,
    topLines: {
      left: {
        percent: 70,
      },
      right: {
        percent: 30,
      },
    },
    bottomLines: null,
    imageUrl: ImagesHomePage.WhyOption5,
    animation: {
      animate: {
        rotate: [0, 180, 360],
      },
      transition: {
        duration: 2,
        ease: 'easeInOut',
        times: [0, 0.9, 1],
        repeat: Infinity,
      },
    },
  },
  {
    size: 2,
  },
  {
    size: 1,
  },
  {
    size: 0,
    title: 'IPFS Pinning Service',
    color: colorTheme.general.dotYellow[500],
    desciption: `Amplify the performance of your content delivery with our built-in Content Delivery Network (CDN). Enjoy fast and efficient distribution of your files across the globe, reducing latency and ensuring seamless experiences for your users.`,
    titleIcon: Icons.TitleImageOptimization,
    bottom: {
      isFull: false,
      left: true,
    },
    topLines: null,
    bottomLines: {
      left: {
        exists: true,
        percent: 70,
      },
    },
    imageUrl: ImagesHomePage.WhyOption6,
    animation: {
      animate: {
        rotate: [0, -180, -180, 0],
      },
      transition: {
        duration: 3,
        times: [0, 0.5, 0.7, 1],
        repeat: Infinity,
        repeatDelay: 1,
      },
    },
  },
  {
    size: 0,
    title: `Smart Routing and Caching`,
    color: colorTheme.general.dotPink[500],
    desciption: `Deliver files from the nearest available nodes, reducing latency and ensuring fast retrieval for your users. Smart caching mechanism minimizes data transfer costs, leading to significant savings for your business.`,
    titleIcon: Icons.TitleRichPreview,
    topLines: {
      left: {
        exists: true,
        percent: 70,
      },
    },

    mainIcon: Icons.WhyRichPreview,
  },
]
