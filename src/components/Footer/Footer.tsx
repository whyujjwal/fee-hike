import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About This Investigation</h3>
            <p>
              This investigation was conducted using publicly available data from 
              BITS Pilani official sources, government statistics, and economic surveys. 
              The fee BT is real - our methodology ensures you can't take these findings lite.
            </p>
          </div>

          <div className="footer-section">
            <h3>Data Sources</h3>
            <ul className="sources-list">
              <li>BITS Pilani Official Fee Structures (2007-2024)</li>
              <li>National Sample Survey Office (NSSO)</li>
              <li>Reserve Bank of India Economic Surveys</li>
              <li>Ministry of Statistics & Programme Implementation</li>
              <li>All India Survey on Higher Education (AISHE)</li>
              <li>Consumer Price Index Data (CPI)</li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact & Follow</h3>
            <div className="contact-info">
              <p>For questions, corrections, or additional data:</p>
              <a href="mailto:fee-hike@proton.me" className="footer-link">
                ✉️ fee-hike@proton.me
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Disclaimer</h3>
            <p className="disclaimer">
              All data presented here is based on publicly available sources and 
              has been analyzed for accuracy. This investigation is conducted in 
              the public interest and does not represent any institutional affiliation.
            </p>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <div className="copyright">
            <p>
              © {currentYear} Fee Hike Investigation. 
              Made with ❤️ for educational transparency in India.
            </p>
          </div>
          
          <div className="footer-meta">
            <span className="last-updated">
              Last Updated: {new Date().toLocaleDateString('en-IN')}
            </span>
            <span className="version">v1.0</span>
          </div>
        </div>

        <div className="footer-cta">
          <div className="final-message">
            <h4>Education Should Be Lite, Not a Financial BT</h4>
            <p>
              Help us continue investigating educational affordability across India. 
              This BT won't get sorted on its own - together, we can ensure quality education 
              remains within reach of all families, not just those who can afford to take it lite.
            </p>
            <button className="footer-cta-button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              ↑ Back to Top (Get This Sorted!)
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 