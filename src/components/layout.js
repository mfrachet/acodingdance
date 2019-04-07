import React from 'react'
import { Link } from 'gatsby'
import { Navbar } from '../components/navbar'
import './layout.module.css'

import { rhythm, scale } from '../utils/typography'

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header
    const isRoot = location.pathname === rootPath

    if (isRoot) {
      header = (
        <Link to={'/'}>
          <h1
            style={{
              textAlign: 'center',
              ...scale(1.5),
              marginBottom: rhythm(1.5),
            }}
          >
            {title}
          </h1>
        </Link>
      )
    }
    return (
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: rhythm(26),
          padding: `${rhythm(3 / 4)}`,
        }}
      >
        <Navbar showTitle={!isRoot} />
        {header}
        {children}
      </div>
    )
  }
}

export default Layout
