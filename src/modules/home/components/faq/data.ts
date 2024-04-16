import { colorTheme } from '@/themes/_color'

export const FAQ_CONTENTS = [
  {
    color: colorTheme.general.dotMint[500],
    title: 'What does it mean to pin content on IPFS?',
    content: `In IPFS, nodes frequently cache content that gets routed through them. This means that popular content frequently lives on many places of the network at once.
However, eventually, the node cache becomes full, and then garbage collection happens. This means that the node empties its cache to make room for more content.
When this happens, all content that isn't "pinned" gets deleted.
When a node "pins" a piece of content, it ensures that the content will always be available, as long as the node is connected to the IPFS network.`,

    arrColor: colorTheme.general.dotMint,
  },
  {
    color: colorTheme.general.dotOrange[500],
    title: 'So why should I pin my content with W3IPFS.STORAGE?',
    content: `We get it, building distributed software is hard. Each thing you don't have to worry about saves valuable engineering time and money.
    When you pin your content to IPFS with Pinata, you get the peace of mind in knowing that your content will always be online.
    Our customers don't have to worry about maintaining and monitoring their own IPFS nodes. We do it for them.
    In addition to keeping your content online, we also provide a variety of easy tools to give you better insight into the content you're pinning on IPFS.`,

    arrColor: colorTheme.general.dotOrange,
  },
  {
    color: colorTheme.general.dotBlue[500],
    title: 'Is the content I store on W3IPFS.STORAGE private?',
    content: `While Pinata doesn't share what's stored on our system with anybody, IPFS itself is a public network.
    This means that any content added to the public IPFS network is discoverable by anybody using the network.`,
    arrColor: colorTheme.general.dotBlue,
  },
  {
    color: colorTheme.general.dotYellow[500],
    title: 'We want your feedback!',
    content: `While Pinata doesn't share what's stored on our system with anybody, IPFS itself is a public network.
    This means that any content added to the public IPFS network is discoverable by anybody using the network.`,

    arrColor: colorTheme.general.dotYellow,
  },
]
