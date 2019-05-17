import React from 'react'
import { Link } from 'gatsby'
import { Navbar } from '../components/navbar'
import './layout.module.css'

import { rhythm, scale } from '../utils/typography'

class Layout extends React.Component {
  render() {
    const { children } = this.props

    return (
      <div>
        <Navbar />
        <div
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: rhythm(26),
            padding: `${rhythm(3 / 4)}`,
          }}
        >
          {children}
        </div>
      </div>
    )
  }
}

export default Layout
