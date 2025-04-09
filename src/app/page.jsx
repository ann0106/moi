'use client';

import { useEffect, useState, useRef } from 'react';
import styles from '../styles/homePage.module.scss';
import Image from 'next/image';

export default function Home() {
  const [textIndex, setTextIndex] = useState(0);
  const phrases = [" It's Angela Precious Kafuliza", 'Your Favorite Software Developer😉'];
  const [displayedText, setDisplayedText] = useState('');
  const [typing, setTyping] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const profileRef = useRef();

  // Typing effect
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

  // Fade in on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (profileRef.current) {
      observer.observe(profileRef.current);
    }

    return () => {
      if (profileRef.current) {
        observer.unobserve(profileRef.current);
      }
    };
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section className={styles.main}>
        <div className={styles.content}>
          <h2>Hi there!</h2>
          <h1 className={styles.typing}>
            {displayedText}
            <span className={styles.cursor}></span>
          </h1>
          <p>Turning lines of code into beautiful digital art 🎨</p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={styles.about}>
        <h2 className={styles.fadeIn}>About Angela...</h2>
        <div className={styles.aboutContent}>
          <Image
            src="/assets/profile1.jpeg"
            alt="Angela Profile"
            width={130}
            height={150}
            ref={profileRef}
            className={`${styles.profilePic} ${isVisible ? styles.visible : ''}`}
          />
          <p className={styles.fadeIn}>
            Angela is a passionate software developer who enjoys building interactive digital experiences.
          </p>
          <a className={styles.knowMoreLink} onClick={() => setShowModal(true)}>
            Wait, there's more ... <span className={styles.icon}>➤</span>
          </a>

        </div>
      </section>

      {/* Modal Popup */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>More About Angela</h3>
            <p>
              I hold a Bachelor of Science degree in Computer Systems and Security with a solid foundation in
              website development. Recognized for my quick learning, adaptability, and strong work ethic, I
              thrive in collaborative team environments and am driven to deliver tangible results.

              With a keen eye for detail and exceptional problem-solving abilities, I have strong website
              development skills and consistently create some of the best frontend designs. My expertise
              includes comprehensive website development, advanced frontend design implementation, and
              strategic creation of user-friendly interfaces. I have successfully worked on projects such as the
              MIIRI website, MCRD, and the MUST Virtual Cultural Lab, delivering high-quality, functional, and
              visually appealing web solutions. I am dedicated to contributing my technical expertise to ensure
              high-end and secure digital landscapes.
            </p>
            <p>
            PROFESSIONAL EXPERIENCE
                Software Developer, MUST - MIIRI
                Jun 2023 - Present
                Thyolo, Malawi
                Duties and Responsibilities

                Leading the development of the MUST Virtual Cultural Lab platform (pending).
                Leading the development of the TAGDev 2.0 website (pending).
                Part of the team that revamped the MIIRI website.
                Gaphic Designing.
                Programme development for the Innovation garage.
                Part of the team implementing TAGDev 2.0 project.
                Part of the team that drafted the MUST workplan for NPC, Malawi Vision 2063.
                Facilitating the MUST Standard Bank and Marble hackathon.
                Providing technical support for the MUST Research and Innovation Garage.
                Taught secondary school girls Graphic Designing during 2024 MUST STEAM camp.
            </p>
        
            <button onClick={() => setShowModal(false)} className={styles.closeBtn}>
              Close
            </button>
          </div>
        </div>
      )}

      <section id="skills" className={styles.skills}>
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
