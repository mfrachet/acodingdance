import React from 'react'
import { Link } from 'gatsby'
import { Tag as AntTag } from 'antd'

export const Tag = ({ children }) => (
  <Link to={`/tags/${children}`}>
    <AntTag color="gold">{children}</AntTag>
  </Link>
)
