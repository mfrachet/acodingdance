import React from 'react'

export const Time = ({ value }) => (
  <span>
    🕒{Math.ceil(value)} mn{value > 1 && 's'}
  </span>
)
