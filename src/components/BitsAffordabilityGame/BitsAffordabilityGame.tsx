import React, { useState, useCallback, useMemo } from 'react';
import './BitsAffordabilityGame.css';

interface GameState {
  year: number;
  month: number;
  householdIncome: number;
  totalSavings: number;
  totalDebt: number;
  tuitionPaid: number;
  emergencyFund: number;
  stress: number;
  hasGraduated: boolean;
  gameOver: boolean;
}

interface RandomEvent {
  title: string;
  description: string;
  cost: number;
  type: 'emergency' | 'opportunity' | 'inflation';
}

const BitsAffordabilityGame: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState(800000);
  const [feeIncreasePercentage, setFeeIncreasePercentage] = useState(10);
  const [suExpenses, setSuExpenses] = useState(10000);
  const [gameState, setGameState] = useState<GameState>({
    year: 1,
    month: 1,
    householdIncome: 800000,
    totalSavings: 100000,
    totalDebt: 0,
    tuitionPaid: 0,
    emergencyFund: 50000,
    stress: 0,
    hasGraduated: false,
    gameOver: false
  });
  
  const [currentEvent, setCurrentEvent] = useState<RandomEvent | null>(null);
  const [showResults, setShowResults] = useState(false);

  const incomeOptions = useMemo(() => [
    { value: 400000, label: '₹4 LPA - Lower Middle Class', description: 'Teacher/Clerk family' },
    { value: 600000, label: '₹6 LPA - Middle Class', description: 'Engineer/Manager family' },
    { value: 800000, label: '₹8 LPA - Upper Middle Class', description: 'Senior professional family' },
    { value: 1200000, label: '₹12 LPA - Affluent', description: 'Business/Senior executive family' }
  ], []);

  const randomEvents = useMemo(() => [
    {
      title: 'Medical Emergency',
      description: 'Family member needs urgent medical treatment',
      cost: Math.floor(Math.random() * 100000) + 100000, // ₹1L to ₹2L
      type: 'emergency' as const
    },
    {
      title: 'Job Loss',
      description: 'Primary earner loses job for 6 months',
      cost: Math.floor(Math.random() * 200000) + 250000, // ₹2.5L to ₹4.5L
      type: 'emergency' as const
    },
    {
      title: 'Home Repairs',
      description: 'Urgent home repairs needed',
      cost: Math.floor(Math.random() * 50000) + 50000, // ₹50K to ₹1L
      type: 'emergency' as const
    },
    {
      title: 'BITS Fee Hike',
      description: 'Unexpected mid-year fee increase',
      cost: Math.floor(Math.random() * 50000) + 30000, // ₹30K to ₹80K
      type: 'inflation' as const
    },
    {
      title: 'Scholarship Opportunity',
      description: 'Partial scholarship reduces semester fees',
      cost: -(Math.floor(Math.random() * 50000) + 50000), // -₹50K to -₹1L
      type: 'opportunity' as const
    },
    {
      title: 'Laptop Replacement',
      description: 'Student laptop needs replacement',
      cost: Math.floor(Math.random() * 30000) + 40000, // ₹40K to ₹70K
      type: 'emergency' as const
    },
    {
      title: 'Family Wedding',
      description: 'Unexpected family wedding expenses',
      cost: Math.floor(Math.random() * 80000) + 70000, // ₹70K to ₹1.5L
      type: 'emergency' as const
    }
  ], []);

  const currentYearFees = useMemo(() => {
    // Calculate current semester fee based on year and fee increase
    const getCurrentSemesterFee = (year: number) => {
      const baseFee = 306000; // ₹3,06,000 for first year
      const increaseMultiplier = Math.pow(1 + (feeIncreasePercentage / 100), year - 1);
      return Math.round(baseFee * increaseMultiplier);
    };
    
    const fees: { [key: number]: number } = {};
    for (let year = 1; year <= 4; year++) {
      fees[year] = getCurrentSemesterFee(year);
    }
    return fees;
  }, [feeIncreasePercentage]);

  const startGame = () => {
    console.log('Starting game with income:', selectedIncome);
    setGameState({
      year: 1,
      month: 1,
      householdIncome: selectedIncome,
      totalSavings: selectedIncome * 0.15, // 15% of annual income as starting savings
      totalDebt: 0,
      tuitionPaid: 0,
      emergencyFund: selectedIncome * 0.05, // 5% as emergency fund
      stress: 0,
      hasGraduated: false,
      gameOver: false
    });
    setGameStarted(true);
    setCurrentEvent(null);
    setShowResults(false);
    console.log('Game started, gameStarted set to true');
  };

  const nextMonth = useCallback(() => {
    if (gameState.gameOver) return;

    const newState = { ...gameState };
    const monthlyExpenses = newState.householdIncome * 0.6 / 12; // 60% of income for living expenses
    
    // Monthly income
    const monthlyIncome = newState.householdIncome / 12;
    newState.totalSavings += monthlyIncome - monthlyExpenses;

    // Check for random events (12% chance each month)
    if (Math.random() < 0.12 && !currentEvent) {
      const event = randomEvents[Math.floor(Math.random() * randomEvents.length)];
      setCurrentEvent(event);
      return; // Don't advance time yet, wait for event resolution
    }

    // Semester-based tuition payment (in months 1 and 7 of each year)
    const isSemesterStart = newState.month === 1 || newState.month === 7;
    if (isSemesterStart) {
      const semesterFee = currentYearFees[newState.year as keyof typeof currentYearFees];
      const totalSemesterCost = semesterFee + suExpenses; // Add SU expenses
      
      if (newState.totalSavings >= totalSemesterCost) {
        newState.totalSavings -= totalSemesterCost;
        newState.tuitionPaid += semesterFee;
      } else {
        const loanAmount = totalSemesterCost - Math.max(0, newState.totalSavings);
        newState.totalDebt += loanAmount * 1.12; // 12% interest
        newState.totalSavings = Math.max(0, newState.totalSavings - totalSemesterCost);
        newState.tuitionPaid += semesterFee;
        newState.stress += 25; // Higher stress for semester-based payments
      }
    }

    // Calculate stress
    const debtRatio = newState.totalDebt / newState.householdIncome;
    newState.stress = Math.min(100, Math.max(0, debtRatio * 100 + (newState.totalSavings < 0 ? 30 : 0)));

    // Advance time
    newState.month++;
    if (newState.month > 12) {
      newState.month = 1;
      newState.year++;
    }

    // Check game end conditions
    if (newState.year > 4) {
      newState.hasGraduated = true;
      newState.gameOver = true;
      setShowResults(true);
    } else if (newState.stress >= 100) {
      newState.gameOver = true;
      setShowResults(true);
    }

    setGameState(newState);
  }, [gameState, currentEvent, randomEvents, currentYearFees, suExpenses]);

  const handleEventChoice = (takeAction: boolean) => {
    if (!currentEvent) return;

    const newState = { ...gameState };
    
    if (takeAction) {
      if (currentEvent.cost > 0) {
        // Pay for emergency/expense
        if (newState.totalSavings >= currentEvent.cost) {
          newState.totalSavings -= currentEvent.cost;
        } else {
          const loanAmount = currentEvent.cost - Math.max(0, newState.totalSavings);
          newState.totalDebt += loanAmount * 1.15; // 15% interest for emergency loans
          newState.totalSavings = Math.max(0, newState.totalSavings - currentEvent.cost);
          newState.stress += 15;
        }
      } else {
        // Take advantage of opportunity
        newState.totalSavings += Math.abs(currentEvent.cost);
        newState.stress = Math.max(0, newState.stress - 10);
      }
    } else {
      // Skip action - consequences
      if (currentEvent.type === 'emergency') {
        newState.stress += 25;
      }
    }

    // Recalculate stress after event
    const debtRatio = newState.totalDebt / newState.householdIncome;
    newState.stress = Math.min(100, Math.max(0, debtRatio * 100 + (newState.totalSavings < 0 ? 30 : 0)));

    setGameState(newState);
    setCurrentEvent(null);
    
    // Continue with normal month progression after event is handled
    setTimeout(() => {
      nextMonthAfterEvent(newState);
    }, 100);
  };

  const nextMonthAfterEvent = (currentState: GameState) => {
    if (currentState.gameOver) return;

    const newState = { ...currentState };
    
    // Advance time
    newState.month++;
    if (newState.month > 12) {
      newState.month = 1;
      newState.year++;
    }

    // Check game end conditions
    if (newState.year > 4) {
      newState.hasGraduated = true;
      newState.gameOver = true;
      setShowResults(true);
    } else if (newState.stress >= 100) {
      newState.gameOver = true;
      setShowResults(true);
    }

    setGameState(newState);
  };

  const resetGame = () => {
    setGameStarted(false);
    setShowResults(false);
    setCurrentEvent(null);
  };

  const getStressColor = (stress: number) => {
    if (stress < 30) return '#4caf50';
    if (stress < 60) return '#ff9800';
    return '#f44336';
  };

  const getResultMessage = () => {
    if (gameState.hasGraduated && gameState.totalDebt === 0) {
      return '🎉 Congratulations! You graduated debt-free!';
    } else if (gameState.hasGraduated) {
      return `🎓 Graduated with ₹${gameState.totalDebt.toLocaleString('en-IN')} debt`;
    } else {
      return '😰 The financial stress became too much to handle';
    }
  };

  console.log('Component render - gameStarted:', gameStarted, 'selectedIncome:', selectedIncome);

  if (!gameStarted) {
    return (
      <section id="game" className="game-section">
        <div className="container">
          <div className="newspaper-header">
            <div className="newspaper-date">Interactive Investigation</div>
            <h2 className="newspaper-headline">Can Your Family Afford BITS?</h2>
            <div className="newspaper-subheading">
              A Financial Reality Simulation Based on Real Data
            </div>
          </div>

          <div className="newspaper-columns">
            <div className="game-intro-text">
              <p className="lead-paragraph">
                <span className="dropcap">E</span>very year, thousands of middle-class Indian families 
                face a serious BT: sacrifice their financial stability to send their children 
                to premier institutions like BITS Pilani, or watch opportunities slip away.
                This definitely isn't something you can take lite.
              </p>
              
              <p>
                This interactive simulation puts you in the shoes of these families. Can you navigate 
                four years of escalating fees, unexpected emergencies, and mounting pressure while 
                keeping your family afloat? Time to see if you can get this financial BT sorted!
              </p>
            </div>

            <div className="income-selection">
              <h3 className="section-headline">Choose Your Family's Financial Profile</h3>
              <div className="income-options">
                {incomeOptions.map(option => (
                  <div
                    key={option.value}
                    className={`income-option ${selectedIncome === option.value ? 'selected' : ''}`}
                    onClick={() => setSelectedIncome(option.value)}
                  >
                    <div className="income-label">{option.label}</div>
                    <div className="income-description">{option.description}</div>
                  </div>
                ))}
              </div>
              
              <div className="fee-configuration">
                <h4 className="config-subtitle">Fee Structure Configuration</h4>
                <div className="config-options">
                  <div className="config-item">
                    <label htmlFor="fee-increase">Annual Fee Increase (%)</label>
                    <input 
                      id="fee-increase"
                      type="number" 
                      value={feeIncreasePercentage} 
                      onChange={(e) => setFeeIncreasePercentage(Number(e.target.value))}
                      min="0" 
                      max="25"
                      className="config-input"
                    />
                    <small className="config-hint">Default: 10% (based on BITS historical data)</small>
                  </div>
                  
                  <div className="config-item">
                    <label htmlFor="su-expenses">SU Expenses per Semester (₹)</label>
                    <input 
                      id="su-expenses"
                      type="number" 
                      value={suExpenses} 
                      onChange={(e) => setSuExpenses(Number(e.target.value))}
                      min="0" 
                      max="50000"
                      step="1000"
                      className="config-input"
                    />
                    <small className="config-hint">Student Union, activities, misc. fees</small>
                  </div>
                </div>
                
                <div className="fee-preview">
                  <h5>Fee Preview (Semester-wise):</h5>
                  <div className="fee-breakdown">
                    {[1,2,3,4].map(year => (
                      <div key={year} className="year-fee">
                        <span>Year {year}:</span>
                        <span>₹{currentYearFees[year].toLocaleString('en-IN')} + ₹{suExpenses.toLocaleString('en-IN')} SU = ₹{(currentYearFees[year] + suExpenses).toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="game-instructions newspaper-box">
            <h3 className="box-headline">The BT Challenge Ahead</h3>
            <div className="instructions-grid">
              <div className="instruction-item">
                <strong>💰 Manage Finances:</strong> Balance monthly income against living expenses (can't take it lite!)
              </div>
              <div className="instruction-item">
                <strong>📚 Pay Fees:</strong> Semester fees start at ₹3.16L, increasing {feeIncreasePercentage}% annually (major BT!)
              </div>
              <div className="instruction-item">
                <strong>🏫 SU Expenses:</strong> ₹{(suExpenses/1000).toFixed(0)}K additional per semester for activities (not so lite extras)
              </div>
              <div className="instruction-item">
                <strong>⚡ Handle Crises:</strong> Medical emergencies, job loss, unexpected costs (serious BT moments)
              </div>
              <div className="instruction-item">
                <strong>💳 Consider Loans:</strong> Interest rates will compound your burden (BT gets worse)
              </div>
              <div className="instruction-item">
                <strong>😰 Watch Stress:</strong> Too much pressure ends the game (can't handle the BT)
              </div>
              <div className="instruction-item">
                <strong>🎯 The Goal:</strong> Graduate with minimal debt and get this BT sorted
              </div>
              <div className="instruction-item">
                <strong>📅 Payment Schedule:</strong> Fees due twice yearly (January & July) - no taking it lite here!
              </div>
            </div>
          </div>

          <div className="game-start-section">
            <button 
              className="newspaper-cta-btn" 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Button clicked!');
                startGame();
              }}
              type="button"
            >
              Begin Your BITS BT Journey
            </button>
            
            <p className="cta-disclaimer">
              * Based on actual BITS Pilani fee structures and Indian household income data. Not lite at all!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="game" className="game-section playing">
      <div className="container">
        <div className="game-dashboard">
          <div className="newspaper-game-header">
            <div className="game-date">Year {gameState.year} • Month {gameState.month}</div>
            <h2 className="game-headline">The BITS Family Budget Crisis</h2>
            <div className="progress-indicator">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${((gameState.year - 1) * 12 + gameState.month) / 48 * 100}%` }}
                ></div>
              </div>
              <span className="progress-text">
                {Math.round(((gameState.year - 1) * 12 + gameState.month) / 48 * 100)}% Complete
              </span>
            </div>
          </div>

          <div className="stats-newspaper">
            <div className="stat-column savings">
              <div className="stat-headline">Family Savings</div>
              <div className="stat-figure">₹{gameState.totalSavings.toLocaleString('en-IN')}</div>
            </div>
            
            <div className="stat-column debt">
              <div className="stat-headline">Outstanding Debt</div>
              <div className="stat-figure debt-amount">₹{gameState.totalDebt.toLocaleString('en-IN')}</div>
            </div>
            
            <div className="stat-column tuition">
              <div className="stat-headline">Tuition Paid</div>
              <div className="stat-figure">₹{gameState.tuitionPaid.toLocaleString('en-IN')}</div>
            </div>
            
            <div className="stat-column stress">
              <div className="stat-headline">Family Stress Level</div>
              <div 
                className="stat-figure stress-meter"
                style={{ color: getStressColor(gameState.stress) }}
              >
                {gameState.stress.toFixed(0)}%
              </div>
            </div>
          </div>

          {/* Monthly Financial Breakdown */}
          <div className="financial-breakdown newspaper-box">
            <h3 className="box-headline">Monthly Financial Breakdown</h3>
            <div className="breakdown-grid">
              <div className="breakdown-item income">
                <div className="breakdown-label">📊 Monthly Income</div>
                <div className="breakdown-value positive">+₹{(gameState.householdIncome / 12).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
              </div>
              
              <div className="breakdown-item expenses">
                <div className="breakdown-label">🏠 Living Expenses (60%)</div>
                <div className="breakdown-value negative">-₹{(gameState.householdIncome * 0.6 / 12).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
              </div>
              
              <div className="breakdown-item net">
                <div className="breakdown-label">💰 Net Monthly Savings</div>
                <div className="breakdown-value positive">+₹{(gameState.householdIncome * 0.4 / 12).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
              </div>
              
              {(gameState.month === 1 || gameState.month === 7) && (
                <>
                  <div className="breakdown-item tuition-due">
                    <div className="breakdown-label">🎓 Semester Tuition Due</div>
                    <div className="breakdown-value tuition">₹{currentYearFees[gameState.year as keyof typeof currentYearFees].toLocaleString('en-IN')}</div>
                  </div>
                  
                  <div className="breakdown-item su-due">
                    <div className="breakdown-label">🏫 SU Expenses Due</div>
                    <div className="breakdown-value su-expenses">₹{suExpenses.toLocaleString('en-IN')}</div>
                  </div>
                  
                  <div className="breakdown-item total-due">
                    <div className="breakdown-label">💸 Total Semester Cost</div>
                    <div className="breakdown-value total-cost">₹{(currentYearFees[gameState.year as keyof typeof currentYearFees] + suExpenses).toLocaleString('en-IN')}</div>
                  </div>
                </>
              )}
              
              {gameState.totalDebt > 0 && (
                <div className="breakdown-item interest">
                  <div className="breakdown-label">📈 Annual Interest on Debt</div>
                  <div className="breakdown-value negative">₹{(gameState.totalDebt * 0.12).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
                </div>
              )}
            </div>
            
            <div className="affordability-meter">
              <div className="meter-label">Current Semester Affordability:</div>
              <div className="meter-bar">
                <div 
                  className="meter-fill"
                  style={{ 
                    width: `${Math.min(100, (gameState.totalSavings / (currentYearFees[gameState.year as keyof typeof currentYearFees] + suExpenses)) * 100)}%`,
                    backgroundColor: gameState.totalSavings >= (currentYearFees[gameState.year as keyof typeof currentYearFees] + suExpenses) ? '#4caf50' : '#f44336'
                  }}
                ></div>
              </div>
              <div className="meter-text">
                {gameState.totalSavings >= (currentYearFees[gameState.year as keyof typeof currentYearFees] + suExpenses) ? 
                  '✅ Can afford this semester\'s costs' : 
                  `❌ Need ₹${((currentYearFees[gameState.year as keyof typeof currentYearFees] + suExpenses) - gameState.totalSavings).toLocaleString('en-IN')} more or loan required`
                }
              </div>
            </div>
          </div>

          {!gameState.gameOver && !currentEvent && (
            <div className="game-controls">
              <button className="next-month-btn" onClick={nextMonth}>
                Continue to Next Month →
              </button>
              <p className="control-hint">Advance through your BITS journey month by month</p>
            </div>
          )}

          {currentEvent && (
            <div className="event-popup">
              <div className="event-content newspaper-style">
                <div className="event-header">
                  <h3 className="event-headline">{currentEvent.title}</h3>
                  <div className="event-breaking">BREAKING</div>
                </div>
                <p className="event-story">{currentEvent.description}</p>
                <div className="event-cost-box">
                  <strong>Financial Impact:</strong>
                  {currentEvent.cost > 0 ? 
                    ` ₹${currentEvent.cost.toLocaleString('en-IN')} required` :
                    ` ₹${Math.abs(currentEvent.cost).toLocaleString('en-IN')} benefit`
                  }
                </div>
                <div className="event-actions">
                  <button 
                    className="event-btn accept"
                    onClick={() => handleEventChoice(true)}
                  >
                    {currentEvent.cost > 0 ? 'Pay/Take Loan' : 'Accept Benefit'}
                  </button>
                  <button 
                    className="event-btn decline"
                    onClick={() => handleEventChoice(false)}
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          )}

          {showResults && (
            <div className="results-popup">
              <div className="results-content newspaper-style">
                <div className="results-header">
                  <h2 className="final-headline">The Final Verdict</h2>
                  <div className="results-date">After 4 Years at BITS Pilani</div>
                </div>
                
                <div className="result-story">
                  <p className="result-lead">{getResultMessage()}</p>
                </div>
                
                <div className="final-stats-table">
                  <div className="stats-row">
                    <span className="stat-label">Total Educational Debt:</span>
                    <span className="stat-value">₹{gameState.totalDebt.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="stats-row">
                    <span className="stat-label">Total Tuition Paid:</span>
                    <span className="stat-value">₹{gameState.tuitionPaid.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="stats-row">
                    <span className="stat-label">Total SU Expenses:</span>
                    <span className="stat-value">₹{(suExpenses * 8).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="stats-row">
                    <span className="stat-label">Total Educational Cost:</span>
                    <span className="stat-value">₹{(gameState.tuitionPaid + (suExpenses * 8)).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="stats-row">
                    <span className="stat-label">Years Needed to Repay:</span>
                    <span className="stat-value">{gameState.totalDebt > 0 ? Math.ceil(gameState.totalDebt / (gameState.householdIncome * 0.2)) : 0} years</span>
                  </div>
                  <div className="stats-row highlight">
                    <span className="stat-label">Debt as % of Annual Income:</span>
                    <span className="stat-value">{((gameState.totalDebt / gameState.householdIncome) * 100).toFixed(1)}%</span>
                  </div>
                </div>

                <div className="result-actions">
                  <button className="result-btn secondary" onClick={resetGame}>
                    Try Different Income Level
                  </button>
                  <button className="result-btn primary" onClick={startGame}>
                    Play Again
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BitsAffordabilityGame; 