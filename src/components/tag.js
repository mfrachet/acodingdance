import React from 'react'
import { Link } from 'gatsby'
import tagStyle from './tag.module.css'

export const Tag = ({ children }) => (
  <Link to={`/tags/${children}`}>
    <span className={tagStyle.tag}>{children}</span>
  </Link>
)
