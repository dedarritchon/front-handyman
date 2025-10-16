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

const AREA_UNITS: Record<string, { name: string; toSqMeters: number }> = {
  'mm²': { name: 'Square Millimeter', toSqMeters: 0.000001 },
  'cm²': { name: 'Square Centimeter', toSqMeters: 0.0001 },
  'm²': { name: 'Square Meter', toSqMeters: 1 },
  'km²': { name: 'Square Kilometer', toSqMeters: 1000000 },
  'in²': { name: 'Square Inch', toSqMeters: 0.00064516 },
  'ft²': { name: 'Square Foot', toSqMeters: 0.092903 },
  'yd²': { name: 'Square Yard', toSqMeters: 0.836127 },
  'mi²': { name: 'Square Mile', toSqMeters: 2589988.11 },
  acre: { name: 'Acre', toSqMeters: 4046.86 },
  hectare: { name: 'Hectare', toSqMeters: 10000 },
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

function AreaConverter() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('m²');
  const [toUnit, setToUnit] = useState('ft²');

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
      const valueInSqMeters = val * AREA_UNITS[fromUnit].toSqMeters;
      return valueInSqMeters / AREA_UNITS[toUnit].toSqMeters;
    }
    return null;
  };

  const result = convert();
  const units = Object.keys(AREA_UNITS);

  return (
    <ToolCard
      title="Area Converter"
      icon="📐"
      description="Convert between different area units"
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
                {AREA_UNITS[unit].name} ({unit})
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
                {AREA_UNITS[unit].name} ({unit})
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

export default AreaConverter;
