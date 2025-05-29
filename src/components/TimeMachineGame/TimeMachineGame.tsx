import React, { useState, useMemo } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import './TimeMachineGame.css';

const TimeMachineGame: React.FC = () => {
  const [currentYear, setCurrentYear] = useState(1998);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedFamily, setSelectedFamily] = useState<'lower' | 'middle' | 'upper'>('middle');

  const historicalData = useMemo(() => [
    { year: 1998, annualFee: 15000, medianIncome: 90000, feePercentage: 16.7, era: 'Foundation Era', keyEvent: 'BITS established as deemed university' },
    { year: 1999, annualFee: 16000, medianIncome: 95000, feePercentage: 16.8, era: 'Foundation Era', keyEvent: 'First batch of computer science' },
    { year: 2000, annualFee: 18000, medianIncome: 100000, feePercentage: 18.0, era: 'Foundation Era', keyEvent: 'Y2K tech boom influence' },
    { year: 2001, annualFee: 20000, medianIncome: 105000, feePercentage: 19.0, era: 'Foundation Era', keyEvent: 'IT industry growth' },
    { year: 2002, annualFee: 22000, medianIncome: 110000, feePercentage: 20.0, era: 'Foundation Era', keyEvent: 'Infrastructure expansion' },
    { year: 2003, annualFee: 25000, medianIncome: 120000, feePercentage: 20.8, era: 'Foundation Era', keyEvent: 'Research programs launch' },
    { year: 2004, annualFee: 28000, medianIncome: 130000, feePercentage: 21.5, era: 'Foundation Era', keyEvent: 'Campus modernization begins' },
    { year: 2005, annualFee: 32000, medianIncome: 140000, feePercentage: 22.9, era: 'Foundation Era', keyEvent: 'International partnerships' },
    { year: 2006, annualFee: 36000, medianIncome: 150000, feePercentage: 24.0, era: 'Foundation Era', keyEvent: 'Pre-restructuring phase' },
    { year: 2007, annualFee: 45000, medianIncome: 160000, feePercentage: 28.1, era: 'Kumar Mangalam Era', keyEvent: 'Major restructuring announced' },
    { year: 2008, annualFee: 80000, medianIncome: 160000, feePercentage: 50.0, era: 'Kumar Mangalam Era', keyEvent: 'Fee structure overhaul (+78%)' },
    { year: 2009, annualFee: 95000, medianIncome: 165000, feePercentage: 57.6, era: 'Kumar Mangalam Era', keyEvent: 'Global financial crisis impact' },
    { year: 2010, annualFee: 110000, medianIncome: 175000, feePercentage: 62.9, era: 'Kumar Mangalam Era', keyEvent: 'Infrastructure investments' },
    { year: 2011, annualFee: 125000, medianIncome: 185000, feePercentage: 67.6, era: 'Kumar Mangalam Era', keyEvent: 'Faculty expansion' },
    { year: 2012, annualFee: 145000, medianIncome: 195000, feePercentage: 74.4, era: 'Kumar Mangalam Era', keyEvent: 'Multi-campus expansion (+16%)' },
    { year: 2013, annualFee: 165000, medianIncome: 210000, feePercentage: 78.6, era: 'Kumar Mangalam Era', keyEvent: 'Goa campus operational' },
    { year: 2014, annualFee: 185000, medianIncome: 225000, feePercentage: 82.2, era: 'Kumar Mangalam Era', keyEvent: 'Hyderabad campus expansion' },
    { year: 2015, annualFee: 205000, medianIncome: 240000, feePercentage: 85.4, era: 'Kumar Mangalam Era', keyEvent: 'International accreditation' },
    { year: 2016, annualFee: 225000, medianIncome: 255000, feePercentage: 88.2, era: 'Kumar Mangalam Era', keyEvent: 'Research excellence push' },
    { year: 2017, annualFee: 250000, medianIncome: 270000, feePercentage: 92.6, era: 'Kumar Mangalam Era', keyEvent: 'Industry collaboration growth' },
    { year: 2018, annualFee: 285000, medianIncome: 285000, feePercentage: 100.0, era: 'Krishna Kumar Era', keyEvent: 'Leadership transition (+14%)' },
    { year: 2019, annualFee: 320000, medianIncome: 300000, feePercentage: 106.7, era: 'Krishna Kumar Era', keyEvent: 'Digital transformation' },
    { year: 2020, annualFee: 365000, medianIncome: 310000, feePercentage: 117.7, era: 'Krishna Kumar Era', keyEvent: 'COVID-19 online pivot (+14%)' },
    { year: 2021, annualFee: 415000, medianIncome: 315000, feePercentage: 131.7, era: 'Krishna Kumar Era', keyEvent: 'Pandemic infrastructure' },
    { year: 2022, annualFee: 465000, medianIncome: 330000, feePercentage: 140.9, era: 'Krishna Kumar Era', keyEvent: 'Post-pandemic recovery' },
    { year: 2023, annualFee: 535000, medianIncome: 350000, feePercentage: 152.9, era: 'Krishna Kumar Era', keyEvent: 'Fee normalization (+15%)' },
    { year: 2024, annualFee: 580000, medianIncome: 370000, feePercentage: 156.8, era: 'Krishna Kumar Era', keyEvent: 'Current academic year' },
    { year: 2025, annualFee: 625000, medianIncome: 400000, feePercentage: 156.3, era: 'Krishna Kumar Era', keyEvent: 'Projected future costs' }
  ], []);

  const familyMultipliers = {
    lower: 0.6,    // 60% of median income
    middle: 1.0,   // Median income
    upper: 1.8     // 180% of median income
  };

  const familyLabels = {
    lower: 'Lower Middle Class (₹2.4L-4.8L)',
    middle: 'Middle Class (₹4L-8L)', 
    upper: 'Upper Middle Class (₹7L-14L)'
  };

  const getCurrentData = () => {
    return historicalData.find(d => d.year === currentYear) || historicalData[0];
  };

  const getAdjustedPercentage = () => {
    const data = getCurrentData();
    const adjustedIncome = data.medianIncome * familyMultipliers[selectedFamily];
    return (data.annualFee / adjustedIncome) * 100;
  };

  const playTimeMachine = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    setCurrentYear(1998);
    
    const interval = setInterval(() => {
      setCurrentYear(prevYear => {
        if (prevYear >= 2025) {
          setIsPlaying(false);
          clearInterval(interval);
          return 2025;
        }
        return prevYear + 1;
      });
    }, 800);
  };

  const resetToYear = (year: number) => {
    setIsPlaying(false);
    setCurrentYear(year);
  };

  const currentData = getCurrentData();
  const adjustedPercentage = getAdjustedPercentage();
  const adjustedIncome = currentData.medianIncome * familyMultipliers[selectedFamily];

  const visibleData = historicalData.filter(d => d.year <= currentYear);

  const getAffordabilityColor = (percentage: number) => {
    if (percentage < 25) return '#2e7d32';  // Affordable - Green
    if (percentage < 50) return '#f57c00';  // Concerning - Orange  
    if (percentage < 100) return '#d32f2f'; // Difficult - Red
    return '#4a148c';                       // Impossible - Purple
  };

  const getAffordabilityLabel = (percentage: number) => {
    if (percentage < 25) return 'Easily Affordable';
    if (percentage < 50) return 'Manageable with Savings';
    if (percentage < 100) return 'Requires Major Sacrifice';
    return 'Nearly Impossible';
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <section id="time-machine" className="time-machine-section">
      <div className="container">
        <div className="newspaper-header">
          <div className="newspaper-date">Interactive Time Machine</div>
          <h2 className="newspaper-headline">Journey Through BITS Fee History</h2>
          <div className="newspaper-subheading">
            Watch 27 Years of Educational Inflation in Real-Time
          </div>
        </div>

        <div className="time-machine-controls">
          <div className="family-selector">
            <h3 className="control-label">Select Your Family Type:</h3>
            <div className="family-options">
              {Object.entries(familyLabels).map(([key, label]) => (
                <button
                  key={key}
                  className={`family-btn ${selectedFamily === key ? 'active' : ''}`}
                  onClick={() => setSelectedFamily(key as 'lower' | 'middle' | 'upper')}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="time-controls">
            <button 
              className={`time-machine-btn ${isPlaying ? 'playing' : ''}`}
              onClick={playTimeMachine}
            >
              {isPlaying ? '⏸️ Pause Time Machine' : '▶️ Start Time Machine'}
            </button>
            
            <div className="year-selector">
              <label htmlFor="year-slider">Jump to Year:</label>
              <input
                id="year-slider"
                type="range"
                min="1998"
                max="2025"
                value={currentYear}
                onChange={(e) => resetToYear(parseInt(e.target.value))}
                className="year-slider"
              />
              <div className="year-labels">
                <span>1998</span>
                <span className="current-year">{currentYear}</span>
                <span>2025</span>
              </div>
            </div>
          </div>
        </div>

        <div className="time-machine-dashboard">
          <div className="current-status">
            <div className="status-header">
              <h3 className="status-year">{currentYear}</h3>
              <div className="status-era">{currentData.era}</div>
            </div>
            
            <div className="status-grid">
              <div className="status-item fee">
                <div className="status-label">Annual BITS Fee</div>
                <div className="status-value">{formatCurrency(currentData.annualFee)}</div>
              </div>
              
              <div className="status-item income">
                <div className="status-label">Your Family Income</div>
                <div className="status-value">{formatCurrency(adjustedIncome)}</div>
              </div>
              
              <div className="status-item percentage">
                <div className="status-label">Fee as % of Income</div>
                <div 
                  className="status-value"
                  style={{ color: getAffordabilityColor(adjustedPercentage) }}
                >
                  {adjustedPercentage.toFixed(1)}%
                </div>
              </div>
              
              <div className="status-item affordability">
                <div className="status-label">Affordability</div>
                <div 
                  className="status-value"
                  style={{ color: getAffordabilityColor(adjustedPercentage) }}
                >
                  {getAffordabilityLabel(adjustedPercentage)}
                </div>
              </div>
            </div>

            <div className="key-event">
              <strong>Key Event:</strong> {currentData.keyEvent}
            </div>
          </div>

          <div className="chart-container">
            <h4 className="chart-title">Historical Progression</h4>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={visibleData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                <XAxis 
                  dataKey="year" 
                  stroke="#333"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  stroke="#333"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  formatter={(value: number) => [`${value.toFixed(1)}%`, 'Fee as % of Income']}
                  labelFormatter={(year) => `Year: ${year}`}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '2px solid #333',
                    borderRadius: '0',
                    fontFamily: 'var(--font-sans)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey={(data) => (data.annualFee / (data.medianIncome * familyMultipliers[selectedFamily])) * 100}
                  stroke="var(--maroon)"
                  fill="var(--maroon)"
                  fillOpacity={0.3}
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="era-timeline">
          <h4 className="timeline-title">BITS Fee Evolution by Era</h4>
          <div className="timeline">
            <div className={`era-period foundation ${currentYear >= 1998 && currentYear <= 2007 ? 'active' : ''}`}>
              <div className="era-header">
                <h5>Foundation Era</h5>
                <span>1998-2007</span>
              </div>
              <div className="era-stats">
                <div>Starting Fee: ₹15,000</div>
                <div>Ending Fee: ₹45,000</div>
                <div>Growth: +200%</div>
              </div>
            </div>
            
            <div className={`era-period kumar-mangalam ${currentYear >= 2008 && currentYear <= 2017 ? 'active' : ''}`}>
              <div className="era-header">
                <h5>Kumar Mangalam Era</h5>
                <span>2008-2017</span>
              </div>
              <div className="era-stats">
                <div>Starting Fee: ₹80,000</div>
                <div>Ending Fee: ₹2,50,000</div>
                <div>Growth: +213%</div>
              </div>
            </div>
            
            <div className={`era-period krishna-kumar ${currentYear >= 2018 ? 'active' : ''}`}>
              <div className="era-header">
                <h5>Krishna Kumar Era</h5>
                <span>2018-Present</span>
              </div>
              <div className="era-stats">
                <div>Starting Fee: ₹2,85,000</div>
                <div>Current Fee: ₹6,25,000</div>
                <div>Growth: +119%</div>
              </div>
            </div>
          </div>
        </div>

        <div className="insights-panel">
          <h4 className="insights-title">Key Insights from the Time Machine</h4>
          <div className="insights-grid">
            <div className="insight-card">
              <div className="insight-number">4,067%</div>
              <div className="insight-label">Total fee increase since 1998</div>
            </div>
            <div className="insight-card">
              <div className="insight-number">344%</div>
              <div className="insight-label">Median income increase since 1998</div>
            </div>
            <div className="insight-card">
              <div className="insight-number">2008</div>
              <div className="insight-label">Year when fees became unaffordable for most families</div>
            </div>
            <div className="insight-card">
              <div className="insight-number">156%</div>
              <div className="insight-label">Current fee as % of median family income</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimeMachineGame; 