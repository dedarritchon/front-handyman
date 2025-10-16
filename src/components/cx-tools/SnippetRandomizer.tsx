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

const SnippetList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

const SnippetItem = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`;

const RemoveButton = styled.button`
  padding: 8px 12px;
  border: 1px solid var(--error);
  border-radius: 6px;
  background-color: transparent;
  color: var(--error);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: var(--error);
    color: white;
  }
`;

const DEFAULT_SNIPPETS = [
  "Thank you for reaching out! I'd be happy to help you with that.",
  'I understand your concern and will look into this right away.',
  "I've checked on this for you, and here's what I found:",
  'Thanks for your patience while we resolved this issue.',
  'Is there anything else I can help you with today?',
];

function SnippetRandomizer() {
  const [snippets, setSnippets] = useState<string[]>(DEFAULT_SNIPPETS);
  const [newSnippet, setNewSnippet] = useState('');
  const [selectedSnippet, setSelectedSnippet] = useState('');

  const addSnippet = () => {
    if (newSnippet.trim()) {
      setSnippets([...snippets, newSnippet.trim()]);
      setNewSnippet('');
    }
  };

  const removeSnippet = (index: number) => {
    setSnippets(snippets.filter((_, i) => i !== index));
  };

  const randomize = () => {
    if (snippets.length > 0) {
      const randomIndex = Math.floor(Math.random() * snippets.length);
      setSelectedSnippet(snippets[randomIndex]);
    }
  };

  return (
    <ToolCard
      title="Snippet Randomizer"
      icon="🎲"
      description="Choose from pre-set responses for variety"
    >
      <FormGroup>
        <Label>Your Snippets</Label>
        <SnippetList>
          {snippets.map((snippet, index) => (
            <SnippetItem key={index}>
              <TextArea value={snippet} readOnly rows={2} />
              <RemoveButton onClick={() => removeSnippet(index)}>
                Remove
              </RemoveButton>
            </SnippetItem>
          ))}
        </SnippetList>
      </FormGroup>

      <FormGroup>
        <Label>Add New Snippet</Label>
        <TextArea
          value={newSnippet}
          onChange={(e) => setNewSnippet(e.target.value)}
          placeholder="Enter a new response snippet"
          rows={3}
        />
      </FormGroup>

      <ButtonGroup>
        <Button variant="secondary" onClick={addSnippet}>
          Add Snippet
        </Button>
        <Button variant="primary" onClick={randomize}>
          🎲 Get Random Snippet
        </Button>
      </ButtonGroup>

      {selectedSnippet && (
        <Result>
          <ResultLabel>Selected Snippet</ResultLabel>
          <TextArea value={selectedSnippet} readOnly rows={4} />
        </Result>
      )}
    </ToolCard>
  );
}

export default SnippetRandomizer;

