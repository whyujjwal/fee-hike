import React from 'react';
import './HeroSection.css';

const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-background"></div>
      <div className="hero-overlay"></div>
      
      <div className="container">
        {/* Newspaper Masthead */}
        <div className="newspaper-masthead">
          <div className="masthead-top">
            <div className="publication-details">
              <span className="edition">Digital Edition</span>
              <span className="price">Free • Public Interest</span>
            </div>
            <div className="weather-date">
              <span className="date">{new Date().toLocaleDateString('en-IN', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
              <span className="location">New Delhi, India</span>
            </div>
          </div>
          
          <div className="main-title">
            <h1 className="newspaper-name">THE EDUCATION TIMES</h1>
            <div className="motto">Truth in Every Number • Transparency in Every Analysis</div>
          </div>
        </div>

        {/* Breaking News Banner */}
        <div className="breaking-news-banner">
          <span className="breaking-label">BREAKING</span>
          <span className="breaking-text">MAJOR BT ALERT: BITS Fees Hit ₹3.06L Per Semester - Middle-Class Dreams Under Threat</span>
        </div>

        {/* Main Newspaper Content */}
        <div className="newspaper-content">
          <div className="main-story">
            <div className="headline-section">
              <h2 className="main-headline">
                BITS Fee Crisis Exposed:<br/>
                <span className="headline-accent">When Education Stops Being "Lite"</span>
              </h2>
              <div className="subheadline">
                Investigation reveals 1,400% fee increase since 1998 - The BT middle-class families can't sort
              </div>
              <div className="byline">
                <span className="reporter">By Education Investigation Team</span>
                <span className="location">Special Report from Pilani</span>
              </div>
            </div>

            <div className="article-columns">
              <div className="column-one">
                <p className="lead-paragraph">
                  <span className="dropcap">W</span>HAT STARTED as an affordable dream for middle-class families 
                  has morphed into a financial nightmare that's anything but "lite." 
                </p>
                <p>
                  Our comprehensive investigation reveals that BITS Pilani's semester fees have 
                  skyrocketed to ₹3,06,000 — a staggering 1,400% increase since 1998 that far 
                  outpaces inflation and household income growth.
                </p>
                <p>
                  "This BT won't get sorted easily," says Rajesh Kumar, whose daughter scored 
                  380 in BITSAT but couldn't afford the fees despite years of savings.
                </p>
              </div>

              <div className="column-two">
                <div className="info-box crisis">
                  <h3 className="box-title">THE NUMBERS DON'T LIE</h3>
                  <div className="stat-grid">
                    <div className="stat-item">
                      <span className="stat-number">₹3,06,000</span>
                      <span className="stat-label">Current Semester Fee</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">1,400%</span>
                      <span className="stat-label">Increase Since 1998</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">68%</span>
                      <span className="stat-label">Families Need Loans</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">₹24.48L</span>
                      <span className="stat-label">4-Year Program Cost</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">₹30.6L</span>
                      <span className="stat-label">5-Year Program Cost</span>
                    </div>
                  </div>
                  <div className="crisis-note">
                    <strong>Reality Check:</strong> Not lite at all for middle-class families
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar News */}
          <div className="sidebar-news">
            <div className="sidebar-section">
              <h4 className="sidebar-title">Also in Today's Edition</h4>
              <div className="sidebar-item">
                <h5>Interactive Simulation</h5>
                <p>Test if your family can handle the BITS fee BT</p>
              </div>
              <div className="sidebar-item">
                <h5>Data Analysis</h5>
                <p>Complete breakdown of fee growth vs income trends</p>
              </div>
              <div className="sidebar-item">
                <h5>Real Stories</h5>
                <p>How families cope when education isn't lite anymore</p>
              </div>
            </div>

            <div className="advertisement-space">
              <div className="ad-placeholder">
                <span>Educational Equality</span>
                <small>A fundamental right, not a privilege</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="floating-currency">
        <span className="currency-symbol">₹</span>
        <span className="currency-symbol">₹</span>
        <span className="currency-symbol">₹</span>
        <span className="currency-symbol">₹</span>
        <span className="currency-symbol">₹</span>
      </div>
    </section>
  );
};

export default HeroSection; 