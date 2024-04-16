import { DocumentApis } from '@/apis/document'
import { AppRouter } from '@/constants'
import { DOCS_NAVS } from '@/data/docs/_index'
import * as crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

const WEBHOOK_SECRET: string = process.env.WEBHOOK_SECRET

const verify_signature = (req: NextRequest) => {
  const signature = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(JSON.stringify(req.body))
    .digest('hex')
  let trusted = Buffer.from(`sha256=${signature}`, 'hex')
  let untrusted = Buffer.from(req.headers['x-hub-signature-256'], 'hex')
  return crypto.timingSafeEqual(trusted, untrusted)
}

export default async function handler(req: NextRequest, res: NextResponse) {
  if (!verify_signature(req)) {
    return res.status(401).send('Unauthorized')
  }

  try {
    // V0.1.3

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
    newPathList = newPathList.map((item) => `${AppRouter.DOCUMENT}/${item}`)
    try {
      newPathList.forEach((slug, index) => {
        console.log(
          'start ' + slug + ' ' + (index + 1) + '/' + newPathList.length
        )
        res
          .revalidate(slug)
          .then((res) => {
            console.log(
              'succces ' + slug + ' ' + (index + 1) + '/' + newPathList.length
            )
          })
          .catch((err) => {
            console.log(err + ' --- ' + slug + '--- ' + (index + 1))
          })
      })

      return res.json({ revalidated: true })
    } catch (err) {
      return res.status(500).send((err as Error).message)
    }

    // const type = req.query.type
    // if (type === 'all') {
    //   const navList = NavList
    //   let newPathList: any[] = []
    //   const renderParams = (parent: any) => {
    //     if (parent.pages.length === 0) {
    //       newPathList.push(parent.path)
    //     } else {
    //       for (let index = 0; index < parent.pages.length; index++) {
    //         renderParams(parent.pages[index])
    //       }
    //     }
    //   }
    //   renderParams(navList)
    //   newPathList = newPathList.map((item) => `${AppRouter.DOCUMENT}/${item}`)
    //   try {
    //     for (const slug of newPathList) {
    //       res.revalidate(slug)
    //     }
    //     return res.json({ revalidated: true })
    //   } catch (err) {
    //     return res.status(500).send((err as Error).message)
    //   }
    // } else {
    //   try {
    //     const isObject = req.query.paths.indexOf(',')
    //     let paths = null
    //     if (isObject >= 0) {
    //       paths = req.query.paths.split(',')
    //       for (const slug of paths) {
    //         res.revalidate(`${AppRouter.DOCUMENT}/${req.query.path}`)
    //       }
    //       return res.json({ revalidated: true })
    //     } else {
    //       paths = req.query.paths
    //       res.revalidate(`${AppRouter.DOCUMENT}/${paths}`)
    //       return res.json({ revalidated: true })
    //     }
    //   } catch (err) {
    //     return res.status(500).send((err as Error).message)
    //   }
    // }
  } catch (error) {
    return res.status(500).send((error as Error).message)
  }
}
// curl localhost:7007/api/revalidate?secret=aiozw3ipfsstorage30
// curl localhost:7777/api/revalidate?secret=aiozw3ipfsstorage30
// curl https://api/revalidate?secret=aiozw3ipfsstorage30&path=/document/sdk
// curl https://ipfs.attoaioz.cyou/api/revalidate?secret=aiozw3ipfsstorage30&path=document/sdk

// curl -G localhost:7777/api/revalidate -d "secret=aiozw3ipfsstorage30" -d "paths=sdk" -d "type=all"
// curl -G localhost:7777/api/revalidate -d "secret=aiozw3ipfsstorage30" -d "paths=sdk"
// curl -G localhost:7777/api/revalidate -d "secret=aiozw3ipfsstorage30" -d "paths=sdk,faq"

// curl -G https://ipfs.attoaioz.cyou/api/revalidate -d "secret=aiozw3ipfsstorage30" -d "paths=sdk" -d "type=all"
// curl -G https://ipfs.attoaioz.cyou/api/revalidate -d "secret=aiozw3ipfsstorage30" -d "paths=sdk"
// curl -G https://ipfs.attoaioz.cyou/api/revalidate -d "secret=aiozw3ipfsstorage30" -d "paths=sdk,faq"
