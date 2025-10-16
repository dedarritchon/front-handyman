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

const SPEED_UNITS: Record<string, { name: string; toKmh: number }> = {
  'km/h': { name: 'Kilometers per Hour', toKmh: 1 },
  'mph': { name: 'Miles per Hour', toKmh: 1.60934 },
  'm/s': { name: 'Meters per Second', toKmh: 3.6 },
  'ft/s': { name: 'Feet per Second', toKmh: 1.09728 },
  knot: { name: 'Knot', toKmh: 1.852 },
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

function SpeedConverter() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('km/h');
  const [toUnit, setToUnit] = useState('mph');

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
      const valueInKmh = val * SPEED_UNITS[fromUnit].toKmh;
      return valueInKmh / SPEED_UNITS[toUnit].toKmh;
    }
    return null;
  };

  const result = convert();
  const units = Object.keys(SPEED_UNITS);

  return (
    <ToolCard
      title="Speed Converter"
      icon="🚗"
      description="Convert between different speed units"
    >
      <FormGroup>
        <Label>Value</Label>
        <Input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter speed"
          autoFocus
        />
      </FormGroup>

      <ConversionRow>
        <FormGroup>
          <Label>From</Label>
          <Select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
            {units.map((unit) => (
              <option key={unit} value={unit}>
                {SPEED_UNITS[unit].name} ({unit})
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
                {SPEED_UNITS[unit].name} ({unit})
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
              {result.toFixed(4).replace(/\.?0+$/, '')} {toUnit}
            </ResultValue>
            <CopyButton onClick={() => copyToClipboard(result.toFixed(4).replace(/\.?0+$/, ''))}>
              Copy
            </CopyButton>
          </ResultWithCopy>
        </Result>
      )}
    </ToolCard>
  );
}

export default SpeedConverter;
