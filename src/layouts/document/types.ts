export type NavBarItemType = {
  index: number
  type: 'parent' | 'child'
  slug: string
  level: number
  text: string
  icon: any
  childs: NavBarItemType[]
  path: string
  hasFollowNav?: boolean
  color?: string
  objColor?: any
  followNavBaseHref?: string
}
