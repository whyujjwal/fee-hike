import React, { useState, useEffect } from 'react';
import './HeroSection.css';

const HeroSection: React.FC = () => {
  const [animatedNumbers, setAnimatedNumbers] = useState({
    oldFee: 0,
    newFee: 0,
    increase: 0
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      const animateNumber = (target: number, key: string, duration: number = 2000) => {
        const start = Date.now();
        const update = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const current = Math.floor(progress * target);
          
          setAnimatedNumbers(prev => ({ ...prev, [key]: current }));
          
          if (progress < 1) {
            requestAnimationFrame(update);
          }
        };
        update();
      };

      animateNumber(45000, 'oldFee', 1500);
      setTimeout(() => animateNumber(535000, 'newFee', 2000), 500);
      setTimeout(() => animateNumber(1089, 'increase', 1500), 1000);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const scrollToData = () => {
    document.getElementById('data')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-background"></div>
      <div className="hero-overlay"></div>
      
      <div className="container">
        <div className="hero-content">
          <div className="headline-area">
            <span className="breaking-news">BREAKING INVESTIGATION</span>
            <h1 className="main-headline">
              BITS Pilani: India's Premier College,<br />
              <span className="text-accent">Now Beyond Middle-Class Reach</span>
            </h1>
            <p className="sub-headline">
              An unprecedented analysis reveals how tuition fees have skyrocketed 
              <strong> {animatedNumbers.increase}% since 2007</strong>, far outpacing 
              Indian household income growth and pricing out middle-class families
            </p>
          </div>

          <div className="hero-stats">
            <div className="stat-card">
              <div className="stat-number">₹{animatedNumbers.oldFee.toLocaleString('en-IN')}</div>
              <div className="stat-label">2007 Annual Fee</div>
            </div>
            <div className="stat-arrow">→</div>
            <div className="stat-card featured">
              <div className="stat-number">₹{animatedNumbers.newFee.toLocaleString('en-IN')}</div>
              <div className="stat-label">2024 Annual Fee</div>
            </div>
            <div className="stat-card impact">
              <div className="stat-number">{animatedNumbers.increase}%</div>
              <div className="stat-label">Fee Increase</div>
            </div>
          </div>

          <div className="byline">
            <div className="author-info">
              <span className="byline-text">Investigative Analysis by</span>
              <span className="author-name">The Education Investigation Team</span>
              <time className="publish-date">Published {new Date().toLocaleDateString('en-IN')}</time>
            </div>
          </div>

          <button className="scroll-cue" onClick={scrollToData}>
            <span>Scroll to Investigate</span>
            <div className="scroll-arrow">⬇</div>
          </button>
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