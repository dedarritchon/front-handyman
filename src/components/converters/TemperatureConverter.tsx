import { useState } from 'react';
import styled from 'styled-components';

import {
  FormGroup,
  Input,
  Label,
  Result,
  ResultLabel,
  ResultValue,
  Select,
} from '../common/FormElements';
import ToolCard from '../common/ToolCard';

const TEMP_UNITS: Record<string, string> = {
  C: 'Celsius (°C)',
  F: 'Fahrenheit (°F)',
  K: 'Kelvin (K)',
};

const ConversionRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 12px;
  align-items: end;
`;

const SwapButton = styled.button`
  padding: 10px 16px;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  background-color: white;
  color: #495057;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 8px;

  &:hover {
    background-color: #f8f9fa;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ResultWithCopy = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
`;

const CopyButton = styled.button`
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

function TemperatureConverter() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('C');
  const [toUnit, setToUnit] = useState('F');

  const swap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const convert = () => {
    const val = parseFloat(value);
    if (isNaN(val)) return null;

    let celsius: number;

    // Convert to Celsius first
    switch (fromUnit) {
      case 'C':
        celsius = val;
        break;
      case 'F':
        celsius = ((val - 32) * 5) / 9;
        break;
      case 'K':
        celsius = val - 273.15;
        break;
      default:
        return null;
    }

    // Convert from Celsius to target unit
    switch (toUnit) {
      case 'C':
        return celsius;
      case 'F':
        return (celsius * 9) / 5 + 32;
      case 'K':
        return celsius + 273.15;
      default:
        return null;
    }
  };

  const result = convert();
  const units = Object.keys(TEMP_UNITS);

  const getSymbol = (unit: string) => {
    return unit === 'C' ? '°C' : unit === 'F' ? '°F' : 'K';
  };

  return (
    <ToolCard
      title="Temperature Converter"
      icon="🌡️"
      description="Convert between Celsius, Fahrenheit, and Kelvin"
    >
      <FormGroup>
        <Label>Value</Label>
        <Input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter temperature"
          autoFocus
        />
      </FormGroup>

      <ConversionRow>
        <FormGroup>
          <Label>From</Label>
          <Select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
            {units.map((unit) => (
              <option key={unit} value={unit}>
                {TEMP_UNITS[unit]}
              </option>
            ))}
          </Select>
        </FormGroup>

        <SwapButton onClick={swap} title="Swap units">
          ⇄
        </SwapButton>

        <FormGroup>
          <Label>To</Label>
          <Select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
            {units.map((unit) => (
              <option key={unit} value={unit}>
                {TEMP_UNITS[unit]}
              </option>
            ))}
          </Select>
        </FormGroup>
      </ConversionRow>

      {result !== null && (
        <Result>
          <ResultLabel>
            {value}{getSymbol(fromUnit)} =
          </ResultLabel>
          <ResultWithCopy>
            <ResultValue>
              {result.toFixed(2)}{getSymbol(toUnit)}
            </ResultValue>
            <CopyButton onClick={() => copyToClipboard(result.toFixed(2))}>
              Copy
            </CopyButton>
          </ResultWithCopy>
        </Result>
      )}
    </ToolCard>
  );
}

export default TemperatureConverter;
