import React from 'react'
import tagStyle from './tag.module.css'

export const Tag = ({ children }) => (
  <span className={tagStyle.tag}>{children}</span>
)
