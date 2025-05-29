import React, { useState, useCallback } from 'react';
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

  const incomeOptions = [
    { value: 400000, label: '₹4 LPA - Lower Middle Class', description: 'Teacher/Clerk family' },
    { value: 600000, label: '₹6 LPA - Middle Class', description: 'Engineer/Manager family' },
    { value: 800000, label: '₹8 LPA - Upper Middle Class', description: 'Senior professional family' },
    { value: 1200000, label: '₹12 LPA - Affluent', description: 'Business/Senior executive family' }
  ];

  const randomEvents: RandomEvent[] = [
    {
      title: 'Medical Emergency',
      description: 'Family member needs urgent medical treatment',
      cost: 150000,
      type: 'emergency'
    },
    {
      title: 'Job Loss',
      description: 'Primary earner loses job for 6 months',
      cost: 300000,
      type: 'emergency'
    },
    {
      title: 'Home Repairs',
      description: 'Urgent home repairs needed',
      cost: 80000,
      type: 'emergency'
    },
    {
      title: 'BITS Fee Hike',
      description: 'Unexpected 15% fee increase mid-year',
      cost: 80000,
      type: 'inflation'
    },
    {
      title: 'Scholarship Opportunity',
      description: 'Partial scholarship reduces fees by ₹1L',
      cost: -100000,
      type: 'opportunity'
    }
  ];

  const currentYearFees = {
    1: 535000,
    2: 565000,
    3: 595000,
    4: 625000
  };

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
      return;
    }

    // Annual tuition payment (in month 6 of each year)
    if (newState.month === 6) {
      const yearlyFee = currentYearFees[newState.year as keyof typeof currentYearFees];
      if (newState.totalSavings >= yearlyFee) {
        newState.totalSavings -= yearlyFee;
        newState.tuitionPaid += yearlyFee;
      } else {
        const loanAmount = yearlyFee - newState.totalSavings;
        newState.totalDebt += loanAmount * 1.12; // 12% interest
        newState.totalSavings = 0;
        newState.tuitionPaid += yearlyFee;
        newState.stress += 20;
      }
    }

    // Calculate stress
    const debtRatio = newState.totalDebt / newState.householdIncome;
    newState.stress = Math.min(100, debtRatio * 100 + (newState.totalSavings < 0 ? 30 : 0));

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
          const loanAmount = currentEvent.cost - newState.totalSavings;
          newState.totalDebt += loanAmount * 1.15; // 15% interest for emergency loans
          newState.totalSavings = 0;
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

    setGameState(newState);
    setCurrentEvent(null);
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
          <div className="game-header">
            <h2 className="game-title">🎮 Can You Afford BITS?</h2>
            <p className="game-subtitle">
              Experience the financial reality of getting a BITS education as a middle-class family
            </p>
          </div>

          <div className="income-selection">
            <h3>Choose Your Family's Annual Income:</h3>
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

          <div className="game-instructions">
            <h3>How to Play:</h3>
            <ul>
              <li>💰 Manage your family's finances over 4 years</li>
              <li>📚 Pay annual BITS tuition fees (₹5.35L - ₹6.25L)</li>
              <li>🏠 Handle monthly living expenses</li>
              <li>⚡ Deal with unexpected events and emergencies</li>
              <li>💳 Take loans when necessary (with interest)</li>
              <li>🎯 Goal: Graduate with minimal debt and stress</li>
            </ul>
          </div>

          <button className="start-game-btn" onClick={startGame}>
            Start Your BITS Journey
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="game" className="game-section playing">
      <div className="container">
        <div className="game-dashboard">
          <div className="time-display">
            <h2>Year {gameState.year}, Month {gameState.month}</h2>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${((gameState.year - 1) * 12 + gameState.month) / 48 * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card savings">
              <div className="stat-label">Savings</div>
              <div className="stat-value">₹{gameState.totalSavings.toLocaleString('en-IN')}</div>
            </div>
            
            <div className="stat-card debt">
              <div className="stat-label">Debt</div>
              <div className="stat-value">₹{gameState.totalDebt.toLocaleString('en-IN')}</div>
            </div>
            
            <div className="stat-card tuition">
              <div className="stat-label">Tuition Paid</div>
              <div className="stat-value">₹{gameState.tuitionPaid.toLocaleString('en-IN')}</div>
            </div>
            
            <div className="stat-card stress">
              <div className="stat-label">Family Stress</div>
              <div 
                className="stat-value"
                style={{ color: getStressColor(gameState.stress) }}
              >
                {gameState.stress.toFixed(0)}%
              </div>
            </div>
          </div>

          {!gameState.gameOver && !currentEvent && (
            <div className="game-controls">
              <button className="next-month-btn" onClick={nextMonth}>
                Next Month →
              </button>
              <p className="control-hint">Click to advance through each month</p>
            </div>
          )}

          {currentEvent && (
            <div className="event-popup">
              <div className="event-content">
                <h3>{currentEvent.title}</h3>
                <p>{currentEvent.description}</p>
                <div className="event-cost">
                  {currentEvent.cost > 0 ? 
                    `Cost: ₹${currentEvent.cost.toLocaleString('en-IN')}` :
                    `Benefit: ₹${Math.abs(currentEvent.cost).toLocaleString('en-IN')}`
                  }
                </div>
                <div className="event-actions">
                  <button 
                    className="event-btn accept"
                    onClick={() => handleEventChoice(true)}
                  >
                    {currentEvent.cost > 0 ? 'Pay/Take Loan' : 'Accept'}
                  </button>
                  <button 
                    className="event-btn decline"
                    onClick={() => handleEventChoice(false)}
                  >
                    Skip
                  </button>
                </div>
              </div>
            </div>
          )}

          {showResults && (
            <div className="results-popup">
              <div className="results-content">
                <h2>Game Over!</h2>
                <div className="result-message">{getResultMessage()}</div>
                
                <div className="final-stats">
                  <div className="final-stat">
                    <span>Total Debt:</span>
                    <span>₹{gameState.totalDebt.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="final-stat">
                    <span>Tuition Paid:</span>
                    <span>₹{gameState.tuitionPaid.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="final-stat">
                    <span>Years to Repay:</span>
                    <span>{Math.ceil(gameState.totalDebt / (gameState.householdIncome * 0.2))}</span>
                  </div>
                </div>

                <div className="result-actions">
                  <button className="result-btn" onClick={resetGame}>
                    Try Different Income
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