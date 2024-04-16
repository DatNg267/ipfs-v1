import { scaleDark, scaleGeneral, scaleLight } from './scale-color'
import { opacify } from './utils'

export const colorTheme = {
  light: scaleLight,
  dark: scaleDark,
  general: scaleGeneral,
  document: {
    varibleBackground: 'rgba(110,118,129,0.4)',
  },
}
// export const ColorMode = {
//   light: {
//     primary: {
//       light: colorTheme.light.primary[10],
//       main: colorTheme.light.primary[50],
//       dark: colorTheme.light.primary[90],
//     },
//     secondary: {
//       light: colorTheme.light.secondary[10],
//       main: colorTheme.light.secondary[50],
//       dark: colorTheme.light.secondary[90],
//     },
//     text: {
//       secondary: colorTheme.light.baseGray[50],
//       primary: colorTheme.light.baseGray[100],
//       contrastText: colorTheme.light.baseGray[5],
//     },
//     baseGray: colorTheme.light.baseGray,
//     opacityGray: colorTheme.light.opacityGray,

//     success: {
//       light: '#00AB5A',
//       main: '#00AB5A',
//       dark: '#00AB5A',
//     },
//     dotPurple: colorTheme.general.dotPurple,
//     dotBlue: colorTheme.general.dotBlue,
//     dotCoban: colorTheme.general.dotCoban,
//     dotMint: colorTheme.general.dotMint,
//     dotOrange: colorTheme.general.dotOrange,
//     dotPink: colorTheme.general.dotPink,
//     dotYellow: colorTheme.general.dotYellow,
//     border: {
//       light: colorTheme.light.baseGray[30],
//       main: colorTheme.light.baseGray[60],
//       dark: colorTheme.light.baseGray[100],
//     },
//     background: {
//       light: colorTheme.light.primary[10],
//       main: colorTheme.light.primary[50],
//       dark: colorTheme.light.primary[90],
//     },
//     boxShadow: {
//       light: '2px 2px 4px rgba(0,0,0,0.1)',
//       main: '0px 2px 8px rgba(0, 0, 0, 0.06), 0px 8px 24px -4px rgba(0, 0, 0, 0.1)',
//       dark: '2px 2px 4px rgba(0,0,0,0.25)',
//     },
//   },
// }
