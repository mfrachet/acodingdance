import Typography from 'typography'

const typography = new Typography({
  overrideStyles: ({ adjustFontSizeTo, scale, rhythm }, options) => ({
    blockquote: {
      ...scale(1 / 5),
      fontStyle: 'italic',
      paddingLeft: rhythm(13 / 16),
      marginLeft: rhythm(-1),
    },
    'blockquote > :last-child': {
      marginBottom: 0,
    },
    'blockquote cite': {
      ...adjustFontSizeTo(options.baseFontSize),
      color: options.bodyColor,
      fontWeight: options.bodyWeight,
    },
    'blockquote cite:before': {
      content: '"— "',
    },
  }),
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
