import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="publication-info">
            <h1 className="publication-name">The Education Investigation</h1>
            <p className="publication-tagline">Independent • Data-Driven • For the People</p>
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