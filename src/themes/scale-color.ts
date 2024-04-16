import { opacify } from './utils'
export const scaleDark = {
  opacityGray: {
    0: '#000000',
    50: opacify(80, '#000000'),
    100: opacify(60, '#000000'),
    200: '#fafffb',
    300: '#f9fffa',
    400: '#f1f9f3',
    500: '#d9e0db',
    600: '#f7fff9',
    700: '#b2b8b4',
    800: '#818582',
    900: '#454745',
    1000: '#000000',
  },
  baseGray: {
    0: '#000000',
    50: '#1A1A1A',
    100: '#333333',
    200: '#4D4D4D',
    300: '#666666',
    400: '#808080',
    500: '#999999',
    600: '#B3B3B3',
    700: '#CCCCCC',
    800: '#E5E5E5',
    900: '#F2F2F2',
    1000: '#F2F2F2',
  },
  primary: {
    50: '#33332F',
    100: '#595952',
    200: '#808076',
    300: '#A6A69A ',
    400: '#CCCCBD',
    500: '#FFFFEC',
    600: '#FFFFF0',
    700: '#FFFFF4',
    800: '#FFFFF7',
    900: '#FFFFFB',
    950: '#FFFFFE',
  },
  secondary: {
    50: '#33332F',
    100: '#595952',
    200: '#808076',
    300: '#A6A69A ',
    400: '#CCCCBD',
    500: '#FFFFEC',
    600: '#FFFFF0',
    700: '#FFFFF4',
    800: '#FFFFF7',
    900: '#FFFFFB',
    950: '#FFFFFE',
  },
}

export const scaleLight = {
  opacityGray: {
    0: '#fff',
    50: '#fdfffe',
    100: '#fcfffd',
    200: '#fafffb',
    300: '#f9fffa',
    400: '#f1f9f3',
    500: '#d9e0db',
    600: '#f7fff9',
    700: '#b2b8b4',
    800: '#818582',
    900: '#454745',
    1000: '#000000',
  },
  baseGray: {
    0: '#fff',
    50: '#f2f2f2',
    100: '#e5e5e5',
    200: '#ccc',
    300: '#b3b3b3',
    400: '#999999',
    500: '#808080',
    600: '#666666',
    700: '#4d4d4d',
    800: '#333333',
    900: '#1a1a1a',
    1000: '#000000',
  },
  primary: {
    50: '#fffffE',
    100: '#fffffB',
    200: '#fffff7',
    300: '#fffff4',
    400: '#fffff0',
    500: '#FFFFEC',
    600: '#ccccbd',
    700: '#a6a694',
    800: '#808076',
    900: '#595952',
    950: '#1e3233',
  },
  secondary: {
    50: '#fffffE',
    100: '#fffffB',
    200: '#fffff7',
    300: '#fffff4',
    400: '#fffff0',
    500: '#FFFFEC',
    600: '#f2f2e0',
    700: '#a6a694',
    800: '#808076',
    900: '#595952',
    950: '#1e3233',
  },
}

export const scaleGeneral = {
  dotPink: {
    950: '#2F0F1A',
    900: '#511A2E',
    800: '#752642',
    700: '#983155',
    600: '#BA3C69',
    500: '#e94b83',
    400: '#ed6f9c',
    300: '#f293b5',
    200: '#f6b7cd',
    100: '#fbdbe6',
    50: '#fef6f9',
  },
  dotYellow: {
    50: '#fffff7',
    100: '#feffe0',
    200: '#fdffc2',
    300: '#fdfea3',
    400: '#fcfe85 ',
    500: '#FBFE66',
    600: '#C9CB52',
    700: '#A3A542',
    800: '#7E7F33',
    900: '#585924',
    950: '#323314',
  },
  dotPurple: {
    50: '#fbf7fe',
    100: '#f0dffd',
    200: '#e1c0fa',
    300: '#d1a0f8',
    400: '#c281f5',
    500: '#B361F3',
    600: '#8F4EC2',
    700: '#753F9E',
    800: '#5A317A',
    900: '#3E2255',
    950: '#241331',
  },
  dotBlue: {
    50: '#f7f7fe',
    100: '#e0dffd',
    200: '#c1c0fa',
    300: '#a2a0f8',
    400: '#8381f5',
    500: '#6461F3',
    600: '#504EC2',
    700: '#413F9E',
    800: '#32317A',
    900: '#232255',
    950: '#141331',
  },
  dotCoban: {
    50: '#f8fbff',
    100: '#e4eefe',
    200: '#c9ddfc',
    300: '#adccfb',
    400: '#92bbf9',
    500: '#77AAF8',
    600: '#5F88C6',
    700: '#4D6FA1',
    800: '#2A3B57',
    900: '#2A3B57',
    950: '#182232',
  },
  dotMint: {
    50: '#f6fefd',
    100: '#dbfdf7',
    200: '#b7faee',
    300: '#94f8e6',
    400: '#70f6dd',
    500: '#4CF3D5',
    600: '#3DC2AA',
    700: '#319E8B',
    800: '#267A6B',
    900: '#1B554A',
    950: '#0F312B',
  },
  dotOrange: {
    50: '#fef8f8',
    100: '#fde5e5',
    200: '#fbcbcb',
    300: '#f9b2b2',
    400: '#f79898',
    500: '#F57E7E',
    600: '#C46565',
    700: '#9F5252',
    800: '#7B3F3F',
    900: '#562C2C',
    950: '#311919',
  },
  red: {
    50: '#fff4f4',
    100: '#ffd0d1',
    200: '#ffa0a3',
    300: '#ff6f74',
    400: '#ff4c4c',
    500: '#ff1f1f',
    600: '#cc1a1a',
    700: '#a61415',
    800: '#80110f',
    900: '#590b0c',
    950: '#340606',
  },

  yellow: {
    50: '#fffff5',
    100: '#fffdd9',
    200: '#fefcb3',
    300: '#fffa8b',
    400: '#fff965',
    500: '#FFF740',
    600: '#ccc634',
    700: '#a6a129',
    800: '#807a1f',
    900: '#585616',
    950: '#33310d',
  },

  blue: {
    50: '#f1f9ff',
    100: '#cbe5ff',
    200: '#99ceff',
    300: '#66b5ff',
    400: '#339dff',
    500: '#46A6FF',
    600: '#026acc',
    700: '#0156a5',
    800: '#014280',
    900: '#002e59',
    950: '#001a33',
  },

  green: {
    50: '#f7fff9',
    100: '#dcffe7',
    200: '#bcffcf',
    300: '#9affb6',
    400: '#7aff9e',
    500: '#57FF86',
    600: '#46cc6b',
    700: '#00AB5A',
    800: '#2b8043',
    900: '#1f592f',
    950: '#10331b',
  },
}
