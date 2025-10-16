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

const TIMEZONES = [
  { label: 'UTC', offset: 0 },
  { label: 'EST (New York)', offset: -5 },
  { label: 'CST (Chicago)', offset: -6 },
  { label: 'MST (Denver)', offset: -7 },
  { label: 'PST (Los Angeles)', offset: -8 },
  { label: 'GMT (London)', offset: 0 },
  { label: 'CET (Paris)', offset: 1 },
  { label: 'IST (India)', offset: 5.5 },
  { label: 'CST (China)', offset: 8 },
  { label: 'JST (Tokyo)', offset: 9 },
  { label: 'AEST (Sydney)', offset: 10 },
];

function TimeZoneConverter() {
  const [time, setTime] = useState('12:00');
  const [fromTimezone, setFromTimezone] = useState('0');
  const [toTimezone, setToTimezone] = useState('-5');

  const convert = () => {
    if (!time) return null;

    const [hours, minutes] = time.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes)) return null;

    const fromOffset = parseFloat(fromTimezone);
    const toOffset = parseFloat(toTimezone);

    let convertedHours = hours - fromOffset + toOffset;

    // Handle day wrapping
    while (convertedHours < 0) convertedHours += 24;
    while (convertedHours >= 24) convertedHours -= 24;

    const formattedHours = Math.floor(convertedHours)
      .toString()
      .padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
  };

  const result = convert();

  return (
    <ToolCard
      title="Time Zone Converter"
      icon="🌍"
      description="Convert time between different time zones"
    >
      <FormGroup>
        <Label>Time</Label>
        <Input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label>From Time Zone</Label>
        <Select
          value={fromTimezone}
          onChange={(e) => setFromTimezone(e.target.value)}
        >
          {TIMEZONES.map((tz) => (
            <option key={tz.label} value={tz.offset}>
              {tz.label}
            </option>
          ))}
        </Select>
      </FormGroup>

      <FormGroup>
        <Label>To Time Zone</Label>
        <Select
          value={toTimezone}
          onChange={(e) => setToTimezone(e.target.value)}
        >
          {TIMEZONES.map((tz) => (
            <option key={tz.label} value={tz.offset}>
              {tz.label}
            </option>
          ))}
        </Select>
      </FormGroup>

      {result !== null && (
        <Result>
          <ResultLabel>Converted Time</ResultLabel>
          <ResultValue>{result}</ResultValue>
        </Result>
      )}
    </ToolCard>
  );
}

export default TimeZoneConverter;

