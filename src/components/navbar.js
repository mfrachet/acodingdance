import React from 'react'
import { Link } from 'gatsby'
import styles from './navbar.module.css'
import { rhythm } from '../utils/typography'

export const Navbar = ({ isRoot }) => {
  return (
    <nav className={styles.navbar}>
      <h3
        style={{
          fontFamily: 'Montserrat, sans-serif',
          margin: 0,
        }}
      >
        <Link className={styles.customLink} to={'/'}>
          Δ coding dΔnce
        </Link>
      </h3>
    </nav>
  )
}
