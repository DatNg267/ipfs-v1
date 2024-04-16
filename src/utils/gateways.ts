const PUBLIC_GATEWAYS = process.env.NEXT_PUBLIC_AIOZ_PUBLIC_IPFS_GATEWAY
export const getPublicGatewayHrefByHash = (hash: string) =>
  `${PUBLIC_GATEWAYS}${hash}`

export const getShareTwitterHref = (text: string, url: string) =>
  `https://twitter.com/intent/tweet/?text=${text}&url=${'https://gateway.w3ipfs.storage/ipfs/bafkreiezxxq2xgd4a7mbc4l3qex2vmxxhov277ea2ic3mympygr2huzcw4'}`

export const getShareTelegramHref = (text: string, url: string) =>
  `https://t.me/share/?text=${text}&url=${'https://gateway.w3ipfs.storage/ipfs/bafkreiezxxq2xgd4a7mbc4l3qex2vmxxhov277ea2ic3mympygr2huzcw4'}`
