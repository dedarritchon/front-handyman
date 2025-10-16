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

function SLADeadlineEstimator() {
  const [startTime, setStartTime] = useState('');
  const [slaHours, setSlaHours] = useState('24');
  const [workingHoursOnly, setWorkingHoursOnly] = useState('false');

  const calculateDeadline = () => {
    if (!startTime || !slaHours) return null;

    const start = new Date(startTime);
    if (isNaN(start.getTime())) return null;

    const hours = parseFloat(slaHours);
    if (isNaN(hours)) return null;

    if (workingHoursOnly === 'true') {
      // Simple working hours calculation (9 AM - 5 PM, Mon-Fri)
      // This is a simplified version - real implementation would be more complex
      const workingHoursPerDay = 8;
      const daysNeeded = Math.ceil(hours / workingHoursPerDay);
      const deadline = new Date(start);
      deadline.setDate(deadline.getDate() + daysNeeded);
      return deadline;
    } else {
      // Simple 24/7 calculation
      const deadline = new Date(start);
      deadline.setHours(deadline.getHours() + hours);
      return deadline;
    }
  };

  const deadline = calculateDeadline();

  return (
    <ToolCard
      title="SLA Deadline Estimator"
      icon="📅"
      description="Calculate SLA deadline based on working hours"
    >
      <FormGroup>
        <Label>Request Time</Label>
        <Input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label>SLA Hours</Label>
        <Input
          type="number"
          value={slaHours}
          onChange={(e) => setSlaHours(e.target.value)}
          placeholder="Enter SLA hours"
        />
      </FormGroup>

      <FormGroup>
        <Label>Working Hours Only?</Label>
        <Select
          value={workingHoursOnly}
          onChange={(e) => setWorkingHoursOnly(e.target.value)}
        >
          <option value="false">24/7</option>
          <option value="true">Business Hours (9 AM - 5 PM)</option>
        </Select>
      </FormGroup>

      {deadline && (
        <Result>
          <ResultLabel>SLA Deadline</ResultLabel>
          <ResultValue>
            {deadline.toLocaleDateString()} {deadline.toLocaleTimeString()}
          </ResultValue>
        </Result>
      )}
    </ToolCard>
  );
}

export default SLADeadlineEstimator;

