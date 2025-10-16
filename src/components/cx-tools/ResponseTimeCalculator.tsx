import { useState } from 'react';

import {
  FormGroup,
  Input,
  Label,
  Result,
  ResultLabel,
  ResultValue,
} from '../common/FormElements';
import ToolCard from '../common/ToolCard';

function ResponseTimeCalculator() {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const calculateDifference = () => {
    if (!startTime || !endTime) return null;

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;

    const diffMs = end.getTime() - start.getTime();
    if (diffMs < 0) return null;

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    return { hours, minutes, seconds, totalMinutes: diffMs / (1000 * 60) };
  };

  const diff = calculateDifference();

  return (
    <ToolCard
      title="Response Time Calculator"
      icon="⏱️"
      description="Calculate time between two timestamps"
    >
      <FormGroup>
        <Label>Start Time</Label>
        <Input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label>End Time</Label>
        <Input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </FormGroup>

      {diff && (
        <>
          <Result>
            <ResultLabel>Response Time</ResultLabel>
            <ResultValue>
              {diff.hours}h {diff.minutes}m {diff.seconds}s
            </ResultValue>
          </Result>

          <Result>
            <ResultLabel>Total Minutes</ResultLabel>
            <ResultValue>{diff.totalMinutes.toFixed(2)} minutes</ResultValue>
          </Result>
        </>
      )}
    </ToolCard>
  );
}

export default ResponseTimeCalculator;

