import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Bar } from 'recharts';
import { bitsFeesData, keyMilestones } from '../../data/bitsData';
import './DataVisualization.css';

const DataVisualization: React.FC = () => {
  const [activeChart, setActiveChart] = useState<'fees' | 'affordability' | 'real'>('fees');
  const [incomeSlider, setIncomeSlider] = useState(500000);

  const formatCurrency = (value: number) => `₹${(value / 1000).toFixed(0)}K`;
  
  const formatPercentage = (value: number) => `${value.toFixed(1)}%`;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{`Year: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey === 'tuitionFee' ? 'Tuition Fee' : 
                 entry.dataKey === 'medianHouseholdIncome' ? 'Median Income' : 
                 entry.dataKey === 'affordabilityIndex' ? 'Affordability Index' :
                 entry.dataKey === 'realTuitionFee' ? 'Real Tuition (2024₹)' : entry.dataKey}: 
                ${entry.dataKey.includes('Fee') || entry.dataKey.includes('Income') ? 
                  formatCurrency(entry.value) : formatPercentage(entry.value)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const getAffordabilityColor = (value: number) => {
    if (value < 30) return '#34a853';
    if (value < 50) return '#fbbc04';
    return '#ea4335';
  };

  const calculateAffordability = (year: number, income: number) => {
    const yearData = bitsFeesData.find(d => d.year === year);
    return yearData ? (yearData.tuitionFee / income) * 100 : 0;
  };

  return (
    <section id="data" className="data-section section-padding">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">The Data Tells the Story</h2>
          <p className="section-subtitle">
            Interactive analysis of BITS Pilani fee growth compared to Indian household incomes
          </p>
        </div>

        <div className="chart-controls">
          <div className="chart-tabs">
            <button 
              className={`chart-tab ${activeChart === 'fees' ? 'active' : ''}`}
              onClick={() => setActiveChart('fees')}
            >
              Fee vs Income Growth
            </button>
            <button 
              className={`chart-tab ${activeChart === 'affordability' ? 'active' : ''}`}
              onClick={() => setActiveChart('affordability')}
            >
              Affordability Index
            </button>
            <button 
              className={`chart-tab ${activeChart === 'real' ? 'active' : ''}`}
              onClick={() => setActiveChart('real')}
            >
              Real vs Nominal Fees
            </button>
          </div>
        </div>

        <div className="chart-container">
          {activeChart === 'fees' && (
            <div className="chart-wrapper">
              <h3 className="chart-title">BITS Tuition vs Median Household Income</h3>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={bitsFeesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="year" stroke="#666" />
                  <YAxis stroke="#666" tickFormatter={formatCurrency} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="medianHouseholdIncome" fill="#1f77b4" name="Median Household Income" opacity={0.7} />
                  <Line type="monotone" dataKey="tuitionFee" stroke="#cc4125" strokeWidth={4} name="BITS Tuition Fee" />
                </ComposedChart>
              </ResponsiveContainer>
              <div className="chart-annotations">
                {keyMilestones.map(milestone => (
                  <div key={milestone.year} className="milestone">
                    <span className="milestone-year">{milestone.year}</span>
                    <span className="milestone-event">{milestone.event}</span>
                    <span className="milestone-increase">+{milestone.feeIncrease}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeChart === 'affordability' && (
            <div className="chart-wrapper">
              <h3 className="chart-title">Affordability Crisis: Fees as % of Income</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={bitsFeesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="year" stroke="#666" />
                  <YAxis stroke="#666" tickFormatter={formatPercentage} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="affordabilityIndex" 
                    stroke="#cc4125" 
                    strokeWidth={4} 
                    name="Affordability Index (%)"
                    dot={{ fill: '#cc4125', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="affordability-legend">
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: '#34a853' }}></div>
                  <span>Affordable (&lt;30%)</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: '#fbbc04' }}></div>
                  <span>Challenging (30-50%)</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: '#ea4335' }}></div>
                  <span>Unaffordable (&gt;50%)</span>
                </div>
              </div>
            </div>
          )}

          {activeChart === 'real' && (
            <div className="chart-wrapper">
              <h3 className="chart-title">Real vs Nominal Fee Growth (Inflation-Adjusted)</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={bitsFeesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="year" stroke="#666" />
                  <YAxis stroke="#666" tickFormatter={formatCurrency} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey="tuitionFee" stroke="#cc4125" strokeWidth={3} name="Nominal Fee" />
                  <Line type="monotone" dataKey="realTuitionFee" stroke="#1f77b4" strokeWidth={3} name="Real Fee (2024₹)" strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className="interactive-simulation">
          <div className="simulation-header">
            <h3>Your Household Affordability Simulation</h3>
            <p>Slide to see how BITS fees impact different income levels</p>
          </div>
          
          <div className="income-slider">
            <label htmlFor="income-range">Annual Household Income: ₹{incomeSlider.toLocaleString('en-IN')}</label>
            <input 
              id="income-range"
              type="range" 
              min="200000" 
              max="2000000" 
              step="50000"
              value={incomeSlider}
              onChange={(e) => setIncomeSlider(parseInt(e.target.value))}
              className="slider"
            />
          </div>

          <div className="affordability-results">
            <div className="year-comparison">
              <div className="year-card">
                <h4>2007</h4>
                <div className="affordability-bar">
                  <div 
                    className="affordability-fill"
                    style={{ 
                      width: `${Math.min(calculateAffordability(2007, incomeSlider), 100)}%`,
                      backgroundColor: getAffordabilityColor(calculateAffordability(2007, incomeSlider))
                    }}
                  ></div>
                </div>
                <span className="affordability-percentage">
                  {calculateAffordability(2007, incomeSlider).toFixed(1)}% of income
                </span>
              </div>
              
              <div className="year-card">
                <h4>2024</h4>
                <div className="affordability-bar">
                  <div 
                    className="affordability-fill"
                    style={{ 
                      width: `${Math.min(calculateAffordability(2024, incomeSlider), 100)}%`,
                      backgroundColor: getAffordabilityColor(calculateAffordability(2024, incomeSlider))
                    }}
                  ></div>
                </div>
                <span className="affordability-percentage">
                  {calculateAffordability(2024, incomeSlider).toFixed(1)}% of income
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataVisualization; 