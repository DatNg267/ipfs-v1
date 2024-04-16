export type Navs = {
  object: string
  id: string
  parents: string[]
  pages: NavPage[]
  files: any[]
  urls: NavUrls
  git: NavGit
}

export type NavPage = {
  id: string
  title: string
  kind: string
  type: string
  description: string
  path: string
  slug: string
  pages: NavPage[]
}

export type NavGit = {
  oid: string
  message: string
  createdByGitBook: boolean
  url: string
}

export type NavUrls = {
  app: string
  published: string
  public: string
}
