import React from 'react';
import './HeroSection.css';

const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-background"></div>
      <div className="hero-overlay"></div>
      
      <div className="container">
        <div className="hero-content">
          <div className="newspaper-columns">
            <div className="hero-left">
              <div className="newspaper-date">December 2024 • Breaking Investigation</div>
              <h1 className="main-headline">
                BITS Fee Crisis:<br/>
                <span className="headline-accent">When Education Stops Being "Lite"</span><br/>
                The BT Middle-Class Families Can't Sort
              </h1>
              <div className="lead-paragraph">
                <span className="dropcap">W</span>hat started as an affordable dream for middle-class families 
                has turned into a financial nightmare. BITS Pilani's fees have exploded by over 1,400% since 1998. 
                The "sort" isn't coming anytime soon, and families are anything but taking it "lite."
              </div>
            </div>
            
            <div className="hero-right">
              <div className="fee-highlight-box">
                <div className="breaking-banner">MAJOR BT ALERT</div>
                <div className="current-fee">
                  <div className="fee-label">Current Semester Fee</div>
                  <div className="fee-amount">₹3,06,000</div>
                  <div className="fee-change">+1,465% since 1998</div>
                </div>
                <div className="impact-stats">
                  <div className="stat-item">
                    <span className="stat-number">68%</span>
                    <span className="stat-label">families can't afford without loans</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">₹12L+</span>
                    <span className="stat-label">total 4-year cost (not very lite!)</span>
                  </div>
                </div>
                <div className="urgency-note">
                  This BT needs immediate attention. No one can take this lite anymore.
                </div>
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