import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { Wrapper } from './wrapper'

const Nav = styled.nav``

const NavItems = styled.ul`
  display: flex;
  flex-direction: row;
  list-style-type: none;
`

const NavItem = styled.li`
  padding: 0.5rem 1rem;
`

const NavBrand = styled.li`
  padding: 0.5rem 1rem 1rem 0;
`

export const Navbar = () => (
  <Wrapper>
    <Nav>
      <NavItems>
        <NavBrand>
          <Link to="/">Marvin Frachet</Link>
        </NavBrand>
        <NavItem>f</NavItem>
      </NavItems>
    </Nav>
  </Wrapper>
)
