import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { Wrapper } from './wrapper'

const Nav = styled.nav`
  height: 60px;
  background: #fff;
`

const NavItems = styled.ul`
  height: 40px;
  display: flex;
  flex-direction: row;
  list-style-type: none;
  align-items: center;
`

const NavItem = styled.li`
  padding: 0.5rem 1rem;
`

const NavBrand = styled.li`
  padding: 0.5rem 1rem;
`

export const Navbar = () => (
  <Nav>
    <Wrapper>
      <NavItems>
        <NavBrand>
          <Link to="/">Marvin Frachet</Link>
        </NavBrand>
        <NavItem />
      </NavItems>
    </Wrapper>
  </Nav>
)
