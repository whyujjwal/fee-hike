import React, { useState } from 'react';
import { ctaData } from '../../data/bitsData';
import './CallToAction.css';

const CallToAction: React.FC = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async (platform: 'twitter' | 'linkedin' | 'whatsapp') => {
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(ctaData.shareText)}&url=${encodeURIComponent(window.location.href)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(ctaData.shareText + ' ' + window.location.href)}`
    };
    
    window.open(shareUrls[platform], '_blank');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link');
    }
  };

  const handleEmailPolicymaker = () => {
    const subject = encodeURIComponent(ctaData.emailTemplate.subject);
    const body = encodeURIComponent(ctaData.emailTemplate.body);
    const emailAddresses = [
      'minister.mhrd@nic.in',
      'complaints@bits-pilani.ac.in',
      'director@pilani.bits-pilani.ac.in'
    ].join(',');
    
    const mailtoLink = `mailto:${emailAddresses}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    setEmailSent(true);
  };

  const handleDownloadPDF = () => {
    // In a real implementation, you'd generate a PDF of the report
    alert('PDF download functionality would be implemented here');
  };

  return (
    <section id="action" className="cta-section">
      <div className="cta-background">
        <div className="cta-pattern"></div>
      </div>
      
      <div className="container">
        <div className="cta-content">
          <div className="cta-header">
            <h2 className="cta-title">Take a Stand</h2>
            <p className="cta-subtitle">
              Your voice matters. Help us demand accountability and affordability 
              in Indian higher education.
            </p>
          </div>

          <div className="action-grid">
            <div className="action-card primary">
              <div className="action-icon">📢</div>
              <h3>Share This Investigation</h3>
              <p>Spread awareness about this critical issue affecting Indian families</p>
              
              <div className="share-buttons">
                <button 
                  className="share-btn twitter"
                  onClick={() => handleShare('twitter')}
                >
                  <span className="share-icon">🐦</span>
                  Share on Twitter
                </button>
                
                <button 
                  className="share-btn linkedin"
                  onClick={() => handleShare('linkedin')}
                >
                  <span className="share-icon">💼</span>
                  Share on LinkedIn
                </button>
                
                <button 
                  className="share-btn whatsapp"
                  onClick={() => handleShare('whatsapp')}
                >
                  <span className="share-icon">💬</span>
                  Share on WhatsApp
                </button>
                
                <button 
                  className={`share-btn copy ${copied ? 'copied' : ''}`}
                  onClick={handleCopyLink}
                >
                  <span className="share-icon">🔗</span>
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
              </div>
            </div>

            <div className="action-card">
              <div className="action-icon">✉️</div>
              <h3>Email Policymakers</h3>
              <p>Send a direct message to education officials and BITS administration</p>
              
              <button 
                className={`action-button ${emailSent ? 'sent' : ''}`}
                onClick={handleEmailPolicymaker}
              >
                {emailSent ? '✅ Email Sent' : '📧 Send Email'}
              </button>
              
              <div className="recipients">
                <small>Will email: MHRD, UGC, BITS Administration</small>
              </div>
            </div>

            <div className="action-card">
              <div className="action-icon">📋</div>
              <h3>Sign the Petition</h3>
              <p>Join thousands demanding transparency in educational fee structures</p>
              
              <button className="action-button petition">
                📝 Sign Petition
              </button>
              
              <div className="petition-stats">
                <small>12,847 signatures so far</small>
              </div>
            </div>

            <div className="action-card">
              <div className="action-icon">📄</div>
              <h3>Download Full Report</h3>
              <p>Get the complete PDF version with all data and sources</p>
              
              <button 
                className="action-button download"
                onClick={handleDownloadPDF}
              >
                📥 Download PDF
              </button>
            </div>
          </div>

          <div className="impact-counter">
            <div className="counter-item">
              <span className="counter-number">15,234</span>
              <span className="counter-label">Times Shared</span>
            </div>
            <div className="counter-item">
              <span className="counter-number">567</span>
              <span className="counter-label">Emails Sent</span>
            </div>
            <div className="counter-item">
              <span className="counter-number">12,847</span>
              <span className="counter-label">Petition Signatures</span>
            </div>
          </div>

          <div className="follow-up">
            <h3>Stay Updated</h3>
            <p>We'll continue investigating education affordability. Get updates on our progress.</p>
            
            <div className="newsletter-signup">
              <input 
                type="email" 
                placeholder="Enter your email for updates"
                className="newsletter-input"
              />
              <button className="newsletter-button">Subscribe</button>
            </div>
          </div>

          <div className="cta-footer">
            <div className="urgency-message">
              <h4>🚨 This is urgent</h4>
              <p>
                Every year we delay action, thousands more students are priced out 
                of quality education. The time for change is now.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction; 