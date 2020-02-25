import React from 'react'
import PropTypes from 'prop-types'
import { Global, css } from '@emotion/core'

const Layout = ({ children }) => (
  <div>
    <Global
      styles={css`
        body {
        }
        * {
          font-family: -apple-system, blinkmacsystemfont, segoeUI, Roboto,
            Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji,
            Segoe UI Symbol;

          margin: 0;
          padding: 0;
        }

        a:active {
          opacity: 0.7;
        }
      `}
    />
    {children}
  </div>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
