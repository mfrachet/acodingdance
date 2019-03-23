import React from 'react'

export const Time = ({ value }) => (
  <span>
    {Math.ceil(value)} minute{value > 1 && 's'} long
  </span>
)
