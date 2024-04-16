interface RootObject {
  items: Item[]
  next: Next
}

interface Next {
  page: string
}

interface Item {
  id: string
  title: string
  path: string
  sections: any[]
  urls: Urls
}

interface Urls {
  app: string
}
