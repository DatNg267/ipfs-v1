import { colorTheme } from '@/themes/_color'
import { Icons } from '@/themes/_icons'

export const getDocumentNavbarItemObjColor = (index: number) => {
  switch (index) {
    case 0:
      return colorTheme.general.dotPink
    case 1:
      return colorTheme.general.dotMint
    case 2:
      return colorTheme.general.green
    case 3:
      return colorTheme.general.dotYellow
    case 4:
      return colorTheme.general.dotOrange
    case 5:
      return colorTheme.general.dotPurple
    case 6:
      return colorTheme.general.green
    case 7:
      return colorTheme.general.dotPink
    case 8:
      return colorTheme.general.dotYellow
    case 9:
      return colorTheme.general.blue
    case 10:
      return colorTheme.general.dotOrange
    case 11:
      return colorTheme.general.dotCoban
    default:
      return colorTheme.general.green
  }
}
export const getDocumentNavbarItemColor = (index: number) => {
  switch (index) {
    case 0:
      return colorTheme.general.dotPink[500]
    case 1:
      return colorTheme.general.dotMint[500]
    case 2:
      return colorTheme.general.green[500]
    case 3:
      return colorTheme.general.dotYellow[500]
    case 4:
      return colorTheme.general.dotOrange[500]
    case 5:
      return colorTheme.general.dotPurple[500]
    case 6:
      return colorTheme.general.green[500]
    case 7:
      return colorTheme.general.dotPink[500]
    case 8:
      return colorTheme.general.dotYellow[500]
    case 9:
      return colorTheme.general.blue[500]
    case 10:
      return colorTheme.general.dotOrange[500]
    case 11:
      return colorTheme.general.dotCoban[500]
    default:
      return colorTheme.general.green[500]
  }
}

export const renderIcon = (slug: string) => {
  switch (slug) {
    case 'concept': {
      return Icons.Home
    }
    case 'aioz-w3ipfs-infrastructure': {
      return Icons.Bookmark
    }
    case 'quick-start': {
      return Icons.Favorite
    }
    case 'faq': {
      return Icons.CircleHelp
    }
    case 'limits': {
      return Icons.Database
    }
    case 'sdk': {
      return Icons.Archive
    }
    case 'tutorials': {
      return Icons.ClipboardList
    }
    case 'w3ipfs-api': {
      return Icons.Lock
    }
    case 'gateway': {
      return Icons.LinkAlt
    }
    case 'nfts': {
      return Icons.Image
    }
    case 'payment': {
      return Icons.CreditCard
    }
    case 'limit': {
      return Icons.Database
    }
    default:
      return Icons.Home
  }
}
