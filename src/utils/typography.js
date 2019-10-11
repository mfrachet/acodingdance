import Typography from 'typography'

const typography = new Typography({
  bodyFontFamily: ['roboto', 'georgia'],
  baseFontSize: '18px',
  baseLineHeight: 1,
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
