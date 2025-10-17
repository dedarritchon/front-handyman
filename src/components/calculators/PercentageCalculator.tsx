import { useState } from 'react';
import styled from 'styled-components';

import {
  FormGroup,
  Input,
  Label,
  Result,
  ResultLabel,
  ResultValue,
} from '../common/FormElements';
import ToolCard from '../common/ToolCard';

const QuickButtons = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

const QuickButton = styled.button<{ $active?: boolean }>`
  padding: 8px 12px;
  border: 1px solid ${(props) => (props.$active ? '#0d6efd' : '#dee2e6')};
  border-radius: 6px;
  background-color: ${(props) => (props.$active ? '#0d6efd' : '#ffffff')};
  color: ${(props) => (props.$active ? 'white' : '#212529')};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => (props.$active ? '#0b5ed7' : '#f8f9fa')};
  }
`;

const ResultsGrid = styled.div`
  display: grid;
  gap: 12px;
  margin-top: 20px;
`;

const CopyButton = styled.button`
  margin-left: 12px;
  padding: 4px 12px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  background-color: white;
  color: #6c757d;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f8f9fa;
    color: #212529;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ResultWithCopy = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function PercentageCalculator() {
  const [value, setValue] = useState('100');
  const [percentage, setPercentage] = useState('10');

  const quickPercentages = [5, 10, 15, 20, 25, 50, 75];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const val = parseFloat(value);
  const pct = parseFloat(percentage);
  const hasValidInputs = !isNaN(val) && !isNaN(pct);

  // Calculate various percentage scenarios
  const percentageOf = hasValidInputs ? (val * pct) / 100 : null;
  const increase = hasValidInputs ? val + (val * pct) / 100 : null;
  const decrease = hasValidInputs ? val - (val * pct) / 100 : null;
  const whatPercentOf = hasValidInputs && val !== 0 ? (pct / val) * 100 : null;

  return (
    <ToolCard
      title="Percentage Calculator"
      icon="%"
      description="Calculate percentages, discounts, and commissions"
    >
      <FormGroup>
        <Label>Value</Label>
        <Input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value (e.g., 100)"
        />
      </FormGroup>

      <FormGroup>
        <Label>Percentage (%)</Label>
        <Input
          type="number"
          value={percentage}
          onChange={(e) => setPercentage(e.target.value)}
          placeholder="Enter percentage (e.g., 20)"
        />
      </FormGroup>

      <QuickButtons>
        {quickPercentages.map((pct) => (
          <QuickButton
            key={pct}
            $active={percentage === String(pct)}
            onClick={() => setPercentage(String(pct))}
          >
            {pct}%
          </QuickButton>
        ))}
      </QuickButtons>

      {hasValidInputs && (
        <ResultsGrid>
          {percentageOf !== null && (
            <Result>
              <ResultLabel>{pct}% of {val}</ResultLabel>
              <ResultWithCopy>
                <ResultValue>{percentageOf.toFixed(2)}</ResultValue>
                <CopyButton onClick={() => copyToClipboard(percentageOf.toFixed(2))}>
                  Copy
                </CopyButton>
              </ResultWithCopy>
            </Result>
          )}

          {increase !== null && (
            <Result>
              <ResultLabel>{val} + {pct}% (increase)</ResultLabel>
              <ResultWithCopy>
                <ResultValue>{increase.toFixed(2)}</ResultValue>
                <CopyButton onClick={() => copyToClipboard(increase.toFixed(2))}>
                  Copy
                </CopyButton>
              </ResultWithCopy>
            </Result>
          )}

          {decrease !== null && (
            <Result>
              <ResultLabel>{val} − {pct}% (discount)</ResultLabel>
              <ResultWithCopy>
                <ResultValue>{decrease.toFixed(2)}</ResultValue>
                <CopyButton onClick={() => copyToClipboard(decrease.toFixed(2))}>
                  Copy
                </CopyButton>
              </ResultWithCopy>
            </Result>
          )}

          {whatPercentOf !== null && (
            <Result>
              <ResultLabel>{pct} is what % of {val}?</ResultLabel>
              <ResultWithCopy>
                <ResultValue>{whatPercentOf.toFixed(2)}%</ResultValue>
                <CopyButton onClick={() => copyToClipboard(whatPercentOf.toFixed(2))}>
                  Copy
                </CopyButton>
              </ResultWithCopy>
            </Result>
          )}
        </ResultsGrid>
      )}
    </ToolCard>
  );
}

export default PercentageCalculator;

