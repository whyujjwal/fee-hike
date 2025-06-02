import React, { useEffect, useState } from 'react';
import './PetitionPopup.css';

const PetitionPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="petition-popup-overlay">
      <div className="petition-popup">
        <button className="close-button" onClick={handleClose}>×</button>
        <div className="popup-content">
          <h2>Join the Movement</h2>
          <div className="newspaper-rule"></div>
          <p className="popup-text">
            The BITS Pilani fee hike crisis affects thousands of students and their families. 
            Your signature can make a difference in our fight for affordable education.
          </p>
          <div className="popup-stats">
            <div className="stat-item">
              <span className="stat-number">6000+</span>
              <span className="stat-label">Students Affected</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50%</span>
              <span className="stat-label">Fee Increase</span>
            </div>
          </div>
          <a 
            href="https://chng.it/sf7Y7rCgfD" 
            target="_blank" 
            rel="noopener noreferrer"
            className="popup-petition-button"
          >
            Sign the Petition
          </a>
        </div>
      </div>
    </div>
  );
};

export default PetitionPopup; 