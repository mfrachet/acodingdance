import React from 'react'
import { Link } from 'gatsby'

export const Tag = ({ children }) => (
  <Link to={`/tags/${children}`}>
    <span>{children}</span>
  </Link>
)
