export const GLOBAL_IPFS_GATEWAYS = 'https://ipfs.io/ipfs/'
export const PUBLIC_GATEWAY = process.env.NEXT_PUBLIC_AIOZ_PUBLIC_IPFS_GATEWAY
export const DEDICATE_GATEWAY =
  process.env.NEXT_PUBLIC_AIOZ_DEDICATED_IPFS_GATEWAY

export const GATEWAYS = {
  data: {
    totals: 2,
    gateways: [
      {
        name: 'AIOZ Gateway #1',
        host: `${DEDICATE_GATEWAY}`,
        type: 'Dedicated',
        bandwidth: 100,
        operation: 'OK',
        active: true,
      },
      {
        name: 'AIOZ Gateway #2',
        host: `${PUBLIC_GATEWAY}`,
        type: 'Public',
        bandwidth: 10,
        operation: 'OK',
        active: true,
      },
    ],
  },
  status: 'success',
}
export const EXAMPLE_GATEWAYS = `${PUBLIC_GATEWAY}bafkreieui6mw3lrzwvrp4lecrw6vyenzmqvyteqho274vnchgh5noj4qry`
