import * as React from 'react'

const titleCss = (theme) => ({
fontSize: theme.fontSizes[10],
lineHeight: '4rem',
fontWeight: theme.fontWeights.extraBold,
backgroundImage: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
WebkitBackgroundClip: "text",
WebkitTextFillColor: "transparent",
MozBackgroundClip: "text",
MozTextFillColor: "transparent",
margin: 0,
})

export const Title = (props) =>  {
    return <h1 css={titleCss} {...props} />
}