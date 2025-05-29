import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { studentStories, incomeComparison } from '../../data/bitsData';
import './StorytellingSection.css';

const StorytellingSection: React.FC = () => {
  const [visibleSections, setVisibleSections] = useState<string[]>([]);

  const addVisibleSection = (id: string) => {
    setVisibleSections(prev => [...prev, id]);
  };

  const StorySection: React.FC<{ id: string; children: React.ReactNode; className?: string }> = ({ 
    id, 
    children, 
    className = '' 
  }) => {
    const { ref, inView } = useInView({
      threshold: 0.3,
      triggerOnce: true
    });

    useEffect(() => {
      if (inView && !visibleSections.includes(id)) {
        addVisibleSection(id);
      }
    }, [inView, id]);

    return (
      <div 
        ref={ref} 
        className={`story-section ${className} ${inView ? 'visible' : ''}`}
      >
        {children}
      </div>
    );
  };

  return (
    <section id="impact" className="storytelling-section">
      <div className="container">
        <StorySection id="intro" className="intro-section">
          <div className="story-header">
            <h2 className="story-title">The Human Cost</h2>
            <p className="story-subtitle">Behind every statistic lies a family's dream deferred</p>
          </div>
        </StorySection>

        <StorySection id="middle-class-squeeze" className="squeeze-section">
          <div className="squeeze-content">
            <h3>"Middle-Class is Not Enough"</h3>
            <p className="squeeze-intro">
              The numbers reveal a troubling reality: even families with above-average incomes 
              struggle to afford what was once considered accessible education.
            </p>
            
            <div className="comparison-grid">
              <div className="comparison-card">
                <h4>Median Engineer's Salary Growth</h4>
                <div className="growth-stat">
                  <span className="growth-number">+{incomeComparison.medianEngineerSalary.growthRate}%</span>
                  <span className="growth-period">2007-2024</span>
                </div>
                <div className="growth-detail">
                  ₹{incomeComparison.medianEngineerSalary[2007].toLocaleString()} → 
                  ₹{incomeComparison.medianEngineerSalary[2024].toLocaleString()}
                </div>
              </div>

              <div className="comparison-card">
                <h4>Middle-Class Income Growth</h4>
                <div className="growth-stat">
                  <span className="growth-number">+{incomeComparison.middleClassThreshold.growthRate}%</span>
                  <span className="growth-period">2007-2024</span>
                </div>
                <div className="growth-detail">
                  ₹{incomeComparison.middleClassThreshold[2007].toLocaleString()} → 
                  ₹{incomeComparison.middleClassThreshold[2024].toLocaleString()}
                </div>
              </div>

              <div className="comparison-card crisis">
                <h4>BITS Fees Growth</h4>
                <div className="growth-stat">
                  <span className="growth-number crisis">+{incomeComparison.bitsFeesGrowth.growthRate}%</span>
                  <span className="growth-period">2007-2024</span>
                </div>
                <div className="growth-detail">
                  ₹{incomeComparison.bitsFeesGrowth[2007].toLocaleString()} → 
                  ₹{incomeComparison.bitsFeesGrowth[2024].toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </StorySection>

        <StorySection id="quiet-exit" className="exit-section">
          <div className="exit-content">
            <h3>"The Quiet Exit"</h3>
            <p>
              Across India, talented students are quietly abandoning their BITS dreams. 
              The ripple effects extend beyond individual families to the very fabric of 
              educational opportunity in our country.
            </p>
            
            <div className="impact-stats">
              <div className="stat-item">
                <span className="stat-number">73%</span>
                <span className="stat-desc">of Indian families cannot afford current BITS fees</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">₹21.4L</span>
                <span className="stat-desc">average student loan required for 4-year degree</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">8-12 years</span>
                <span className="stat-desc">typical loan repayment period</span>
              </div>
            </div>
          </div>
        </StorySection>

        <StorySection id="numbers-conclusion" className="conclusion-section">
          <div className="conclusion-content">
            <h3>"The Numbers Don't Lie"</h3>
            <p className="conclusion-text">
              When education costs grow 5 times faster than incomes, we don't have a fee 
              increase—we have a systematic exclusion of India's middle class from quality 
              higher education. This isn't just about BITS; it's about the future of 
              accessible excellence in Indian education.
            </p>
            
            <div className="final-stat">
              <div className="final-number">1 in 4</div>
              <div className="final-desc">
                Only 1 in 4 middle-class families can now afford 
                what was accessible to 4 in 4 families in 2007
              </div>
            </div>
          </div>
        </StorySection>
      </div>
    </section>
  );
};

export default StorytellingSection; 