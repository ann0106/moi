// src/components/Footer.jsx
import styles from '../styles/footer.module.scss'
import { FaEnvelope, FaLinkedin } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <h2>Contact</h2>
      <div className={styles.icons}>
  <a href="mailto:angela.kafuliza@gmail.com" className={styles.emailLink}>
    <FaEnvelope /> angela.kafuliza@gmail.com
  </a>
  
  <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
    <FaLinkedin size={24} />
  </a>
</div>

    </footer>
  )
}
