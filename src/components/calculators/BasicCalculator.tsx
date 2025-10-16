import { useState, useEffect } from 'react';
import styled from 'styled-components';

import ToolCard from '../common/ToolCard';

const CalculatorWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 250px;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CalculatorMain = styled.div`
  display: flex;
  flex-direction: column;
`;

const DisplayContainer = styled.div`
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  padding: 12px 16px;
  margin-bottom: 12px;
`;

const ExpressionDisplay = styled.div`
  text-align: right;
  font-size: 14px;
  color: #6c757d;
  min-height: 20px;
  margin-bottom: 4px;
  overflow-x: auto;
  white-space: nowrap;
`;

const Display = styled.div`
  text-align: right;
  font-size: 32px;
  font-weight: 600;
  color: #212529;
  min-height: 40px;
  overflow-x: auto;
  word-break: break-all;
`;

const CalculatorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 6px;
`;

const CalcButton = styled.button<{ $span?: number; $variant?: string; $active?: boolean }>`
  grid-column: ${(props) => (props.$span ? `span ${props.$span}` : 'auto')};
  padding: 14px 8px;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  background-color: ${(props) =>
    props.$variant === 'primary'
      ? '#0d6efd'
      : props.$variant === 'danger'
        ? '#dc3545'
        : props.$variant === 'secondary'
          ? '#6c757d'
          : '#ffffff'};
  color: ${(props) =>
    props.$variant === 'primary' ||
    props.$variant === 'danger' ||
    props.$variant === 'secondary'
      ? 'white'
      : '#212529'};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  transform: ${(props) => (props.$active ? 'scale(0.95)' : 'scale(1)')};
  box-shadow: ${(props) =>
    props.$active ? 'inset 0 2px 4px rgba(0,0,0,0.2)' : 'none'};

  &:hover {
    opacity: 0.8;
  }

  &:active {
    transform: scale(0.95);
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
  }
`;

const HistoryPanel = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  background-color: #ffffff;
  max-height: 450px;
`;

const HistoryHeader = styled.div`
  padding: 12px;
  border-bottom: 1px solid #dee2e6;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HistoryList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px;
`;

const HistoryItem = styled.div`
  padding: 8px;
  margin-bottom: 4px;
  background-color: #f8f9fa;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e9ecef;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const HistoryExpression = styled.div`
  color: #6c757d;
  margin-bottom: 2px;
`;

const HistoryResult = styled.div`
  color: #212529;
  font-weight: 600;
`;

const ClearHistoryButton = styled.button`
  padding: 4px 8px;
  border: none;
  background: none;
  color: #6c757d;
  font-size: 12px;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #dc3545;
  }
`;

interface HistoryEntry {
  expression: string;
  result: string;
}

function BasicCalculator() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const flashButton = (buttonId: string) => {
    setActiveButton(buttonId);
    setTimeout(() => setActiveButton(null), 150);
  };

  const handleNumber = (num: string) => {
    flashButton(num);
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
    // Update expression display to show the full operation
    if (operation && previousValue !== null) {
      const currentDisplay = newNumber ? num : (display === '0' ? num : display + num);
      const displayOp = operation === '-' ? '−' : operation;
      setExpression(`${previousValue} ${displayOp} ${currentDisplay}`);
    }
  };

  const handleDecimal = () => {
    flashButton('.');
    if (!display.includes('.')) {
      const newDisplay = display + '.';
      setDisplay(newDisplay);
      setNewNumber(false);
      // Update expression display
      if (operation && previousValue !== null) {
        const displayOp = operation === '-' ? '−' : operation;
        setExpression(`${previousValue} ${displayOp} ${newDisplay}`);
      }
    }
  };

  const handleOperation = (op: string) => {
    flashButton(op);
    const current = parseFloat(display);
    // Display proper symbol (− instead of -)
    const displayOp = op === '-' ? '−' : op;
    
    if (previousValue !== null && operation && !newNumber) {
      // Chain operations: calculate first, then set new operation
      const result = calculateResult(previousValue, current, operation);
      setDisplay(String(result));
      setPreviousValue(result);
      setOperation(op);
      setExpression(`${result} ${displayOp} `);
      setNewNumber(true);
    } else {
      setPreviousValue(current);
      setOperation(op);
      setExpression(`${current} ${displayOp} `);
      setNewNumber(true);
    }
  };

  const calculateResult = (prev: number, curr: number, op: string): number => {
    switch (op) {
      case '+':
        return prev + curr;
      case '-':
        return prev - curr;
      case '×':
        return prev * curr;
      case '÷':
        return prev / curr;
      case '^':
        return Math.pow(prev, curr);
      default:
        return curr;
    }
  };

  const calculate = () => {
    flashButton('=');
    if (previousValue === null || operation === null) return;
    const current = parseFloat(display);
    
    const result = calculateResult(previousValue, current, operation);
    
    // Create history expression with proper symbols
    const opSymbol = operation === '-' ? '−' : operation;
    const historyExpression = `${previousValue} ${opSymbol} ${current}`;

    const resultStr = String(result);
    setDisplay(resultStr);
    setExpression('');
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);

    // Add to history
    setHistory((prev) => [{ expression: historyExpression, result: resultStr }, ...prev].slice(0, 50));
  };

  const handleUnaryOperation = (op: string) => {
    flashButton(op);
    const current = parseFloat(display);
    let result = 0;
    let historyExpression = '';

    switch (op) {
      case '√':
        result = Math.sqrt(current);
        historyExpression = `√${current}`;
        break;
      case 'x²':
        result = current * current;
        historyExpression = `${current}²`;
        break;
      case 'exp':
        result = Math.exp(current);
        historyExpression = `e^${current}`;
        break;
      case 'ln':
        result = Math.log(current);
        historyExpression = `ln(${current})`;
        break;
      case 'log':
        result = Math.log10(current);
        historyExpression = `log(${current})`;
        break;
      case '1/x':
        result = 1 / current;
        historyExpression = `1/${current}`;
        break;
      case '±':
        result = -current;
        historyExpression = `−(${current})`;
        break;
    }

    const resultStr = String(result);
    setDisplay(resultStr);
    setExpression('');
    setNewNumber(true);

    // Add to history
    setHistory((prev) => [{ expression: historyExpression, result: resultStr }, ...prev].slice(0, 50));
  };

  const clear = () => {
    flashButton('C');
    setDisplay('0');
    setExpression('');
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const backspace = () => {
    flashButton('⌫');
    if (display.length > 1) {
      const newDisplay = display.slice(0, -1);
      setDisplay(newDisplay);
      // Update expression display
      if (operation && previousValue !== null) {
        const displayOp = operation === '-' ? '−' : operation;
        setExpression(`${previousValue} ${displayOp} ${newDisplay}`);
      }
    } else {
      setDisplay('0');
      setNewNumber(true);
      // Clear expression if going back to 0
      if (operation && previousValue !== null) {
        const displayOp = operation === '-' ? '−' : operation;
        setExpression(`${previousValue} ${displayOp} `);
      }
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const recallFromHistory = (value: string) => {
    setDisplay(value);
    setNewNumber(true);
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;

      // Numbers
      if (key >= '0' && key <= '9') {
        event.preventDefault();
        handleNumber(key);
      }
      // Decimal point
      else if (key === '.' || key === ',') {
        event.preventDefault();
        handleDecimal();
      }
      // Operations
      else if (key === '+') {
        event.preventDefault();
        handleOperation('+');
      } else if (key === '-') {
        event.preventDefault();
        handleOperation('-');
      } else if (key === '*' || key === 'x') {
        event.preventDefault();
        handleOperation('×');
      } else if (key === '/') {
        event.preventDefault();
        handleOperation('÷');
      } else if (key === '^') {
        event.preventDefault();
        handleOperation('^');
      }
      // Calculate
      else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
      }
      // Clear
      else if (key === 'Escape' || key === 'c' || key === 'C') {
        event.preventDefault();
        clear();
      }
      // Backspace
      else if (key === 'Backspace') {
        event.preventDefault();
        backspace();
      }
      // Square root
      else if (key === 's' || key === 'S') {
        event.preventDefault();
        handleUnaryOperation('√');
      }
      // Negate
      else if (key === 'n' || key === 'N') {
        event.preventDefault();
        handleUnaryOperation('±');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [display, previousValue, operation, newNumber, expression]);

  return (
    <ToolCard
      title="Calculator"
      icon="🧮"
      description="Advanced calculator with history and scientific functions"
    >
      <CalculatorWrapper>
        <CalculatorMain>
          <DisplayContainer>
            <ExpressionDisplay>{expression || '\u00A0'}</ExpressionDisplay>
            <Display>{display}</Display>
          </DisplayContainer>
          <CalculatorGrid>
            {/* Row 1: Advanced functions */}
            <CalcButton $variant="secondary" $active={activeButton === '√'} onClick={() => handleUnaryOperation('√')}>
              √x
            </CalcButton>
            <CalcButton $variant="secondary" $active={activeButton === 'x²'} onClick={() => handleUnaryOperation('x²')}>
              x²
            </CalcButton>
            <CalcButton $variant="secondary" $active={activeButton === '^'} onClick={() => handleOperation('^')}>
              x^y
            </CalcButton>
            <CalcButton $variant="secondary" $active={activeButton === '1/x'} onClick={() => handleUnaryOperation('1/x')}>
              1/x
            </CalcButton>
            <CalcButton $variant="danger" $active={activeButton === 'C'} onClick={clear}>
              C
            </CalcButton>

            {/* Row 2: More advanced functions */}
            <CalcButton $variant="secondary" $active={activeButton === 'exp'} onClick={() => handleUnaryOperation('exp')}>
              exp
            </CalcButton>
            <CalcButton $variant="secondary" $active={activeButton === 'ln'} onClick={() => handleUnaryOperation('ln')}>
              ln
            </CalcButton>
            <CalcButton $variant="secondary" $active={activeButton === 'log'} onClick={() => handleUnaryOperation('log')}>
              log
            </CalcButton>
            <CalcButton $variant="secondary" $active={activeButton === '±'} onClick={() => handleUnaryOperation('±')}>
              ±
            </CalcButton>
            <CalcButton $active={activeButton === '⌫'} onClick={backspace}>⌫</CalcButton>

            {/* Row 3: Numbers and operations */}
            <CalcButton $active={activeButton === '7'} onClick={() => handleNumber('7')}>7</CalcButton>
            <CalcButton $active={activeButton === '8'} onClick={() => handleNumber('8')}>8</CalcButton>
            <CalcButton $active={activeButton === '9'} onClick={() => handleNumber('9')}>9</CalcButton>
            <CalcButton $active={activeButton === '÷'} onClick={() => handleOperation('÷')}>÷</CalcButton>
            <CalcButton $active={activeButton === '×'} onClick={() => handleOperation('×')}>×</CalcButton>

            {/* Row 4 */}
            <CalcButton $active={activeButton === '4'} onClick={() => handleNumber('4')}>4</CalcButton>
            <CalcButton $active={activeButton === '5'} onClick={() => handleNumber('5')}>5</CalcButton>
            <CalcButton $active={activeButton === '6'} onClick={() => handleNumber('6')}>6</CalcButton>
            <CalcButton $active={activeButton === '-'} onClick={() => handleOperation('-')}>−</CalcButton>
            <CalcButton $active={activeButton === '+'} onClick={() => handleOperation('+')}>+</CalcButton>

            {/* Row 5 */}
            <CalcButton $active={activeButton === '1'} onClick={() => handleNumber('1')}>1</CalcButton>
            <CalcButton $active={activeButton === '2'} onClick={() => handleNumber('2')}>2</CalcButton>
            <CalcButton $active={activeButton === '3'} onClick={() => handleNumber('3')}>3</CalcButton>
            <CalcButton $span={2} $active={activeButton === '0'} onClick={() => handleNumber('0')}>
              0
            </CalcButton>

            {/* Row 6 */}
            <CalcButton $active={activeButton === '.'} onClick={handleDecimal}>.</CalcButton>
            <CalcButton $span={4} $variant="primary" $active={activeButton === '='} onClick={calculate}>
              =
            </CalcButton>
          </CalculatorGrid>
        </CalculatorMain>

        <HistoryPanel>
          <HistoryHeader>
            History
            {history.length > 0 && (
              <ClearHistoryButton onClick={clearHistory}>Clear</ClearHistoryButton>
            )}
          </HistoryHeader>
          <HistoryList>
            {history.length === 0 ? (
              <div style={{ padding: '12px', textAlign: 'center', color: '#6c757d', fontSize: '13px' }}>
                No history yet
              </div>
            ) : (
              history.map((entry, index) => (
                <HistoryItem key={index} onClick={() => recallFromHistory(entry.result)}>
                  <HistoryExpression>{entry.expression}</HistoryExpression>
                  <HistoryResult>= {entry.result}</HistoryResult>
                </HistoryItem>
              ))
            )}
          </HistoryList>
        </HistoryPanel>
      </CalculatorWrapper>
    </ToolCard>
  );
}

export default BasicCalculator;

