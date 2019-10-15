import React from 'react'
import '../index.css'
import { Container } from './container'
import { Wrapper } from './wrapper'
import { Layout as AntLayout } from 'antd'

const Layout = ({ children }) => (
  <AntLayout>
    <Container>
      <Wrapper>{children}</Wrapper>
    </Container>
  </AntLayout>
)

export default Layout
