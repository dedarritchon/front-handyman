import { useState } from 'react';
import styled from 'styled-components';
import { fromZonedTime, toZonedTime, formatInTimeZone } from 'date-fns-tz';

import {
  FormGroup,
  Input,
  Label,
  Select,
} from '../common/FormElements';
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

const InputRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 12px;
  margin-bottom: 24px;
`;

const TimezoneGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 10px;
  margin-top: 16px;
`;

const TimezoneCard = styled.div<{ $isBase?: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px 14px;
  border: 2px solid ${(props) => (props.$isBase ? '#0d6efd' : '#dee2e6')};
  border-radius: 8px;
  background-color: ${(props) => (props.$isBase ? '#e7f1ff' : 'white')};
  transition: all 0.2s;
  min-height: 60px;
  overflow: hidden;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }
`;

const TimezoneInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 0 0 auto;
  min-width: 120px;
  max-width: 50%;
`;

const TimezoneFlag = styled.span`
  font-size: 24px;
  flex-shrink: 0;
`;

const TimezoneDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
`;

const TimezoneCode = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #212529;
  white-space: nowrap;
`;

const TimezoneName = styled.div`
  font-size: 11px;
  color: #6c757d;
  white-space: nowrap;
`;

const ConvertedTime = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #212529;
  margin: 0 8px;
  word-break: break-all;
  text-align: right;
  flex: 1;
  min-width: 0;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CopyButton = styled.button`
  padding: 6px 10px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  background-color: white;
  color: #6c757d;
  font-size: 11px;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
  white-space: nowrap;

  &:hover {
    background-color: #f8f9fa;
    color: #212529;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
  justify-content: flex-end;
`;

function TimeZoneConverter() {
  const [time, setTime] = useState('12:00');
  const [baseTimezone, setBaseTimezone] = useState('UTC');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const convertTime = (timeString: string, fromTimezone: string, toTimezone: string) => {
    try {
      // Create a date object for today with the given time
      const [hours, minutes] = timeString.split(':').map(Number);
      const today = new Date();
      const dateWithTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes);
      
      // Convert from source timezone to UTC
      const utcDate = fromZonedTime(dateWithTime, fromTimezone);
      
      // Convert from UTC to target timezone
      const targetDate = toZonedTime(utcDate, toTimezone);
      
      // Format the time using formatInTimeZone
      return formatInTimeZone(targetDate, toTimezone, 'HH:mm');
    } catch (error) {
      console.error('Timezone conversion error:', error);
      return 'Error';
    }
  };

  const convertAll = () => {
    if (!time) return {};

    const results: Record<string, string> = {};
    
    TIMEZONES.forEach((tz) => {
      if (tz.timezone !== baseTimezone) {
        results[tz.label] = convertTime(time, baseTimezone, tz.timezone);
      }
    });

    return results;
  };

  const conversions = convertAll();
  const hasValidTime = time && time.includes(':');

  const getBaseTimezone = () => {
    return TIMEZONES.find(tz => tz.timezone === baseTimezone) || TIMEZONES[0];
  };

  return (
    <ToolCard
      title="Time Zone Converter"
      icon="🌍"
      description="Convert time between different time zones"
    >
      <InputRow>
        <FormGroup>
          <Label>Time</Label>
          <Input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Base Time Zone</Label>
          <Select
            value={baseTimezone}
            onChange={(e) => setBaseTimezone(e.target.value)}
          >
            {TIMEZONES.map((tz) => (
              <option key={tz.label} value={tz.timezone}>
                {tz.flag} {tz.label}
              </option>
            ))}
          </Select>
        </FormGroup>
      </InputRow>

      {hasValidTime && (
        <>
          {/* Show base timezone card */}
          <TimezoneCard $isBase>
            <TimezoneInfo>
              <TimezoneFlag>{getBaseTimezone().flag}</TimezoneFlag>
              <TimezoneDetails>
                <TimezoneCode>{getBaseTimezone().code}</TimezoneCode>
                <TimezoneName>{getBaseTimezone().label}</TimezoneName>
              </TimezoneDetails>
            </TimezoneInfo>
            <ConvertedTime>{time}</ConvertedTime>
          </TimezoneCard>

          <TimezoneGrid>
            {Object.entries(conversions).map(([timezoneLabel, convertedTime]) => {
              const timezone = TIMEZONES.find(tz => tz.label === timezoneLabel);
              if (!timezone) return null;

              return (
                <TimezoneCard key={timezoneLabel}>
                  <TimezoneInfo>
                    <TimezoneFlag>{timezone.flag}</TimezoneFlag>
                    <TimezoneDetails>
                      <TimezoneCode>{timezone.code}</TimezoneCode>
                      <TimezoneName>{timezone.label}</TimezoneName>
                    </TimezoneDetails>
                  </TimezoneInfo>
                  <RightSection>
                    <ConvertedTime>{convertedTime}</ConvertedTime>
                    <CopyButton 
                      onClick={() => copyToClipboard(convertedTime)}
                    >
                      Copy
                    </CopyButton>
                  </RightSection>
                </TimezoneCard>
              );
            })}
          </TimezoneGrid>
        </>
      )}
    </ToolCard>
  );
}

export default TimeZoneConverter;

