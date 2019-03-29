import React from 'react'

export const Card = ({ children }) => (
  <div
    style={{
      background: '#fff',
      borderRadius: '2px',
      padding: '1rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    }}
  >
    {children}
  </div>
)
