import React, { useState, useEffect, useMemo } from 'react';
import './Navigation.css';

const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  const sections = useMemo(() => [
    { id: 'hero', label: 'The Story' },
    { id: 'data', label: 'The Data' },
    { id: 'impact', label: 'The Impact' },
    { id: 'game', label: 'Affordability Game' },
    { id: 'time-machine', label: 'Time Machine' }
  ], []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const scrollPosition = window.scrollY + 100;
      
      sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 60; // Approximate height of the navigation bar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="nav-content">
          <div className="investigation-title">
            <span className="breaking-badge">INVESTIGATION</span>
            <h2>BITS Pilani Fee Crisis</h2>
          </div>
          <ul className="nav-links">
            {sections.map(section => (
              <li key={section.id}>
                <button
                  className={`nav-link ${activeSection === section.id ? 'active' : ''}`}
                  onClick={() => scrollToSection(section.id)}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
          <a 
            href="https://chng.it/sf7Y7rCgfD" 
            target="_blank" 
            rel="noopener noreferrer"
            className="petition-button"
          >
            Sign the Petition
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 