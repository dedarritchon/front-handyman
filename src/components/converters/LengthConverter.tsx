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

const LENGTH_UNITS: Record<string, { name: string; toMeters: number }> = {
  mm: { name: 'Millimeter', toMeters: 0.001 },
  cm: { name: 'Centimeter', toMeters: 0.01 },
  m: { name: 'Meter', toMeters: 1 },
  km: { name: 'Kilometer', toMeters: 1000 },
  in: { name: 'Inch', toMeters: 0.0254 },
  ft: { name: 'Foot', toMeters: 0.3048 },
  yd: { name: 'Yard', toMeters: 0.9144 },
  mi: { name: 'Mile', toMeters: 1609.344 },
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

function LengthConverter() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('ft');

  const swap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const convert = () => {
    const val = parseFloat(value);
    if (!isNaN(val)) {
      const valueInMeters = val * LENGTH_UNITS[fromUnit].toMeters;
      return valueInMeters / LENGTH_UNITS[toUnit].toMeters;
    }
    return null;
  };

  const result = convert();
  const units = Object.keys(LENGTH_UNITS);

  return (
    <ToolCard
      title="Length Converter"
      icon="📏"
      description="Convert between different length units"
    >
      <FormGroup>
        <Label>Value</Label>
        <Input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
          autoFocus
        />
      </FormGroup>

      <ConversionRow>
        <FormGroup>
          <Label>From</Label>
          <Select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
            {units.map((unit) => (
              <option key={unit} value={unit}>
                {LENGTH_UNITS[unit].name} ({unit})
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
                {LENGTH_UNITS[unit].name} ({unit})
              </option>
            ))}
          </Select>
        </FormGroup>
      </ConversionRow>

      {result !== null && (
        <Result>
          <ResultLabel>
            {value} {fromUnit} =
          </ResultLabel>
          <ResultWithCopy>
            <ResultValue>
              {result.toFixed(6).replace(/\.?0+$/, '')} {toUnit}
            </ResultValue>
            <CopyButton onClick={() => copyToClipboard(result.toFixed(6).replace(/\.?0+$/, ''))}>
              Copy
            </CopyButton>
          </ResultWithCopy>
        </Result>
      )}
    </ToolCard>
  );
}

export default LengthConverter;

