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

function ClipboardCleaner() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const trim = () => {
    setResult(text.trim());
  };

  const removeExtraSpaces = () => {
    setResult(text.replace(/\s+/g, ' ').trim());
  };

  const removeLineBreaks = () => {
    setResult(text.replace(/[\r\n]+/g, ' ').trim());
  };

  const removeHTML = () => {
    setResult(text.replace(/<[^>]*>/g, ''));
  };

  const removeSpecialChars = () => {
    setResult(text.replace(/[^\w\s]/gi, ''));
  };

  return (
    <ToolCard
      title="Clipboard Cleaner"
      icon="📋"
      description="Clean and format text"
    >
      <FormGroup>
        <Label>Input Text</Label>
        <TextArea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste text to clean"
        />
      </FormGroup>

      <ButtonGroup>
        <Button variant="primary" onClick={trim}>
          Trim
        </Button>
        <Button variant="primary" onClick={removeExtraSpaces}>
          Remove Extra Spaces
        </Button>
        <Button variant="primary" onClick={removeLineBreaks}>
          Remove Line Breaks
        </Button>
      </ButtonGroup>

      <ButtonGroup>
        <Button variant="secondary" onClick={removeHTML}>
          Remove HTML
        </Button>
        <Button variant="secondary" onClick={removeSpecialChars}>
          Remove Special Chars
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

export default ClipboardCleaner;

