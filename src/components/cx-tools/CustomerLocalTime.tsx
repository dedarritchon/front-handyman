import { useEffect, useState } from 'react';
import { fromZonedTime, toZonedTime, formatInTimeZone } from 'date-fns-tz';

import { FormGroup, Label, Result, ResultLabel, ResultValue, Select } from '../common/FormElements';
import ToolCard from '../common/ToolCard';

const TIMEZONES = [
  // UTC
  { label: 'UTC', timezone: 'UTC', flag: '🌍', code: 'UTC' },
  
  // Americas - North America
  { label: 'New York (EST/EDT)', timezone: 'America/New_York', flag: '🇺🇸', code: 'EST' },
  { label: 'Chicago (CST/CDT)', timezone: 'America/Chicago', flag: '🇺🇸', code: 'CST' },
  { label: 'Denver (MST/MDT)', timezone: 'America/Denver', flag: '🇺🇸', code: 'MST' },
  { label: 'Los Angeles (PST/PDT)', timezone: 'America/Los_Angeles', flag: '🇺🇸', code: 'PST' },
  { label: 'Toronto (EST/EDT)', timezone: 'America/Toronto', flag: '🇨🇦', code: 'EST' },
  { label: 'Vancouver (PST/PDT)', timezone: 'America/Vancouver', flag: '🇨🇦', code: 'PST' },
  { label: 'Mexico City (CST/CDT)', timezone: 'America/Mexico_City', flag: '🇲🇽', code: 'CST' },
  
  // Americas - South America
  { label: 'São Paulo (BRT)', timezone: 'America/Sao_Paulo', flag: '🇧🇷', code: 'BRT' },
  { label: 'Buenos Aires (ART)', timezone: 'America/Argentina/Buenos_Aires', flag: '🇦🇷', code: 'ART' },
  { label: 'Lima (PET)', timezone: 'America/Lima', flag: '🇵🇪', code: 'PET' },
  { label: 'Bogotá (COT)', timezone: 'America/Bogota', flag: '🇨🇴', code: 'COT' },
  { label: 'Caracas (VET)', timezone: 'America/Caracas', flag: '🇻🇪', code: 'VET' },
  { label: 'Santiago (CLT)', timezone: 'America/Santiago', flag: '🇨🇱', code: 'CLT' },
  { label: 'Montevideo (UYT)', timezone: 'America/Montevideo', flag: '🇺🇾', code: 'UYT' },
  { label: 'La Paz (BOT)', timezone: 'America/La_Paz', flag: '🇧🇴', code: 'BOT' },
  { label: 'Asunción (PYT)', timezone: 'America/Asuncion', flag: '🇵🇾', code: 'PYT' },
  
  // Europe - Western
  { label: 'London (GMT/BST)', timezone: 'Europe/London', flag: '🇬🇧', code: 'GMT' },
  { label: 'Paris (CET/CEST)', timezone: 'Europe/Paris', flag: '🇫🇷', code: 'CET' },
  { label: 'Berlin (CET/CEST)', timezone: 'Europe/Berlin', flag: '🇩🇪', code: 'CET' },
  { label: 'Madrid (CET/CEST)', timezone: 'Europe/Madrid', flag: '🇪🇸', code: 'CET' },
  { label: 'Rome (CET/CEST)', timezone: 'Europe/Rome', flag: '🇮🇹', code: 'CET' },
  { label: 'Amsterdam (CET/CEST)', timezone: 'Europe/Amsterdam', flag: '🇳🇱', code: 'CET' },
  { label: 'Dublin (GMT/IST)', timezone: 'Europe/Dublin', flag: '🇮🇪', code: 'GMT' },
  { label: 'Lisbon (WET/WEST)', timezone: 'Europe/Lisbon', flag: '🇵🇹', code: 'WET' },
  { label: 'Zurich (CET/CEST)', timezone: 'Europe/Zurich', flag: '🇨🇭', code: 'CET' },
  
  // Europe - Eastern
  { label: 'Moscow (MSK)', timezone: 'Europe/Moscow', flag: '🇷🇺', code: 'MSK' },
  { label: 'Istanbul (TRT)', timezone: 'Europe/Istanbul', flag: '🇹🇷', code: 'TRT' },
  { label: 'Athens (EET/EEST)', timezone: 'Europe/Athens', flag: '🇬🇷', code: 'EET' },
  { label: 'Warsaw (CET/CEST)', timezone: 'Europe/Warsaw', flag: '🇵🇱', code: 'CET' },
  { label: 'Prague (CET/CEST)', timezone: 'Europe/Prague', flag: '🇨🇿', code: 'CET' },
  { label: 'Budapest (CET/CEST)', timezone: 'Europe/Budapest', flag: '🇭🇺', code: 'CET' },
  { label: 'Vienna (CET/CEST)', timezone: 'Europe/Vienna', flag: '🇦🇹', code: 'CET' },
  
  // Europe - Nordic
  { label: 'Stockholm (CET/CEST)', timezone: 'Europe/Stockholm', flag: '🇸🇪', code: 'CET' },
  { label: 'Oslo (CET/CEST)', timezone: 'Europe/Oslo', flag: '🇳🇴', code: 'CET' },
  { label: 'Copenhagen (CET/CEST)', timezone: 'Europe/Copenhagen', flag: '🇩🇰', code: 'CET' },
  { label: 'Helsinki (EET/EEST)', timezone: 'Europe/Helsinki', flag: '🇫🇮', code: 'EET' },
  
  // Asia - Middle East
  { label: 'Dubai (GST)', timezone: 'Asia/Dubai', flag: '🇦🇪', code: 'GST' },
  { label: 'Riyadh (AST)', timezone: 'Asia/Riyadh', flag: '🇸🇦', code: 'AST' },
  { label: 'Tehran (IRST)', timezone: 'Asia/Tehran', flag: '🇮🇷', code: 'IRST' },
  { label: 'Jerusalem (IST/IDT)', timezone: 'Asia/Jerusalem', flag: '🇮🇱', code: 'IST' },
  { label: 'Kuwait (AST)', timezone: 'Asia/Kuwait', flag: '🇰🇼', code: 'AST' },
  { label: 'Bahrain (AST)', timezone: 'Asia/Bahrain', flag: '🇧🇭', code: 'AST' },
  
  // Asia - South Asia
  { label: 'Mumbai (IST)', timezone: 'Asia/Kolkata', flag: '🇮🇳', code: 'IST' },
  { label: 'Karachi (PKT)', timezone: 'Asia/Karachi', flag: '🇵🇰', code: 'PKT' },
  { label: 'Dhaka (BST)', timezone: 'Asia/Dhaka', flag: '🇧🇩', code: 'BST' },
  
  // Asia - Southeast Asia
  { label: 'Bangkok (ICT)', timezone: 'Asia/Bangkok', flag: '🇹🇭', code: 'ICT' },
  { label: 'Singapore (SGT)', timezone: 'Asia/Singapore', flag: '🇸🇬', code: 'SGT' },
  { label: 'Kuala Lumpur (MYT)', timezone: 'Asia/Kuala_Lumpur', flag: '🇲🇾', code: 'MYT' },
  { label: 'Jakarta (WIB)', timezone: 'Asia/Jakarta', flag: '🇮🇩', code: 'WIB' },
  { label: 'Manila (PHT)', timezone: 'Asia/Manila', flag: '🇵🇭', code: 'PHT' },
  { label: 'Ho Chi Minh (ICT)', timezone: 'Asia/Ho_Chi_Minh', flag: '🇻🇳', code: 'ICT' },
  
  // Asia - East Asia
  { label: 'Hong Kong (HKT)', timezone: 'Asia/Hong_Kong', flag: '🇭🇰', code: 'HKT' },
  { label: 'Shanghai (CST)', timezone: 'Asia/Shanghai', flag: '🇨🇳', code: 'CST' },
  { label: 'Tokyo (JST)', timezone: 'Asia/Tokyo', flag: '🇯🇵', code: 'JST' },
  { label: 'Seoul (KST)', timezone: 'Asia/Seoul', flag: '🇰🇷', code: 'KST' },
  
  // Oceania
  { label: 'Sydney (AEST/AEDT)', timezone: 'Australia/Sydney', flag: '🇦🇺', code: 'AEST' },
  { label: 'Melbourne (AEST/AEDT)', timezone: 'Australia/Melbourne', flag: '🇦🇺', code: 'AEST' },
  { label: 'Perth (AWST)', timezone: 'Australia/Perth', flag: '🇦🇺', code: 'AWST' },
  { label: 'Auckland (NZST/NZDT)', timezone: 'Pacific/Auckland', flag: '🇳🇿', code: 'NZST' },
  { label: 'Fiji (FJT)', timezone: 'Pacific/Fiji', flag: '🇫🇯', code: 'FJT' },
  { label: 'Honolulu (HST)', timezone: 'Pacific/Honolulu', flag: '🇺🇸', code: 'HST' },
  
  // Africa
  { label: 'Cairo (EET)', timezone: 'Africa/Cairo', flag: '🇪🇬', code: 'EET' },
  { label: 'Lagos (WAT)', timezone: 'Africa/Lagos', flag: '🇳🇬', code: 'WAT' },
  { label: 'Johannesburg (SAST)', timezone: 'Africa/Johannesburg', flag: '🇿🇦', code: 'SAST' },
  { label: 'Nairobi (EAT)', timezone: 'Africa/Nairobi', flag: '🇰🇪', code: 'EAT' },
  { label: 'Casablanca (WET)', timezone: 'Africa/Casablanca', flag: '🇲🇦', code: 'WET' },
  { label: 'Tunis (CET)', timezone: 'Africa/Tunis', flag: '🇹🇳', code: 'CET' },
  { label: 'Algiers (CET)', timezone: 'Africa/Algiers', flag: '🇩🇿', code: 'CET' },
];

function CustomerLocalTime() {
  const [customerTimezone, setCustomerTimezone] = useState('America/New_York');
  const [customerTime, setCustomerTime] = useState('');
  const [myTime, setMyTime] = useState('');

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const myLocalTime = now.toLocaleTimeString();

      // Calculate customer's local time using proper timezone conversion
      try {
        const customerDate = toZonedTime(now, customerTimezone);
        const customerTimeString = formatInTimeZone(now, customerTimezone, 'HH:mm:ss');
        setCustomerTime(customerTimeString);
      } catch (error) {
        console.error('Timezone conversion error:', error);
        setCustomerTime('Error');
      }

      setMyTime(myLocalTime);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);

    return () => clearInterval(interval);
  }, [customerTimezone]);

  const customerTz = TIMEZONES.find(
    (tz) => tz.timezone === customerTimezone
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
            <option key={tz.label} value={tz.timezone}>
              {tz.flag} {tz.label}
            </option>
          ))}
        </Select>
      </FormGroup>

      <Result>
        <ResultLabel>Your Local Time</ResultLabel>
        <ResultValue>{myTime}</ResultValue>
      </Result>

      <Result>
        <ResultLabel>
          Customer's Time ({customerTz?.flag} {customerTz?.code})
        </ResultLabel>
        <ResultValue>{customerTime}</ResultValue>
      </Result>
    </ToolCard>
  );
}

export default CustomerLocalTime;

