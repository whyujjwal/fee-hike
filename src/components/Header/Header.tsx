import React, { useState, useEffect } from 'react';
import './Header.css';

const Header: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Only hide/show header after scrolling past 100px
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY) {
          // Scrolling down
          setIsVisible(false);
        } else {
          // Scrolling up
          setIsVisible(true);
        }
      } else {
        // Always show header at the top
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`header ${isVisible ? 'header-visible' : 'header-hidden'}`}>
      <div className="container">
        <div className="header-content">
          <div className="publication-info">
            <h1 className="publication-name">Fee Hike Investigation</h1>
            <p className="publication-tagline">Education is NOT Lite • Data-Driven Truth • For Every Family</p>
          </div>
          <div className="header-meta">
            <time className="publication-date">
              {new Date().toLocaleDateString('en-IN', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </time>
            <div className="social-share">
              <button className="share-btn" onClick={() => navigator.share?.({
                title: 'BITS Pilani: India\'s Premier College, Now Beyond Middle-Class Reach',
                url: window.location.href
              })}>
                Share
              </button>
            </div>
          </div>
        </div>
        <div className="header-divider"></div>
      </div>
    </header>
  );
};

export default Header; 