import { useEffect, useState } from 'react';

import { FormGroup, Label, Result, ResultLabel, ResultValue, Select } from '../common/FormElements';
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

function CustomerLocalTime() {
  const [customerTimezone, setCustomerTimezone] = useState('-5');
  const [customerTime, setCustomerTime] = useState('');
  const [myTime, setMyTime] = useState('');

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const myLocalTime = now.toLocaleTimeString();

      // Calculate customer's local time
      const customerOffset = parseFloat(customerTimezone);
      const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
      const customerDate = new Date(utcTime + 3600000 * customerOffset);

      setMyTime(myLocalTime);
      setCustomerTime(customerDate.toLocaleTimeString());
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);

    return () => clearInterval(interval);
  }, [customerTimezone]);

  const customerTz = TIMEZONES.find(
    (tz) => tz.offset === parseFloat(customerTimezone)
  );

  return (
    <ToolCard
      title="Customer Local Time"
      icon="🕐"
      description="Show customer's local time based on their timezone"
    >
      <FormGroup>
        <Label>Customer Timezone</Label>
        <Select
          value={customerTimezone}
          onChange={(e) => setCustomerTimezone(e.target.value)}
        >
          {TIMEZONES.map((tz) => (
            <option key={tz.label} value={tz.offset}>
              {tz.label}
            </option>
          ))}
        </Select>
      </FormGroup>

      <Result>
        <ResultLabel>Your Local Time</ResultLabel>
        <ResultValue>{myTime}</ResultValue>
      </Result>

      <Result>
        <ResultLabel>Customer's Time ({customerTz?.label})</ResultLabel>
        <ResultValue>{customerTime}</ResultValue>
      </Result>
    </ToolCard>
  );
}

export default CustomerLocalTime;

