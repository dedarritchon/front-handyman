import { useState } from 'react';
import styled from 'styled-components';

import {
  FormGroup,
  Input,
  Label,
  Select,
} from '../common/FormElements';
import ToolCard from '../common/ToolCard';

const SPEED_UNITS: Record<string, { name: string; toKmh: number; symbol: string }> = {
  'km/h': { name: 'Kilometers per Hour', toKmh: 1, symbol: 'km/h' },
  'mph': { name: 'Miles per Hour', toKmh: 1.60934, symbol: 'mph' },
  'm/s': { name: 'Meters per Second', toKmh: 3.6, symbol: 'm/s' },
  'ft/s': { name: 'Feet per Second', toKmh: 1.09728, symbol: 'ft/s' },
  knot: { name: 'Knot', toKmh: 1.852, symbol: 'knot' },
};

const InputRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 12px;
  margin-bottom: 24px;
`;

const UnitGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 10px;
  margin-top: 16px;
`;

const UnitCard = styled.div<{ $isBase?: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px 14px;
  border: 2px solid ${(props) => (props.$isBase ? '#0d6efd' : '#dee2e6')};
  border-radius: 8px;
  background-color: ${(props) => (props.$isBase ? '#e7f1ff' : 'white')};
  transition: all 0.2s;
  min-height: 60px;
  overflow: hidden;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }
`;

const UnitInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 0 0 auto;
  min-width: 120px;
  max-width: 50%;
`;

const UnitIcon = styled.span`
  font-size: 24px;
  flex-shrink: 0;
`;

const UnitDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
`;

const UnitCode = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #212529;
  white-space: nowrap;
`;

const UnitName = styled.div`
  font-size: 11px;
  color: #6c757d;
  white-space: nowrap;
`;

const ConvertedValue = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #212529;
  margin: 0 8px;
  word-break: break-all;
  text-align: right;
  flex: 1;
  min-width: 0;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CopyButton = styled.button`
  padding: 6px 10px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  background-color: white;
  color: #6c757d;
  font-size: 11px;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
  white-space: nowrap;

  &:hover {
    background-color: #f8f9fa;
    color: #212529;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
  justify-content: flex-end;
`;

function SpeedConverter() {
  const [value, setValue] = useState('60');
  const [baseUnit, setBaseUnit] = useState('km/h');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const convertAll = () => {
    const val = parseFloat(value);
    if (isNaN(val) || !value) return {};

    const results: Record<string, number> = {};
    const valueInKmh = val * SPEED_UNITS[baseUnit].toKmh;
    
    Object.keys(SPEED_UNITS).forEach((unit) => {
      if (unit !== baseUnit) {
        results[unit] = valueInKmh / SPEED_UNITS[unit].toKmh;
      }
    });

    return results;
  };

  const conversions = convertAll();
  const units = Object.keys(SPEED_UNITS);
  const hasValidValue = value && !isNaN(parseFloat(value));

  return (
    <ToolCard
      title="Speed Converter"
      icon="🚗"
      description="Convert between different speed units"
    >
      <InputRow>
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

        <FormGroup>
          <Label>Base Unit</Label>
          <Select value={baseUnit} onChange={(e) => setBaseUnit(e.target.value)}>
            {units.map((unit) => (
              <option key={unit} value={unit}>
                {SPEED_UNITS[unit].name} ({unit})
              </option>
            ))}
          </Select>
        </FormGroup>
      </InputRow>

      {hasValidValue && (
        <>
          {/* Show base unit card */}
          <UnitCard $isBase>
            <UnitInfo>
              <UnitIcon>🚗</UnitIcon>
              <UnitDetails>
                <UnitCode>{SPEED_UNITS[baseUnit].symbol}</UnitCode>
                <UnitName>{SPEED_UNITS[baseUnit].name}</UnitName>
              </UnitDetails>
            </UnitInfo>
            <ConvertedValue>{parseFloat(value).toFixed(4).replace(/\.?0+$/, '')}</ConvertedValue>
          </UnitCard>

          <UnitGrid>
            {Object.entries(conversions).map(([unit, convertedValue]) => (
              <UnitCard key={unit}>
                <UnitInfo>
                  <UnitIcon>🚗</UnitIcon>
                  <UnitDetails>
                    <UnitCode>{SPEED_UNITS[unit].symbol}</UnitCode>
                    <UnitName>{SPEED_UNITS[unit].name}</UnitName>
                  </UnitDetails>
                </UnitInfo>
                <RightSection>
                  <ConvertedValue>
                    {convertedValue.toFixed(4).replace(/\.?0+$/, '')}
                  </ConvertedValue>
                  <CopyButton 
                    onClick={() => copyToClipboard(convertedValue.toFixed(4).replace(/\.?0+$/, ''))}
                  >
                    Copy
                  </CopyButton>
                </RightSection>
              </UnitCard>
            ))}
          </UnitGrid>
        </>
      )}
    </ToolCard>
  );
}

export default SpeedConverter;
