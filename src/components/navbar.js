import React from 'react'
import { Link } from 'gatsby'
import styles from './navbar.module.css'

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <h3
        style={{
          fontFamily: 'Montserrat, sans-serif',
          margin: 0,
          textAlign: 'center',
        }}
      >
        <Link className={styles.customLink} to={'/'}>
          Δ coding dΔnce
        </Link>
      </h3>
    </nav>
  )
}
