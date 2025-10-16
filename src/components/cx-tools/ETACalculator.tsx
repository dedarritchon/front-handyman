import { useState } from 'react';

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

function ETACalculator() {
  const [startDate, setStartDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('3');
  const [timeUnit, setTimeUnit] = useState('days');
  const [delay, setDelay] = useState('0');

  const calculateETA = () => {
    if (!startDate) return null;

    const start = new Date(startDate);
    if (isNaN(start.getTime())) return null;

    const baseTime = parseFloat(deliveryTime);
    const delayTime = parseFloat(delay);

    if (isNaN(baseTime) || isNaN(delayTime)) return null;

    const totalTime = baseTime + delayTime;
    const eta = new Date(start);

    switch (timeUnit) {
      case 'hours':
        eta.setHours(eta.getHours() + totalTime);
        break;
      case 'days':
        eta.setDate(eta.getDate() + totalTime);
        break;
      case 'weeks':
        eta.setDate(eta.getDate() + totalTime * 7);
        break;
    }

    return { eta, totalTime };
  };

  const result = calculateETA();

  return (
    <ToolCard
      title="ETA Calculator"
      icon="📦"
      description="Calculate estimated time of arrival"
    >
      <FormGroup>
        <Label>Ship Date</Label>
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label>Expected Delivery Time</Label>
        <Input
          type="number"
          value={deliveryTime}
          onChange={(e) => setDeliveryTime(e.target.value)}
          placeholder="Enter delivery time"
        />
      </FormGroup>

      <FormGroup>
        <Label>Time Unit</Label>
        <Select value={timeUnit} onChange={(e) => setTimeUnit(e.target.value)}>
          <option value="hours">Hours</option>
          <option value="days">Days</option>
          <option value="weeks">Weeks</option>
        </Select>
      </FormGroup>

      <FormGroup>
        <Label>Delay (in same unit)</Label>
        <Input
          type="number"
          value={delay}
          onChange={(e) => setDelay(e.target.value)}
          placeholder="Enter any delays"
        />
      </FormGroup>

      {result && (
        <>
          <Result>
            <ResultLabel>
              Total Time ({result.totalTime} {timeUnit})
            </ResultLabel>
            <ResultValue>{result.eta.toLocaleDateString()}</ResultValue>
          </Result>

          <Result>
            <ResultLabel>Estimated Delivery</ResultLabel>
            <ResultValue>
              {result.eta.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </ResultValue>
          </Result>
        </>
      )}
    </ToolCard>
  );
}

export default ETACalculator;

