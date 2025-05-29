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
      cost: 150000,
      type: 'emergency' as const
    },
    {
      title: 'Job Loss',
      description: 'Primary earner loses job for 6 months',
      cost: 300000,
      type: 'emergency' as const
    },
    {
      title: 'Home Repairs',
      description: 'Urgent home repairs needed',
      cost: 80000,
      type: 'emergency' as const
    },
    {
      title: 'BITS Fee Hike',
      description: 'Unexpected 15% fee increase mid-year',
      cost: 80000,
      type: 'inflation' as const
    },
    {
      title: 'Scholarship Opportunity',
      description: 'Partial scholarship reduces fees by ₹1L',
      cost: -100000,
      type: 'opportunity' as const
    }
  ], []);

  const currentYearFees = useMemo(() => ({
    1: 535000,
    2: 565000,
    3: 595000,
    4: 625000
  }), []);

  const startGame = () => {
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
  };

  const nextMonth = useCallback(() => {
    if (gameState.gameOver) return;

    const newState = { ...gameState };
    const monthlyExpenses = newState.householdIncome * 0.6 / 12; // 60% of income for living expenses
    
    // Monthly income
    const monthlyIncome = newState.householdIncome / 12;
    newState.totalSavings += monthlyIncome - monthlyExpenses;

    // Check for random events (15% chance each month)
    if (Math.random() < 0.15 && !currentEvent) {
      const event = randomEvents[Math.floor(Math.random() * randomEvents.length)];
      setCurrentEvent(event);
      return; // Don't advance time yet, wait for event resolution
    }

    // Annual tuition payment (in month 6 of each year)
    if (newState.month === 6) {
      const yearlyFee = currentYearFees[newState.year as keyof typeof currentYearFees];
      if (newState.totalSavings >= yearlyFee) {
        newState.totalSavings -= yearlyFee;
        newState.tuitionPaid += yearlyFee;
      } else {
        const loanAmount = yearlyFee - Math.max(0, newState.totalSavings);
        newState.totalDebt += loanAmount * 1.12; // 12% interest
        newState.totalSavings = Math.max(0, newState.totalSavings - yearlyFee);
        newState.tuitionPaid += yearlyFee;
        newState.stress += 20;
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
  }, [gameState, currentEvent, randomEvents, currentYearFees]);

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
                face an impossible choice: sacrifice their financial stability to send their children 
                to premier institutions like BITS Pilani, or watch opportunities slip away.
              </p>
              
              <p>
                This interactive simulation puts you in the shoes of these families. Can you navigate 
                four years of escalating fees, unexpected emergencies, and mounting pressure while 
                keeping your family afloat?
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
            </div>
          </div>

          <div className="game-instructions newspaper-box">
            <h3 className="box-headline">The Challenge Ahead</h3>
            <div className="instructions-grid">
              <div className="instruction-item">
                <strong>💰 Manage Finances:</strong> Balance monthly income against living expenses
              </div>
              <div className="instruction-item">
                <strong>📚 Pay Fees:</strong> Annual tuition ranges from ₹5.35L to ₹6.25L
              </div>
              <div className="instruction-item">
                <strong>⚡ Handle Crises:</strong> Medical emergencies, job loss, unexpected costs
              </div>
              <div className="instruction-item">
                <strong>💳 Consider Loans:</strong> Interest rates will compound your burden
              </div>
              <div className="instruction-item">
                <strong>😰 Watch Stress:</strong> Too much pressure ends the game
              </div>
              <div className="instruction-item">
                <strong>🎯 The Goal:</strong> Graduate with minimal debt and intact family wellbeing
              </div>
            </div>
          </div>

          <div className="game-start-section">
            <button className="newspaper-cta-btn" onClick={startGame}>
              Begin Your BITS Journey
            </button>
            <p className="cta-disclaimer">
              * Based on actual BITS Pilani fee structures and Indian household income data
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
                    <span className="stat-label">Years Needed to Repay:</span>
                    <span className="stat-value">{Math.ceil(gameState.totalDebt / (gameState.householdIncome * 0.2))} years</span>
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