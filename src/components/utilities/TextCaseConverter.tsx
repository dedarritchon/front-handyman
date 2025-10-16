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

function TextCaseConverter() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const toUpperCase = () => setResult(text.toUpperCase());
  const toLowerCase = () => setResult(text.toLowerCase());
  const toTitleCase = () => {
    const result = text.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });
    setResult(result);
  };
  const toSentenceCase = () => {
    const result = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    setResult(result);
  };

  return (
    <ToolCard
      title="Text Case Converter"
      icon="🔤"
      description="Convert text to different cases"
    >
      <FormGroup>
        <Label>Input Text</Label>
        <TextArea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to convert"
        />
      </FormGroup>

      <ButtonGroup>
        <Button variant="primary" onClick={toUpperCase}>
          UPPERCASE
        </Button>
        <Button variant="primary" onClick={toLowerCase}>
          lowercase
        </Button>
        <Button variant="primary" onClick={toTitleCase}>
          Title Case
        </Button>
        <Button variant="primary" onClick={toSentenceCase}>
          Sentence case
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

export default TextCaseConverter;

