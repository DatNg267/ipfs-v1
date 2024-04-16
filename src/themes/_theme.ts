import {
  PaletteMode,
  alertClasses,
  menuClasses,
  outlinedInputClasses,
  selectClasses,
  svgIconClasses,
} from '@mui/material'
import { containerClasses } from '@mui/material/Container'
import { createTheme } from '@mui/material/styles'
import { arrayFont, clashCroteskFont, fontSize } from './font'
import { colorTheme } from './_color'

export const APP_BORDER_RADIUS_PRIMARY = '16px'
export const CodeScrollBarStyled = {
  '&::-webkit-scrollbar': {
    height: '14px',
    width: '14px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
    borderRadius: '99px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#888',
    borderRadius: '99px',
    width: '14px',

    minHeight: '14px',
    minWidth: '20px',

    border: '3px solid ',
    borderColor: '#000',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#555',
    borderRadius: '99px',
  },
  '&::-webkit-scrollbar-corner': {
    background: '#000',
  },
}
export const BodyScrollBarStyled = {
  '&::-webkit-scrollbar': {
    width: '14px',
    height: '14px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
    marginTop: '8px',
    marginBottom: '8px',
    borderRadius: '99px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#808076',
    borderRadius: '99px',
    width: '14px',
    border: '3px solid #000',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#555',
    borderRadius: '99px',
  },
}
export const ScrollBarModalStyled = {
  '&::-webkit-scrollbar': {
    width: '10px',
    height: '10px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
    borderRadius: '99px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#808076',
    borderRadius: '99px',
    width: '10px',
    border: '3px solid rgba(255,255,255,0)',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#555',
    borderRadius: '99px',
  },
}
export const ScrollBarStyled = {
  '&::-webkit-scrollbar': {
    width: '14px',
    height: '14px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
    marginTop: '8px',
    marginBottom: '8px',
    borderRadius: '99px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#808076',
    borderRadius: '99px',
    width: '14px',
    border: '3px solid #ffffec',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#555',
    borderRadius: '99px',
  },
}
export const DocumentContentBarStyled = {
  '&::-webkit-scrollbar': {
    width: '20px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
    marginTop: '8px',
    marginBottom: '8px',
    borderRadius: '99px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#808076',
    borderRadius: '99px',
    border: '3px solid #ffffec',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#555',
    borderRadius: '99px',
  },
}
const LETTER_SPACING_HEADING = '-0.04em'
const LETTER_SPACING_HEADING_MOBILE = '0.01em'

const ARRAY_FONT_FAMILY = arrayFont.style.fontFamily
const CLASHCROTESK_FONT_FAMILY = clashCroteskFont.style.fontFamily
const HEADING_FONT = ARRAY_FONT_FAMILY

export const APP_FONT_FAMILY = {
  MAIN: ARRAY_FONT_FAMILY,
  SECONDARY: CLASHCROTESK_FONT_FAMILY,
  ARRAY: ARRAY_FONT_FAMILY,
  ClashGrotesk: CLASHCROTESK_FONT_FAMILY,
}

export const {
  palette,
  typography: { pxToRem },
  breakpoints,
} = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      // sm: 640,
      sm: 640,
      // md: 768,
      md: 900,
      lg: 1280,
      // xl: 1280,
      xl: 1536,
    },
  },
})
const { augmentColor } = palette
const getDesignTheme = (mode: PaletteMode = 'light') => {
  const theme = createTheme({
    typography: {
      fontFamily: APP_FONT_FAMILY.ClashGrotesk,
    },
    breakpoints: {
      ...breakpoints,
    },
    spacing: 4,
    palette: {
      mode,
      primary: {
        light: colorTheme.light.primary[200],
        main: colorTheme.light.primary[500],
        dark: colorTheme.light.primary[600],
        contrastText: colorTheme.light.baseGray[1000],
      },
      secondary: augmentColor({ color: colorTheme.light.secondary }),
      text: {
        secondary: colorTheme.light.baseGray[500],
        primary: colorTheme.light.baseGray[1000],
        disabled: colorTheme.light.baseGray[500],
      },
      background: {
        default: colorTheme.light.baseGray[1000],
        paper: colorTheme.light.primary[500],
      },
      // error: augmentColor({ color: colorTheme.general.red }),
      error: {
        light: colorTheme.general.red[100],
        main: colorTheme.general.red[600],
        dark: colorTheme.general.red[900],
      },
      warning: augmentColor({ color: colorTheme.general.yellow }),
      success: augmentColor({ color: colorTheme.general.green }),
      opacityGray: colorTheme.light.opacityGray,
      baseGray: colorTheme.light.baseGray,

      dotBlue: colorTheme.general.dotBlue,
      dotCoban: colorTheme.general.dotCoban,
      dotMint: colorTheme.general.dotMint,
      dotOrange: colorTheme.general.dotOrange,
      dotPink: colorTheme.general.dotPink,
      dotPurple: colorTheme.general.dotPurple,
      dotYellow: colorTheme.general.dotYellow,
      dotGreen: colorTheme.general.green,

      red: colorTheme.general.red,
      yellow: colorTheme.general.yellow,
      green: colorTheme.general.green,
      blue: colorTheme.general.blue,

      bgTrans: {
        light: colorTheme.light.primary[100],
        main: colorTheme.light.primary[500],
        dark: colorTheme.light.primary[800],
        contrastText: colorTheme.light.baseGray[1000],
      },
      border: {
        light: colorTheme.light.primary[600],
        main: colorTheme.light.baseGray[600],
        dark: colorTheme.light.baseGray[1000],
        contrastText: colorTheme.light.baseGray[1000],
      },
      action: {
        hoverOpacity: 0.3,
        disabledBackground: 'rgba(0, 0, 0, 0.12)',
        disabled: 'rgba(0, 0, 0, 0.26)',
      },
      divider: colorTheme.light.baseGray[500],
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            fontFamily: APP_FONT_FAMILY.ClashGrotesk,
            fontWeight: 500,
            // ...ScrollBarStyled,
            // ...BodyScrollBarStyled,
            '& .cm-theme .cm-editor .cm-scroller': {
              ...CodeScrollBarStyled,
            },
            '& pre code': { ...CodeScrollBarStyled },
            // backgroundColor: colorTheme.light.primary[500],
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: 'inherit',
            // letterSpacing: '0.04em',
            verticalAlign: 'middle',
            fontWeight: 500,
          },
          h1: {
            fontFamily: HEADING_FONT,
            letterSpacing: LETTER_SPACING_HEADING,
            ...fontSize[96],
            fontWeight: 700,
            [breakpoints.down('md')]: {
              letterSpacing: LETTER_SPACING_HEADING_MOBILE,
            },
          },
          h2: {
            fontFamily: HEADING_FONT,
            letterSpacing: LETTER_SPACING_HEADING,
            ...fontSize[34],
            [breakpoints.up('md')]: {
              ...fontSize[60],
              letterSpacing: LETTER_SPACING_HEADING_MOBILE,
            },
            fontWeight: 700,
          },
          h3: {
            fontFamily: HEADING_FONT,
            letterSpacing: LETTER_SPACING_HEADING,
            ...fontSize['26'],
            [breakpoints.up('md')]: {
              ...fontSize['48'],
              letterSpacing: LETTER_SPACING_HEADING_MOBILE,
            },
            fontWeight: 700,
          },
          h4: {
            fontFamily: HEADING_FONT,
            letterSpacing: LETTER_SPACING_HEADING,
            ...fontSize[20],
            [breakpoints.up('md')]: {
              ...fontSize[34],
              letterSpacing: LETTER_SPACING_HEADING_MOBILE,
            },
            fontWeight: 700,
          },
          h5: {
            fontFamily: HEADING_FONT,
            letterSpacing: LETTER_SPACING_HEADING,
            ...fontSize[18],
            [breakpoints.up('md')]: {
              ...fontSize[26],
              letterSpacing: LETTER_SPACING_HEADING_MOBILE,
            },
            fontWeight: 700,
          },
          // Small Headline
          h6: {
            fontFamily: HEADING_FONT,
            letterSpacing: LETTER_SPACING_HEADING,
            ...fontSize[16],
            [breakpoints.up('md')]: {
              ...fontSize[20],
              letterSpacing: LETTER_SPACING_HEADING_MOBILE,
            },
            fontWeight: 700,
          },
          subtitle1: {
            fontFamily: HEADING_FONT,
            letterSpacing: LETTER_SPACING_HEADING,
            ...fontSize['14'],
            [breakpoints.up('md')]: {
              ...fontSize['18'],
            },
            fontWeight: 700,
          },
          subtitle2: {
            ...fontSize['16'],
            [breakpoints.up('md')]: {
              ...fontSize['24'],
            },
          },
          body1: {
            ...fontSize['16'],
            [breakpoints.up('md')]: {
              ...fontSize['18'],
            },
          },
          body2: {
            ...fontSize['16'],
            [breakpoints.up('md')]: {
              ...fontSize['16'],
            },
          },
          caption: {
            ...fontSize[12],
          },
          overline: {
            ...fontSize[11],
            [breakpoints.up('md')]: {
              ...fontSize[12],
            },
          },
          button: {
            fontWeight: 'bold',
            ...fontSize['16'],
            [breakpoints.up('md')]: {
              ...fontSize['14'],
            },
          },
        },
      },
    },
  })
  return createTheme(theme, {
    shadows: {
      ...theme.shadows,
      [1]: '0px 2px 8px rgba(0, 0, 0, 0.06), 0px 8px 24px -4px rgba(0, 0, 0, 0.1)',
    },
    typography: {
      h7: {
        ...fontSize[18],
      },
      fontWeightBold: 700,
      fontWeightMedium: 600,
      fontWeightNormal: 500,
      fontWeightRegular: 500,
      fontWeightLight: 400,
      htmlFontSize: 16,
    },
    components: {
      MuiBackdrop: {
        styleOverrides: {
          root: {
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
          },
        },
      },
      // FORM HELP TEXT
      MuiContainer: {
        styleOverrides: {
          root: {
            [`&.${containerClasses.maxWidthMd}`]: {
              maxWidth: 1432,
              padding: 0,
              // paddingLeft: '32px',
              // paddingRight: '32px',
              [breakpoints.down('md')]: {
                paddingLeft: 0,
                paddingRight: 0,
              },
            },
            [`&.${containerClasses.maxWidthLg}`]: {
              maxWidth: 1432,
              padding: 0,
              // paddingLeft: '32px',
              // paddingRight: '32px',
              [breakpoints.down('md')]: {
                paddingLeft: 0,
                paddingRight: 0,
              },
            },
            [`&.${containerClasses.maxWidthXl}`]: {
              maxWidth: 1920,
              padding: 0,
              // paddingLeft: '32px',
              // paddingRight: '32px',
              [breakpoints.down('md')]: {
                paddingLeft: 0,
                paddingRight: 0,
              },
            },
          },
        },
      },

      MuiFormHelperTextCustomized: {
        styleOverrides: {
          root: {
            // paddingLeft: 16,
            ...fontSize[14],
            '&.Mui-error': {
              color: theme.palette.red[600],
            },
          },
        },
      },
      // ALERT
      MuiAlert: {
        styleOverrides: {
          root: {
            margin: 0,
            padding: '8px 18px',
            ...fontSize['16'],
            border: 'none',
            [breakpoints.down('md')]: {
              padding: '4px 6px',

              [`& .${alertClasses.message} p`]: {
                ...fontSize['14'],
              },
              [`& .${alertClasses.icon}`]: {
                marginRight: '4px',
                alignItems: 'center',
              },
            },
            fontWeight: 500,
            borderRadius: '50px',
          },
          icon: {
            padding: 0,
          },
          standardSuccess: {
            backgroundColor: theme.palette.dotGreen[100],
            color: theme.palette.dotGreen[800],
            // border: `1px solid ${theme.palette.dotGreen[800]}`,
            border: 'none',
          },
          standardError: {
            backgroundColor: theme.palette.error.light,
            color: theme.palette.error.main,
            // border: `1px solid ${theme.palette.error.main}`,
            border: 'none',
          },

          message: {
            padding: 0,
          },
        },
      },
      // ICON BUTTON
      MuiIconButton: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: 'unset',
            },
          },
        },
      },
      // PAPER & BACKGROUND
      MuiMenu: {
        styleOverrides: {
          root: {
            [`& .${menuClasses.paper}`]: {
              padding: 0,
              margin: 0,
              marginTop: 4,
            },
            [`& .${menuClasses.list}`]: {
              padding: 0,
              margin: 0,
            },
          },
        },
      },
      MuiList: {
        styleOverrides: {
          root: {
            '& .MuiMenuItem-root': {
              borderBottom: '1px solid',
              borderColor: theme.palette.border.dark,
            },
            '& .MuiMenuItem-root:first-of-type': {},
            '& .MuiMenuItem-root:last-child': {
              borderBottom: 'none',
            },
            '& a': {
              '& .MuiMenuItem-root': {
                borderBottom: '1px solid !important',
                borderColor: theme.palette.border.dark,
              },
            },
            '& a:last-child': {
              '& .MuiMenuItem-root': {
                borderBottom: 'none',
              },
            },
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            '&.MuiButtonBase-root': {
              minHeight: '36px',
            },
            fontWeight: 700,
            '& .MuiTypography-root': {
              fontWeight: 700,
            },
            '& .MuiSvgIcon-root': {
              marginLeft: 0,
              marginRight: '4px',
            },
            '&.Mui-selected': {
              backgroundColor: theme.palette.baseGray[800],
              color: theme.palette.primary.main,
            },
            '&.Mui-selected:hover': {
              backgroundColor: theme.palette.baseGray[800],
              color: theme.palette.primary.main,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: APP_BORDER_RADIUS_PRIMARY,
            padding: 8,
            margin: '4px',
            marginTop: '2px',
            marginBottom: '2px',
            paddingLeft: '28px',
            paddingRight: '28px',
            [breakpoints.down('md')]: {
              padding: '8px',
              paddingLeft: '16px',
              paddingRight: '16px',
            },
          },
        },
      },
      // SELECT
      MuiSelect: {
        styleOverrides: {
          root: {
            fontWeight: 600,
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: theme.palette.baseGray[1000],
            },
            [`&.MuiInputBase-colorSecondary .${selectClasses.select} `]: {
              color: theme.palette.primary.main,
              backgroundColor: theme.palette.baseGray[1000],
              borderRadius: '50px',
            },
            [`&.MuiInputBase-colorSecondary .${svgIconClasses.root} `]: {
              color: theme.palette.primary.main,
            },
          },
          select: {
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
          },
          outlined: {},
          outlinedPrimary: {},
          outlinedSecondary: {},
        },
      },
      // INPUT
      MuiFilledInput: {
        styleOverrides: {
          root: {},
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            '&.Mui-focused': {
              borderColor: theme.palette.baseGray[1000],
            },
          },
          input: {
            fontWeight: 500,
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {},
          underline: {},
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& input::-webkit-outer-spin-button': {
              ['-webkit-appearance']: 'none',
              margin: 0,
            },
            '& input::-webkit-inner-spin-button': {
              ['-webkit-appearance']: 'none',
              margin: 0,
            },
            '& input[type=number]': {
              ['-moz-appearance']: 'textfield',
            },
            '& .MuiFormLabel-root.MuiInputLabel-root': {
              color: theme.palette.text.primary,
            },
            '& .MuiInputBase-root.MuiInput-root': {
              '.Mui-focused': {
                '&:before': {
                  borderBottom: '1px solid',
                  borderColor: 'currentColor',
                },
              },
              '&:hover:not(.Mui-disabled, .Mui-error)': {
                '&:before': {
                  borderBottom: '1px solid',
                  borderColor: 'currentColor',
                  // transform: 'scaleX(1) translateX(0)',
                  // transition: 'transform cubic-bezier(0.0, 0, 0.2, 1) 0ms',
                },
              },
              '&:after': {
                borderBottom: '1px solid black',
              },
              '.MuiInput-underline': {
                '&:before': {},
              },
            },
          },
        },
      },

      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 50,
            [`&.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]:
              {
                borderWidth: 1,
                borderColor: theme.palette.baseGray[1000],
              },
            ['&.Mui-error']: {
              [`& .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: `${theme.palette.red[600]}`,
              },
            },
          },
          input: {
            ...fontSize['18'],
            padding: '8px 16px',
            borderWidth: 1,
            [breakpoints.down('md')]: {
              padding: '6px 8px',
            },
            [`&:not(:placeholder-shown) ~ .${outlinedInputClasses.notchedOutline}`]:
              {
                borderWidth: 1,
                borderColor: theme.palette.baseGray[1000],
              },
          },
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          root: {},
        },
      },

      MuiButtonBase: {
        styleOverrides: {
          root: {
            '& .MuiTypography-root': {
              fontWeight: 600,
            },
            '& .MuiTouchRipple-root .MuiTouchRipple-rippleVisible .MuiTouchRipple-child':
              {
                backgroundColor: 'rgba(0, 0, 0, 0.26)',
              },
            fontWeight: 600,
            ...fontSize['18'],
            borderRadius: '8px',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            ...fontSize['18'],
            fontWeight: 600,
            textTransform: 'none',
            boxShadow: 'none',
            borderRadius: '50px',
            '&:hover': {
              boxShadow: 'none',
            },
            '&.Mui-disabled': {
              color: theme.palette.baseGray[500],
              backgroundColor: theme.palette.primary.dark,
            },
            '& .MuiButton-endIcon': {
              marginTop: '2px',
            },
            [breakpoints.down('md')]: {
              paddingLeft: '4px',
              paddingRight: '4px',
            },
          },
          // TEXT
          text: {
            color: theme.palette.text.primary,
          },

          // CONTAINED
          containedPrimary: {
            backgroundColor: theme.palette.bgTrans.main,
            color: theme.palette.baseGray[1000],
            '&:hover': {
              backgroundColor: colorTheme.light.primary[600],
              color: theme.palette.baseGray[1000],
            },
            '&:active': {
              backgroundColor: theme.palette.bgTrans.main,
              color: theme.palette.baseGray[1000],
            },
          },
          containedSecondary: {
            backgroundColor: theme.palette.baseGray[1000],
            color: theme.palette.baseGray[50],
            '&:hover': {
              backgroundColor: theme.palette.baseGray[800],
              color: theme.palette.baseGray[100],
            },
            '&:active': {
              backgroundColor: theme.palette.baseGray[1000],
              color: theme.palette.baseGray[50],
            },
            '&.Mui-disabled': {
              color: theme.palette.baseGray[500],
              backgroundColor: theme.palette.primary.dark,
            },
          },
          containedError: {
            color: colorTheme.light.baseGray[50],
            backgroundColor: theme.palette.error.main,
            '&:hover': {
              color: 'white',
              backgroundColor: theme.palette.red[700],
              boxShadow: 'none',
            },
            '&:active': {
              color: colorTheme.light.baseGray[50],
              backgroundColor: theme.palette.error.main,
            },
          },
          containedWarning: {
            color: theme.palette.warning.main,
            backgroundColor: theme.palette.warning.light,
            '&:hover': {
              color: 'white',
              backgroundColor: theme.palette.warning.main,
              boxShadow: 'none',
            },
            '&:active': {
              color: theme.palette.warning.main,
              backgroundColor: theme.palette.warning.light,
            },
          },
          containedSuccess: {
            color: theme.palette.success.main,
            backgroundColor: theme.palette.success.light,
            '&:hover': {
              color: 'white',
              backgroundColor: theme.palette.success.main,
              boxShadow: 'none',
            },
            '&:active': {
              color: theme.palette.success.main,
              backgroundColor: theme.palette.success.light,
            },
          },

          // OUTLINED
          outlined: {
            border: '1px solid',
            borderColor: theme.palette.baseGray[1000],
            color: theme.palette.primary.main,
            '&:hover': {
              borderColor: theme.palette.baseGray[1000],
              color: theme.palette.primary.main,
            },
          },
          outlinedPrimary: {
            borderColor: theme.palette.primary.dark,
            color: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.baseGray[1000],
            },
            '&:active': {
              border: '1px solid',
              borderColor: theme.palette.baseGray[1000],
              color: theme.palette.baseGray[1000],
            },
          },
          outlinedSecondary: {
            borderColor: theme.palette.baseGray[1000],
            color: theme.palette.text.primary,
            '&:hover': {
              borderColor: theme.palette.baseGray[800],
              color: theme.palette.primary.main,
              backgroundColor: theme.palette.baseGray[800],
            },
            '&:active': {
              border: '1px solid',
              borderColor: theme.palette.baseGray[1000],
              color: theme.palette.primary.main,
              backgroundColor: theme.palette.baseGray[1000],
            },
          },
          outlinedError: {
            borderColor: theme.palette.error.main,
          },

          // WARNING FONT
          sizeLarge: {
            ...fontSize[18],
            padding: '8px 32px',
          },
          sizeMedium: {
            ...fontSize[18],
            padding: '4px 16px',
          },
          sizeSmall: {
            ...fontSize[18],
            padding: '0px 16px',
          },
          outlinedSizeLarge: {
            ...fontSize[18],
            padding: '7px 31px',
          },
          outlinedSizeMedium: {
            ...fontSize[18],
            padding: '3px 15px',
          },
          outlinedSizeSmall: {
            ...fontSize[18],
            lineHeight: '26px',
            padding: '0px 15px',
          },
        },
      },
      MuiPopover: {
        styleOverrides: {
          root: {
            '& .MuiPaper-root.MuiPaper-elevation': {
              padding: 0,
              margin: '0px',
              marginTop: '4px',
              border: '1px solid #000',
              overflow: 'hidden',
            },
            '& .MuiBackdrop-root': {
              backgroundColor: 'rgba(255,255,255,0)',
            },
            // '& li:not(:first-child)': {
            //   borderTop: '1px solid ',
            //   borderColor: theme.palette.baseGray[1000],
            // },

            // '& li:not(:first-child):hover.danger': {
            //   borderTop: '1px solid ',
            //   backgroundColor: theme.palette.red[500],
            // },
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            '&.MuiTableRow-hover:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          },
        },
      },
      MuiSkeleton: {
        styleOverrides: {
          root: {
            width: '100%',
            transform: 'scale(1)',
            borderRadius: '4px',
            backgroundColor: theme.palette.baseGray[800],
            '&:after': {
              background: ` linear-gradient( 90deg, transparent, rgba(0, 0, 0, 0.2), transparent )`,
            },
          },
        },
      },
    },
  })
}
export default getDesignTheme
