import React from 'react'
import { Layout } from 'antd'

const { Content } = Layout

export const Container = ({ children }) => (
  <Content>
    <div style={{ background: '#fff', padding: '1rem', margin: '1rem' }}>
      {children}
    </div>
  </Content>
)
