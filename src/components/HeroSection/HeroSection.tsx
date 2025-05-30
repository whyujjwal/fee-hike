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
          <span className="breaking-label">BREAKING INVESTIGATION</span>
          <span className="breaking-text">BITS Pilani Fees Reach ₹3.06 Lakh Per Semester - Elite Education's Growing Inequality Crisis</span>
        </div>

        {/* Main Newspaper Content */}
        <div className="newspaper-content">
          <div className="main-story">
            <div className="headline-section">
              <h2 className="main-headline">
                The Great Education Divide:<br/>
                <span className="headline-accent">How India's Premier Institute Prices Out the Middle Class</span>
              </h2>
              <div className="subheadline">
                Exclusive investigation reveals 1,400% fee escalation since 1998 — A systematic exclusion of middle-income families
              </div>
              <div className="byline">
                <span className="reporter">By The Education Investigation Desk</span>
                <span className="location">Special Report from Pilani</span>
              </div>
            </div>

            <div className="article-columns">
              <div className="column-one">
                <p className="lead-paragraph">
                  <span className="dropcap">W</span>HAT BEGAN as an accessible pathway to excellence for India's aspirational middle class 
                  has transformed into an insurmountable financial fortress that few can breach.
                </p>
                <p>
                  Our comprehensive six-month investigation reveals that BITS Pilani's semester fees have 
                  escalated to ₹3,06,000 — a devastating 1,400% increase since 1998 that dramatically 
                  outpaces inflation, household income growth, and economic accessibility.
                </p>
                <p>
                  "We saved for fifteen years, dreaming of this moment," reveals Rajesh Kumar, whose daughter scored 
                  380 in BITSAT but was forced to abandon her admission despite years of meticulous financial planning.
                </p>
              </div>

              <div className="column-two">
                <div className="info-box crisis">
                  <h3 className="box-title">THE CRISIS IN NUMBERS</h3>
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
                      <span className="stat-label">Families Require Loans</span>
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
                    <strong>Critical Impact:</strong> Systematic exclusion of middle-income families from premium education
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar News */}
          <div className="sidebar-news">
            <div className="sidebar-section">
              <h4 className="sidebar-title">Inside This Investigation</h4>
              <div className="sidebar-item">
                <h5>Financial Impact Simulator</h5>
                <p>Calculate the true burden of premium education costs on Indian households</p>
              </div>
              <div className="sidebar-item">
                <h5>Comprehensive Data Analysis</h5>
                <p>Detailed examination of fee inflation versus national income trends</p>
              </div>
              <div className="sidebar-item">
                <h5>Human Stories</h5>
                <p>Exclusive interviews with families navigating the education affordability crisis</p>
              </div>
            </div>

            <div className="advertisement-space">
              <div className="ad-placeholder">
                <span>Educational Equality</span>
                <small>A constitutional promise under threat</small>
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