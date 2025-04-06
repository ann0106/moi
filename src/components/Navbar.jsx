// src/components/Navbar.jsx
'use client'
import styles from '../styles/navbar.module.scss'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <Image src="/assets/logo.png" alt="Logo" width={60} height={60} />
      </div>
      <ul className={styles.links}>
        <li><a href="#home">Home</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#projects">Projects</a></li>
      </ul>
      <div className={styles.right}>
        <button className={styles.login}>Login</button>
      </div>
    </nav>
  )
}
