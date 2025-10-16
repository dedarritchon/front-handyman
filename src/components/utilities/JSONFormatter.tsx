import { useState } from 'react';
import styled from 'styled-components';

import {
  Button,
  ButtonGroup,
  FormGroup,
  Label,
  Result,
  ResultLabel,
  TextArea,
} from '../common/FormElements';
import ToolCard from '../common/ToolCard';

const ResultContainer = styled.div`
  position: relative;
`;

const CopyButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 6px 12px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  background-color: white;
  color: #6c757d;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 1;

  &:hover {
    background-color: #f8f9fa;
    color: #212529;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const SuccessMessage = styled.div`
  background-color: #d1e7dd;
  color: #0f5132;
  padding: 12px;
  border-radius: 6px;
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
`;

function JSONFormatter() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const format = () => {
    try {
      const parsed = JSON.parse(text);
      setResult(JSON.stringify(parsed, null, 2));
      setError('');
      setIsValid(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
      setResult('');
      setIsValid(false);
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(text);
      setResult(JSON.stringify(parsed));
      setError('');
      setIsValid(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
      setResult('');
      setIsValid(false);
    }
  };

  const validate = () => {
    try {
      JSON.parse(text);
      setError('');
      setResult('');
      setIsValid(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
      setResult('');
      setIsValid(false);
    }
  };

  const clear = () => {
    setText('');
    setResult('');
    setError('');
    setIsValid(false);
  };

  return (
    <ToolCard
      title="JSON Formatter"
      icon="{ }"
      description="Format, minify, and validate JSON"
    >
      <FormGroup>
        <Label>Input JSON</Label>
        <TextArea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='{"key": "value", "array": [1, 2, 3]}'
          rows={8}
        />
      </FormGroup>

      <ButtonGroup>
        <Button variant="primary" onClick={format}>
          Format
        </Button>
        <Button variant="primary" onClick={minify}>
          Minify
        </Button>
        <Button variant="secondary" onClick={validate}>
          Validate
        </Button>
        <Button variant="secondary" onClick={clear}>
          Clear
        </Button>
      </ButtonGroup>

      {error && (
        <Result style={{ backgroundColor: '#f8d7da', color: '#842029', border: '1px solid #f5c2c7' }}>
          <ResultLabel style={{ color: '#842029' }}>❌ Error</ResultLabel>
          <div style={{ fontSize: '14px', marginTop: '8px' }}>{error}</div>
        </Result>
      )}

      {isValid && (
        <SuccessMessage>
          ✅ Valid JSON! Your JSON syntax is correct.
        </SuccessMessage>
      )}

      {result && !error && (
        <ResultContainer>
          <Result>
            <ResultLabel>Result</ResultLabel>
            <CopyButton onClick={() => copyToClipboard(result)}>
              Copy
            </CopyButton>
            <TextArea value={result} readOnly rows={12} />
          </Result>
        </ResultContainer>
      )}
    </ToolCard>
  );
}

export default JSONFormatter;

