import { colorTheme } from '@/themes/_color'

export const FAQ_CONTENTS = [
  {
    color: colorTheme.general.dotMint[500],
    title: 'What does it mean to pin content on IPFS?',
    content: `In IPFS, nodes frequently cache content that gets routed through them. This means that popular content frequently lives on many places of the network at once.
    However, eventually, the node cache becomes full, and then garbage collection happens. This means that the node empties its cache to make room for more content.`,

    arrColor: colorTheme.general.dotMint,
  },
  {
    color: colorTheme.general.dotOrange[500],
    title: 'Why should I choose W3IPFS to pin my content?',
    content: `Pinning your content with W3IPFS offers you peace of mind, knowing that your valuable content will always be online. Our service eliminates the need for you to manage and monitor your own IPFS nodes, as we take care of that for you. Additionally, W3IPFS provides user-friendly tools that offer valuable insights into the content you pin on IPFS.`,

    arrColor: colorTheme.general.dotOrange,
  },
  {
    color: colorTheme.general.dotBlue[500],
    title: 'What is the pricing model of W3IPFS?',
    content: `To explore the pricing details for w3ipfs Pinning Service, please refer to our dedicated pricing page.`,
    arrColor: colorTheme.general.dotBlue,
  },
  {
    color: colorTheme.general.dotYellow[500],
    title: 'We value your feedback!',
    content: `We are committed to making W3IPFS Pinning Service the best product available, and your feedback is invaluable in achieving that goal. If you have any suggestions, complaints, or questions regarding our documentation or services, please don't hesitate to reach out to us via email at support@aioz.io We are here to listen and assist you in every way we can.
    Thank you for choosing W3IPFS Pinning Service, where we strive to make your content storage experience as delightful as can be!`,

    arrColor: colorTheme.general.dotYellow,
  },
]
