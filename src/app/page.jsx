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
const [content, setContent] = useState([]);
const [selectedProject, setSelectedProject] = useState(null); // ✅ Add this line

  const profileRef = useRef();

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/moi');
        const json = await res.json();
        if (json.data && json.data.length > 0) {
          setContent(json.data[0]); // assuming you're displaying a single bio
        }
      } catch (error) {
        console.error('Failed to load content:', error);
      }
    };
  
    fetchData();
  }, []);
  

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
            <p>{content.bio}</p> {/* Dynamic Content */}
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

      <section id="projects" className={styles.projectsSection}>
  <h2>Projects</h2>
  <p className={styles.centerText}>Explore some platforms and tools I’ve worked with:</p>

  <div className={styles.projectGrid}>
    {[
      { name: 'Next.js Project', image: '/assets/next.jpg' },
      
      // { name: 'Laravel App', image: '/assets/laravel.jpg' },
      { name: 'Figma Designs', image: '/assets/design.jpg' },
      { name: 'React App', image: '/assets/react.jpg' },
    ].map((project, idx) => (
      <div key={idx} className={styles.projectCard} onClick={() => setSelectedProject(project)}>
        <Image src={project.image} alt={project.name} width={200} height={200} />
      </div>
    ))}
  </div>

  {/* Modal for project details */}
  {selectedProject && (
    <div className={styles.modalOverlay} onClick={() => setSelectedProject(null)}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3>{selectedProject.name}</h3>
        <Image src={selectedProject.image} alt={selectedProject.name} width={300} height={300} />
        <button onClick={() => setSelectedProject(null)} className={styles.closeBtn}>Close</button>
      </div>
    </div>
  )}
</section>

    </main>
  );
}
