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
  // schedule: '247' | 'weekday24' | 'biz_9_17' | 'biz_8_18'
  const [schedule, setSchedule] = useState('247');

  const calculateDeadline = () => {
    if (!startTime || !slaHours) return null;

    const start = new Date(startTime);
    if (isNaN(start.getTime())) return null;

    const hours = parseFloat(slaHours);
    if (isNaN(hours)) return null;

    const isWeekend = (d: Date) => {
      const day = d.getDay();
      return day === 0 || day === 6;
    };

    const setTime = (d: Date, hour: number, minute = 0) => {
      d.setHours(hour, minute, 0, 0);
    };

    const clone = (d: Date) => new Date(d.getTime());

    const addHours247 = (d: Date, hrs: number) => {
      const result = clone(d);
      result.setHours(result.getHours() + hrs);
      return result;
    };

    const advanceToNextWeekdayMidnight = (d: Date) => {
      const next = clone(d);
      // move to next day midnight
      next.setDate(next.getDate() + 1);
      setTime(next, 0, 0);
      // skip weekends
      while (isWeekend(next)) {
        next.setDate(next.getDate() + 1);
      }
      return next;
    };

    const addHoursWeekdaysOnly = (d: Date, hrs: number) => {
      let current = clone(d);
      let remaining = hrs;

      // If we are on a weekend, move to next Monday 00:00
      if (isWeekend(current)) {
        // move to next day until weekday
        do {
          current.setDate(current.getDate() + 1);
        } while (isWeekend(current));
        setTime(current, 0, 0);
      }

      while (remaining > 0) {
        // end of current weekday (midnight next day)
        const endOfDay = clone(current);
        setTime(endOfDay, 24, 0); // midnight next day
        const diffMs = endOfDay.getTime() - current.getTime();
        const diffHours = diffMs / (1000 * 60 * 60);
        if (remaining <= diffHours) {
          current.setHours(current.getHours() + remaining);
          remaining = 0;
          break;
        } else {
          remaining -= diffHours;
          // jump to next weekday midnight
          current = advanceToNextWeekdayMidnight(current);
        }
      }
      return current;
    };

    type Window = { startHour: number; endHour: number; weekdaysOnly: boolean };

    const addHoursWithinBusinessWindow = (d: Date, hrs: number, window: Window) => {
      const { startHour, endHour, weekdaysOnly } = window;
      let current = clone(d);
      let remaining = hrs;

      const moveToNextWindowStart = () => {
        // move to next day and set to startHour
        current.setDate(current.getDate() + 1);
        setTime(current, startHour, 0);
        if (weekdaysOnly) {
          while (isWeekend(current)) {
            current.setDate(current.getDate() + 1);
          }
        }
      };

      const alignToWindow = () => {
        if (weekdaysOnly && isWeekend(current)) {
          // move to next weekday at startHour
          do {
            current.setDate(current.getDate() + 1);
          } while (isWeekend(current));
          setTime(current, startHour, 0);
          return;
        }
        const hour = current.getHours() + current.getMinutes() / 60;
        if (hour < startHour) {
          setTime(current, startHour, 0);
        } else if (hour >= endHour) {
          moveToNextWindowStart();
        }
      };

      alignToWindow();

      while (remaining > 0) {
        // compute time until end of window today
        const endToday = clone(current);
        const endHourFloor = Math.floor(endHour);
        const endMinutes = Math.round((endHour - endHourFloor) * 60);
        setTime(endToday, endHourFloor, endMinutes);
        const diffMs = endToday.getTime() - current.getTime();
        const diffHours = Math.max(0, diffMs / (1000 * 60 * 60));
        if (remaining <= diffHours) {
          current.setHours(current.getHours() + remaining);
          remaining = 0;
          break;
        } else {
          remaining -= diffHours;
          moveToNextWindowStart();
        }
      }
      return current;
    };

    switch (schedule) {
      case '247': {
        return addHours247(start, hours);
      }
      case 'weekday24': {
        return addHoursWeekdaysOnly(start, hours);
      }
      case 'biz_9_17': {
        return addHoursWithinBusinessWindow(start, hours, {
          startHour: 9,
          endHour: 17,
          weekdaysOnly: true,
        });
      }
      case 'biz_8_18': {
        return addHoursWithinBusinessWindow(start, hours, {
          startHour: 8,
          endHour: 18,
          weekdaysOnly: true,
        });
      }
      default:
        return addHours247(start, hours);
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
        <Label>Schedule</Label>
        <Select value={schedule} onChange={(e) => setSchedule(e.target.value)}>
          <option value="247">24/7</option>
          <option value="weekday24">Weekdays Only (24h, Mon–Fri)</option>
          <option value="biz_9_17">Business Hours (9 AM – 5 PM, Mon–Fri)</option>
          <option value="biz_8_18">Extended Business (8 AM – 6 PM, Mon–Fri)</option>
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

