import React from 'react'
import { Link } from 'gatsby'
import styles from './navbar.module.css'

export const Navbar = ({ showTitle, title }) => (
  <nav className={styles.navbar}>
    {showTitle && (
      <h3
        style={{
          color: 'red',
          fontFamily: 'Montserrat, sans-serif',
          marginTop: '3px',
        }}
      >
        <Link className={styles.customLink} to={'/'}>
          <span>←</span> Δ coding dΔnce
        </Link>
      </h3>
    )}
    <div className={styles.navbarRight}>
      <Link to={'/'}>Blog</Link>
      <Link to={'/about'}>About me</Link>
    </div>
  </nav>
)
