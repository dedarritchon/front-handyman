import { useState } from 'react';

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

function Base64Tool() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const encode = () => {
    try {
      const encoded = btoa(text);
      setResult(encoded);
    } catch (error) {
      setResult('Error encoding to Base64');
    }
  };

  const decode = () => {
    try {
      const decoded = atob(text);
      setResult(decoded);
    } catch (error) {
      setResult('Error decoding from Base64');
    }
  };

  return (
    <ToolCard
      title="Base64 Encoder/Decoder"
      icon="🔐"
      description="Encode and decode Base64 strings"
    >
      <FormGroup>
        <Label>Input</Label>
        <TextArea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text or Base64"
        />
      </FormGroup>

      <ButtonGroup>
        <Button variant="primary" onClick={encode}>
          Encode to Base64
        </Button>
        <Button variant="primary" onClick={decode}>
          Decode from Base64
        </Button>
      </ButtonGroup>

      {result && (
        <Result>
          <ResultLabel>Result</ResultLabel>
          <TextArea value={result} readOnly rows={5} />
        </Result>
      )}
    </ToolCard>
  );
}

export default Base64Tool;

