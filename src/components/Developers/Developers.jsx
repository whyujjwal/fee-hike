import React from 'react';
import './Developers.css';

const Developers = () => {
  return (
    <div className="developers-section">
      <div className="container">
        <div className="newspaper-rule-thick"></div>
        <div className="developers-content">
          <p className="developed-by">Developed by</p>
          <div className="developer-links">
            <div className="developer-item">
              <a 
                href="https://www.linkedin.com/in/sujal-mittal-4467972a7/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="developer-link"
              >
                Sujal Mittal
              </a>
              <span className="developer-role">Lead Developer</span>
            </div>
            <span className="separator">&</span>
            <a 
              href="https://www.linkedin.com/in/ujjwal-raj-2019b5181/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="developer-link"
            >
              Ujjwal Raj
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Developers; 