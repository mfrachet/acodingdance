import React from 'react'
import { Link } from 'gatsby'
import styles from './navbar.module.css'

export const Navbar = ({ showTitle }) => (
  <nav className={styles.navbar}>
    {showTitle && (
      <h3
        style={{
          fontFamily: 'Montserrat, sans-serif',
          marginTop: '3px',
        }}
      >
        <Link className={styles.customLink} to={'/'}>
          <span>←</span> Δ coding dΔnce
        </Link>
      </h3>
    )}
  </nav>
)
