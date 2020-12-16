import React from "react";
import { withTheme, ThemeProvider, css, Global } from "@emotion/react";
import bullet from "./bullet.svg";

const toPx = (x) => `${x}px`;

const breakpoints = {
  mobile: 360,
  phablet: 550,
  tablet: 750,
  desktop: 1000,
  hd: 1300,
};
const createMediaQuery = (breakpoint) => `@media (min-width: ${breakpoint}px)`;

const defaultTheme = {
  breakpoints,
  mq: {
    mobile: createMediaQuery(breakpoints.mobile),
    phablet: createMediaQuery(breakpoints.phablet),
    tablet: createMediaQuery(breakpoints.tablet),
    desktop: createMediaQuery(breakpoints.desktop),
    hd: createMediaQuery(breakpoints.hd),
  },
  spaces: [
    4,
    8,
    12,
    16,
    24,
    32,
    48,
    64,
    96,
    128,
    192,
    256,
    384,
    512,
    640,
    768,
  ].map(toPx),
  fontSizes: [12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72].map(toPx),
  colors: {
    primary: `hsl(231, 48%, 48%)`,
    text: `hsl(231, 48%, 22%)`,
    background: `hsl(231, 48%, 98%)`,
    background2: `hsl(231, 48%, 90%)`,
  },

  fontWeights: {
    text: 400,
    heading: 600,
  },
};

const makeGlobalStyles = (theme) => css`
  html,
  body {
    margin: 0;
    padding: 0;
  }

  /* body */
  body {
    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI",
      Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: ${theme.fontSizes[2]};
    background: ${theme.colors.background};
  }

  ${theme.mq.desktop} {
    body {
      font-size: ${theme.fontSizes[5]};
    }
  }
  /* end of body */

  p {
    line-height: 1.7;
    margin: 0;
    padding: 0;
    margin-bottom: ${theme.spaces[5]};
    color: ${theme.colors.text};
    font-weight: ${theme.fontWeights.text};
  }

  a {
    color: unset;
    font-weight: ${theme.colors.text};
  }

  a:active {
    opacity: 0.5;
  }

  /* ul */
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    margin-bottom: ${theme.spaces[5]};
    margin-left: ${theme.spaces[2]};
  }

  ${theme.mq.desktop} {
    ul {
      margin-left: ${theme.spaces[5]};
    }
  }
  /* end of ul */

  .gatsby-highlight {
    margin-bottom: ${theme.spaces[5]};

    font-size: ${theme.fontSizes[0]};
  }

  /* li */
  li {
    margin: 0;
    padding: 0;
    margin-bottom: ${theme.spaces[2]};
    line-height: 1.7;
    color: ${theme.colors.text};
    font-weight: ${theme.fontWeights.text};

    &:before {
      content: "";
      display: inline-block;

      height: ${theme.fontSizes[3]};
      width: ${theme.fontSizes[3]};
      background-image: url(${bullet});
      background-size: contain;
      background-repeat: no-repeat;
      margin-right: ${theme.spaces[1]};
      vertical-align: middle;
    }

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  ${theme.mq.desktop} {
    li {
      &:before {
        content: "";
        display: inline-block;

        height: ${theme.fontSizes[5]};
        width: ${theme.fontSizes[5]};
        background-image: url(${bullet});
        background-size: contain;
        background-repeat: no-repeat;
        margin-right: ${theme.spaces[1]};
        vertical-align: middle;
      }
    }
  }
  /* end of li */

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
    font-weight: ${theme.fontWeights.heading};
  }

  /** h1,h2,h3 */
  h1 {
    color: ${theme.colors.primary};
    margin-bottom: ${theme.spaces[2]};
    font-size: ${theme.fontSizes[5]};
  }

  h2 {
    margin-bottom: ${theme.spaces[4]};
    font-size: ${theme.fontSizes[5]};
  }

  h3 {
    margin-bottom: ${theme.spaces[3]};
    font-size: ${theme.fontSizes[3]};
  }

  ${theme.mq.desktop} {
    h1 {
      font-size: ${theme.fontSizes[8]};
    }

    h2 {
      font-size: ${theme.fontSizes[7]};
    }

    h3 {
      font-size: ${theme.fontSizes[5]};
    }
  }
  /** end of h1,h2,h3 */

  /* language-text */
  code.language-text {
    font-size: ${theme.fontSizes[0]};
    padding: ${theme.spaces[0]} ${theme.spaces[1]}!important;
    vertical-align: middle !important;
    background: ${theme.colors.background2}!important;
    color: ${theme.colors.text};
  }

  ${theme.mq.desktop} {
    code.language-text {
      font-size: ${theme.fontSizes[1]};
    }
  }
  /* end of language-text */

  time {
    display: block;
    font-size: ${theme.fontSizes[1]};
    margin-bottom: ${theme.spaces[5]};
  }
`;

const GlobalStyles = withTheme(({ theme }) => (
  <Global styles={makeGlobalStyles(theme)} />
));

export const Layout: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />

      {children}
    </ThemeProvider>
  );
};
