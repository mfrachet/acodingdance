import React from 'react'
import { Link } from 'gatsby'
import { Menu, Input } from 'antd'

const { Search } = Input

export const Navbar = () => (
  <Menu mode="horizontal">
    <Menu.Item>
      <Link to="/">Acoding Dance</Link>
    </Menu.Item>

    <Search
      placeholder="input search text"
      onSearch={value => console.log(value)}
      style={{ width: 200 }}
    />
  </Menu>
)
