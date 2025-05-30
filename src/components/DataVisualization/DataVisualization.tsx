import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Bar } from 'recharts';
import { bitsFeesData, keyMilestones } from '../../data/bitsData';
import './DataVisualization.css';

const DataVisualization: React.FC = () => {
  const [activeChart, setActiveChart] = useState<'feeVsIncome' | 'affordability' | 'realGrowth'>('feeVsIncome');
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
        <h2 className="section-title">The Financial Reality Exposed</h2>
        <p className="section-subtitle">
          Comprehensive analysis of BITS Pilani fee escalation — devastating numbers for middle-class families
        </p>

        <div className="chart-navigation">
          <button 
            className={`chart-nav-btn ${activeChart === 'feeVsIncome' ? 'active' : ''}`}
            onClick={() => setActiveChart('feeVsIncome')}
          >
            Fee Growth vs Income
          </button>
          <button 
            className={`chart-nav-btn ${activeChart === 'affordability' ? 'active' : ''}`}
            onClick={() => setActiveChart('affordability')}
          >
            Affordability Crisis Index
          </button>
          <button 
            className={`chart-nav-btn ${activeChart === 'realGrowth' ? 'active' : ''}`}
            onClick={() => setActiveChart('realGrowth')}
          >
            Real Fee Growth Analysis
          </button>
        </div>

        <div className="chart-container">
          {activeChart === 'feeVsIncome' && (
            <div className="chart-wrapper">
              <h3 className="chart-title">BITS Fee Escalation vs Median Household Income (The Growing Divide)</h3>
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
              <h3 className="chart-title">The Affordability Crisis: Fees as Percentage of Income (Deepening Inequality)</h3>
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
              <div className="legend">
                <div className="legend-item">
                  <div className="legend-color affordable"></div>
                  <span>Manageable (&lt;30%)</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color difficult"></div>
                  <span>Difficult (30-50%)</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color impossible"></div>
                  <span>Prohibitive (&gt;50%)</span>
                </div>
              </div>
            </div>
          )}

          {activeChart === 'realGrowth' && (
            <div className="chart-wrapper">
              <h3 className="chart-title">Real vs Nominal Fee Growth (Inflation-Adjusted Analysis)</h3>
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

        <div className="income-simulator">
          <h3>Financial Impact Assessment Tool</h3>
          <p>Adjust household income to assess the true burden of BITS fees on Indian families</p>
          
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