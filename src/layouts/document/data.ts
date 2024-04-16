import { Icons } from '@/themes/_icons'
import { toKebabCase } from '@/utils/tools'
import { NavBarItemType } from './types'

export const DOCUMENT_NAVBAR_LIST: NavBarItemType[] = [
  {
    type: 'parent',
    level: 0,
    text: 'Welcome to W3IPFS.STORAGE Docs',
    icon: Icons.Home,
    childs: [
      {
        type: 'child',
        level: 1,
        text: 'What can I learn here?',
        icon: Icons.Book,
        childs: null,
      },
      {
        type: 'child',
        level: 1,
        text: 'Welcome to AIOZ IPFS Docs?',
        icon: Icons.Book,
        childs: [
          {
            type: 'child',
            level: 2,
            text: 'What can I learn here?',
            icon: Icons.Book,
            childs: null,
          },
          {
            type: 'child',
            level: 2,
            text: 'What can I learn here?',
            icon: Icons.Book,
            childs: null,
          },
        ],
      },
      {
        type: 'child',
        level: 1,
        text: 'What can I learn here?',
        icon: Icons.Book,
        childs: null,
      },
    ],
  },
  {
    type: 'parent',
    level: 0,
    text: 'What can I learn here?',
    icon: Icons.Book,
    childs: null,
  },
  {
    type: 'parent',
    level: 0,
    text: 'Getting Started',
    icon: Icons.Subtract,
    childs: [
      {
        type: 'child',
        level: 1,
        text: 'What can I learn here?',
        icon: Icons.Book,
        childs: null,
      },
      {
        type: 'child',
        level: 1,
        text: 'What can I learn here?',
        icon: Icons.Book,
        childs: null,
      },
    ],
  },
  {
    type: 'parent',
    level: 0,
    text: 'FAQ',
    icon: Icons.ClipboardList,
    childs: [
      {
        type: 'child',
        level: 1,
        text: 'What can I learn here?',
        icon: Icons.Book,
        childs: null,
      },
      {
        type: 'child',
        level: 1,
        text: 'What can I learn here?',
        icon: Icons.Book,
        childs: null,
      },
      {
        type: 'child',
        level: 1,
        text: 'What can I learn here?',
        icon: Icons.Book,
        childs: null,
      },
    ],
  },
  {
    type: 'parent',
    level: 0,
    text: 'AIOZ IPFS API',
    icon: Icons.Lock,
    childs: null,
  },
  {
    type: 'parent',
    level: 0,
    text: 'Gateways',
    icon: Icons.LinkAlt,
    childs: null,
  },
  {
    type: 'parent',
    level: 0,
    text: 'NFTs',
    icon: Icons.Image,
    childs: null,
  },
  {
    type: 'parent',
    level: 0,
    text: 'Limits',
    icon: Icons.Database,
    childs: null,
  },
]
