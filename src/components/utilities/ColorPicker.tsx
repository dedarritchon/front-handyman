import { useState } from 'react';
import styled from 'styled-components';

import {
  FormGroup,
  Input,
  Label,
} from '../common/FormElements';
import ToolCard from '../common/ToolCard';

const ColorInput = styled.input`
  width: 100%;
  height: 50px;
  border: 1px solid var(--input-border);
  border-radius: 8px;
  cursor: pointer;
`;

const CopyButton = styled.button`
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 12px;
  margin-left: 8px;
  transition: background-color 0.2s;

  &:hover {
    background: var(--primary-hover);
  }

  &:active {
    background: var(--primary-active);
  }
`;

const ValueContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

function ColorPicker() {
  const [color, setColor] = useState('#3b82f6');
  const [copyFeedback, setCopyFeedback] = useState('');

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyFeedback(`${type} copied!`);
      setTimeout(() => setCopyFeedback(''), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      setCopyFeedback('Copy failed');
      setTimeout(() => setCopyFeedback(''), 2000);
    }
  };

  const rgb = hexToRgb(color);
  const rgbString = rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : '';

  return (
    <ToolCard
      title="Color Picker"
      icon="🎨"
      description="Pick colors and convert between HEX and RGB"
    >
      <FormGroup>
        <Label>Pick a Color</Label>
        <ColorInput
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label>HEX Value</Label>
        <ValueContainer>
          <Input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="#000000"
            style={{ flex: 1 }}
          />
          <CopyButton onClick={() => copyToClipboard(color, 'HEX')}>
            Copy
          </CopyButton>
        </ValueContainer>
      </FormGroup>

      {rgb && (
        <FormGroup>
          <Label>RGB Value</Label>
          <ValueContainer>
            <Input
              type="text"
              value={rgbString}
              readOnly
              style={{ flex: 1 }}
            />
            <CopyButton onClick={() => copyToClipboard(rgbString, 'RGB')}>
              Copy
            </CopyButton>
          </ValueContainer>
        </FormGroup>
      )}

      {copyFeedback && (
        <div style={{ 
          color: 'var(--success)', 
          fontSize: '14px', 
          marginTop: '8px',
          textAlign: 'center'
        }}>
          {copyFeedback}
        </div>
      )}
    </ToolCard>
  );
}

export default ColorPicker;

