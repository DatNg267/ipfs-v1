import { ColorPartial, PaletteColor } from '@mui/material/styles/createPalette'

export type MyColorPartial = ColorPartial & {
  950?: string | undefined
  1000?: string | undefined
}
declare module '@mui/material/styles' {
  interface Palette {
    opacityGray: MyColorPartial
    baseGray: MyColorPartial

    dotPink: MyColorPartial
    dotYellow: MyColorPartial
    dotPurple: MyColorPartial
    dotBlue: MyColorPartial
    dotCoban: MyColorPartial
    dotMint: MyColorPartial
    dotOrange: MyColorPartial
    dotGreen: MyColorPartial

    red: MyColorPartial
    yellow: MyColorPartial
    green: MyColorPartial
    blue: MyColorPartial
    bgTrans: PaletteColor
    border: PaletteColor
  }
  interface PaletteOptions {
    opacityGray: MyColorPartial
    baseGray: MyColorPartial

    dotPink: MyColorPartial
    dotYellow: MyColorPartial
    dotPurple: MyColorPartial
    dotBlue: MyColorPartial
    dotCoban: MyColorPartial
    dotMint: MyColorPartial
    dotOrange: MyColorPartial
    dotGreen: MyColorPartial

    red: MyColorPartial
    yellow: MyColorPartial
    green: MyColorPartial
    blue: MyColorPartial
    bgTrans: PaletteColor
    border: PaletteColor
  }
  interface TypographyVariants {
    h7: React.CSSProperties
  }
  interface TypographyVariantsOptions {
    h7?: React.CSSProperties
  }
}
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h7: true
  }
}
