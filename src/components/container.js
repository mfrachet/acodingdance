import React from 'react'
import { rhythm } from '../utils/typography'
import { Layout, Menu, Breadcrumb } from 'antd'

const { Content } = Layout

export const Container = ({ children }) => (
  <Content style={{ padding: '0 20%' }}>
    <div style={{ background: '#fff', padding: 24, margin: 24 }}>
      {children}
    </div>
  </Content>
)
