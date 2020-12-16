import * as React from 'react'

const timeCss = (theme) => ({
fontSize: theme.fontSizes[0],
color: theme.colors.textLight
})

export const Time = (props) =>  {
    return <time css={timeCss} {...props} />
}