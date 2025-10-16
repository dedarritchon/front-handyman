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

function URLEncoderDecoder() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const encode = () => {
    try {
      setResult(encodeURIComponent(text));
    } catch (error) {
      setResult('Error encoding URL');
    }
  };

  const decode = () => {
    try {
      setResult(decodeURIComponent(text));
    } catch (error) {
      setResult('Error decoding URL');
    }
  };

  return (
    <ToolCard
      title="URL Encoder/Decoder"
      icon="🔗"
      description="Encode and decode URL strings"
    >
      <FormGroup>
        <Label>Input</Label>
        <TextArea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter URL or text"
        />
      </FormGroup>

      <ButtonGroup>
        <Button variant="primary" onClick={encode}>
          Encode
        </Button>
        <Button variant="primary" onClick={decode}>
          Decode
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

export default URLEncoderDecoder;

