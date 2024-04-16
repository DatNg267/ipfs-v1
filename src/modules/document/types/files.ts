export type DocumentFilesResponse = {
  items: [
    {
      id: string
      name: string
      downloadURL: string
      contentType: string
    }
  ]
}

export type DocumentFiles = {
  [key: string]: DocumentFilesResponse['items'][0]
}
