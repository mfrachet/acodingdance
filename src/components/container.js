import { css } from '@emotion/core'

const classes = css`
  margin: 3rem 0;

  hr {
    margin: 2rem 0;
  }

  p,
  li {
    letter-spacing: 0.05em;
    font-size: 1.2em;
    line-height: 1.6em;
    color: #373737;
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
    font-weight: 600;
    letter-spacing: 0.05em;
  }

  h2 {
    font-size: 2em;
    font-weight: 600;
    letter-spacing: 0.05em;
  }

  h3 {
    font-size: 1.6em;
    font-weight: 600;
    letter-spacing: 0.05em;
  }

  h4 {
    font-size: 1.2em;
    font-weight: 600;
    letter-spacing: 0.05em;
  }

  img,
  iframe {
    margin-bottom: 2rem;
    margin-top: 2rem;
    max-width: 100%;
  }

  pre {
    margin: 5rem 5vw;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 1px 15px rgba(27, 31, 35, 0.15);
    border: 1px solid #dfdfdf;
    padding: 0 1rem 1rem 1rem;
    font-family: inherit;

    &.language-jsx:before {
      content: 'JSX Snippet';
    }

    &.language-js:before {
      content: 'JavaScript Snippet';
    }

    &.language-shell:before {
      content: 'Shell Snippet';
    }

    &:before {
      content: 'Code snippet';
      background: red;
      display: block;
      padding: 0.3rem 1rem;
      border-radius: 5px 5px 0 0;
      border-bottom: 1px solid #dfdfdf;
      background-color: #f4f4f4;
      margin: 0 -1rem 1rem -1rem;
    }
  }

  a {
    color: black;
    font-weight: bold;
    padding-bottom: 0.05em;
    text-decoration: none;
    border-bottom: 1px solid black;
  }

  h1 a,
  h2 a,
  h3 a,
  h4 a,
  h5 a {
    border-bottom: 0px;
  }
`

export const Container = ({ children }) => <div css={classes}>{children}</div>
