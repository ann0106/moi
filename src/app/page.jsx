'use client';

import { useEffect, useState } from 'react';
import styles from '../styles/homePage.module.scss';

export default function Home() {
  const [textIndex, setTextIndex] = useState(0);
  const phrases = ['Angela Precious Kafuliza', 'Your Favorite Software Developer'];
  const [displayedText, setDisplayedText] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const currentPhrase = phrases[textIndex];
    let charIndex = 0;

    const type = () => {
      if (charIndex <= currentPhrase.length) {
        setDisplayedText(currentPhrase.slice(0, charIndex));
        charIndex++;
        setTimeout(type, 100);
      } else {
        setTimeout(() => {
          setTyping(false);
          setTimeout(() => {
            setTextIndex((prev) => (prev + 1) % phrases.length);
            setTyping(true);
          }, 2000);
        }, 1500);
      }
    };

    if (typing) {
      type();
    }

  }, [textIndex, typing]);

  return (
    <main>
      <section className={styles.main}>
        <div className={styles.content}>
          <h2>Hi there😎!</h2>
          <h1 className={styles.typing}>{displayedText}<span className={styles.cursor}></span></h1>
          <p>Turning lines of code into beautiful digital art 🎨</p>
        </div>
      </section>

      <section id="skills" className={styles.section}>
        <h2>Skills</h2>
        <ul>
          <li>JavaScript / TypeScript</li>
          <li>React / Next.js</li>
          <li>Node.js / Express</li>
          <li>MySQL / MongoDB</li>
        </ul>
      </section>

      <section id="projects" className={styles.section}>
        <h2>Projects</h2>
        <p>🚀 Coming soon...</p>
      </section>
    </main>
  );
}
