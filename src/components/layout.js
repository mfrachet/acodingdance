import React from 'react'
import { Navbar } from '../components/navbar'
import { Container } from './container'
import { Layout as AntLayout } from 'antd'

const Layout = ({ children }) => (
  <AntLayout>
    <Navbar />
    <Container>{children}</Container>
  </AntLayout>
)

export default Layout
