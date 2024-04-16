import axios from 'axios'

export const GitBookAPIs = {
  search: (query: string) => {
    return axios
      .get(
        `https://api.gitbook.com/v1/spaces/${process.env.DOCUMENT_SPACE}/content/search`,
        {
          params: {
            query,
          },
          headers: {
            Authorization: process.env.GITBOOK_TOKEN,
          },
        }
      )
      .then((res) => {
        return res.data
      })
  },
}
