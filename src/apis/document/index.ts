import { Navs } from '@/modules/document/types'
import axios from 'axios'

export const DocumentApis = {
  getFiles: () => {
    return axios
      .get(
        `https://api.gitbook.com/v1/spaces/${process.env.DOCUMENT_SPACE}/content/files?limit=100`,
        {
          headers: {
            Authorization: process.env.GITBOOK_TOKEN,
          },
        }
      )
      .then((res) => {
        return res.data
      })
  },
  getNavbar: () => {
    return axios
      .get<Navs>(
        `https://api.gitbook.com/v1/spaces/${process.env.DOCUMENT_SPACE}/content`,
        {
          headers: {
            Authorization: process.env.GITBOOK_TOKEN,
          },
        }
      )
      .then((res) => {
        return res.data
      })
  },
  getPageContent: (pageId: string) => {
    return axios
      .get(
        `https://api.gitbook.com/v1/spaces/${process.env.DOCUMENT_SPACE}/content/page/${pageId}`,
        {
          headers: {
            Authorization: process.env.GITBOOK_TOKEN,
          },
        }
      )
      .then((res) => {
        return res.data
      })
      .catch((err) => null)
  },
}
