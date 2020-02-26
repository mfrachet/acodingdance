import { css } from '@emotion/core'
import { colors } from './theme'

const classes = css`
  hr {
    margin: 2rem 0;
  }

  p,
  li {
    letter-spacing: 0.07em;
    font-size: 1em;
    line-height: 2em;
    color: ${colors.text};
  }

  p {
    margin-bottom: 1.5rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  ul {
    margin: 1.5rem 0;
  }

  li {
    margin-left: 2rem;
  }

  h1 {
    font-size: 2.5em;
    font-weight: normal;
    letter-spacing: 0.07em;
  }

  h2 {
    font-size: 2em;
    font-weight: normal;
    letter-spacing: 0.07em;
  }

  h3 {
    font-size: 1.6em;
    font-weight: normal;
    letter-spacing: 0.07em;
  }

  h4 {
    font-size: 1.2em;
    font-weight: normal;
    letter-spacing: 0.07em;
  }

  img,
  iframe {
    border-radius: 10px;
    margin-bottom: 2rem;
    margin-top: 2rem;
    width: 100%;
  }

  pre {
    width: 100%;
    margin: 2rem 0 3rem 0;
    border-radius: 10px;
    padding: 1.6rem;
    font-family: inherit;
  }

  a {
    color: ${colors.brand};
    font-weight: bold;
    padding-bottom: 0.05em;
    text-decoration: none;
    border-bottom: 1px solid ${colors.brand};
  }

  h1 a,
  h2 a,
  h3 a,
  h4 a,
  h5 a {
    border-bottom: 0px;
  }

  /** App */
  h4.post-title {
    font-weight: bold;
  }
`

export const Container = ({ children }) => <div css={classes}>{children}</div>
