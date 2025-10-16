import { useState, useEffect } from 'react';
import styled from 'styled-components';

import {
  FormGroup,
  Input,
  Label,
  Select,
} from '../common/FormElements';
import ToolCard from '../common/ToolCard';

// Currency flags mapping (ISO codes to flag emojis)
const CURRENCY_FLAGS: Record<string, string> = {
  usd: '🇺🇸', eur: '🇪🇺', gbp: '🇬🇧', jpy: '🇯🇵', cad: '🇨🇦',
  aud: '🇦🇺', chf: '🇨🇭', cny: '🇨🇳', inr: '🇮🇳', mxn: '🇲🇽',
  brl: '🇧🇷', krw: '🇰🇷', sgd: '🇸🇬', nzd: '🇳🇿', sek: '🇸🇪',
  nok: '🇳🇴', dkk: '🇩🇰', pln: '🇵🇱', thb: '🇹🇭', aed: '🇦🇪',
  rub: '🇷🇺', zar: '🇿🇦', try: '🇹🇷', hkd: '🇭🇰', idr: '🇮🇩',
  php: '🇵🇭', myr: '🇲🇾', czk: '🇨🇿', huf: '🇭🇺', ils: '🇮🇱',
  clp: '🇨🇱', sar: '🇸🇦', pkr: '🇵🇰', egp: '🇪🇬', ngn: '🇳🇬',
  vnd: '🇻🇳', bdt: '🇧🇩', ars: '🇦🇷', kes: '🇰🇪', cop: '🇨🇴',
};

const InputRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 12px;
  margin-bottom: 24px;
`;

const CurrencyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 10px;
  margin-top: 16px;
`;

const CurrencyCard = styled.div<{ $isBase?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  border: 2px solid ${(props) => (props.$isBase ? '#0d6efd' : '#dee2e6')};
  border-radius: 8px;
  background-color: ${(props) => (props.$isBase ? '#e7f1ff' : 'white')};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }
`;

const CurrencyInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
`;

const Flag = styled.span`
  font-size: 24px;
`;

const CurrencyDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
`;

const CurrencyCode = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #212529;
`;

const CurrencyName = styled.div`
  font-size: 11px;
  color: #6c757d;
`;

const ExchangeRate = styled.div`
  font-size: 10px;
  color: #6c757d;
  margin-top: 2px;
  font-weight: 500;
`;

const ConvertedValue = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #212529;
  margin-right: 8px;
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
  gap: 8px;
`;

const InfoNote = styled.div`
  font-size: 12px;
  color: #6c757d;
  margin-top: 16px;
  padding: 8px 12px;
  background-color: #f8f9fa;
  border-radius: 6px;
  text-align: center;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #6c757d;
  font-size: 14px;
`;

const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #842029;
  border: 1px solid #f5c2c7;
  padding: 12px;
  border-radius: 6px;
  margin-top: 12px;
  font-size: 14px;
`;

const RefreshButton = styled.button`
  padding: 6px 12px;
  border: 1px solid #0d6efd;
  border-radius: 4px;
  background-color: white;
  color: #0d6efd;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
  margin-left: 8px;

  &:hover {
    background-color: #0d6efd;
    color: white;
  }

  &:active {
    transform: scale(0.95);
  }
`;

interface CurrencyData {
  [key: string]: string;
}

interface ExchangeRates {
  [key: string]: number;
}

function CurrencyConverter() {
  const [amount, setAmount] = useState('100');
  const [baseCurrency, setBaseCurrency] = useState('usd');
  const [currencies, setCurrencies] = useState<CurrencyData>({});
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');

  // Popular currencies to show first
  const popularCurrencies = ['usd', 'eur', 'gbp', 'jpy', 'cad', 'aud', 'chf', 'cny', 
    'inr', 'mxn', 'brl', 'krw', 'sgd', 'nzd', 'sek', 'nok', 'dkk', 'pln', 'thb', 'aed'];

  const fetchCurrencies = async () => {
    try {
      const response = await fetch(
        'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json'
      );
      const data = await response.json();
      
      // Filter to only include fiat currencies (exclude crypto)
      const fiatCurrencies: CurrencyData = {};
      Object.entries(data).forEach(([code, name]) => {
        if (typeof name === 'string' && code.length === 3) {
          fiatCurrencies[code] = name as string;
        }
      });
      
      setCurrencies(fiatCurrencies);
    } catch (err) {
      setError('Failed to load currency list');
      console.error(err);
    }
  };

  const fetchExchangeRates = async (base: string) => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${base}.json`
      );
      const data = await response.json();
      
      setExchangeRates(data[base] || {});
      setLastUpdated(data.date || new Date().toISOString().split('T')[0]);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch exchange rates');
      setLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  useEffect(() => {
    if (baseCurrency) {
      fetchExchangeRates(baseCurrency);
    }
  }, [baseCurrency]);

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  const convertAll = () => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || !exchangeRates) return {};

    const results: Record<string, number> = {};
    
    Object.entries(exchangeRates).forEach(([currency, rate]) => {
      if (currency !== baseCurrency && typeof rate === 'number') {
        results[currency] = amt * rate;
      }
    });

    return results;
  };

  const conversions = convertAll();
  
  // Sort to show popular currencies first
  const sortedConversions = Object.entries(conversions).sort((a, b) => {
    const aIndex = popularCurrencies.indexOf(a[0]);
    const bIndex = popularCurrencies.indexOf(b[0]);
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return a[0].localeCompare(b[0]);
  });

  const hasValidAmount = amount && !isNaN(parseFloat(amount));
  const availableCurrencies = Object.keys(currencies).length > 0 
    ? Object.keys(currencies).filter(code => popularCurrencies.includes(code))
    : popularCurrencies;

  return (
    <ToolCard
      title="Currency Converter"
      icon="💱"
      description="Live exchange rates for all major currencies"
    >
      <InputRow>
        <FormGroup>
          <Label>Amount</Label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            autoFocus
          />
        </FormGroup>

        <FormGroup>
          <Label>Base Currency</Label>
          <Select
            value={baseCurrency}
            onChange={(e) => setBaseCurrency(e.target.value)}
            disabled={loading}
          >
            {availableCurrencies.map((code) => (
              <option key={code} value={code}>
                {CURRENCY_FLAGS[code] || '💱'} {code.toUpperCase()} - {currencies[code] || code}
              </option>
            ))}
          </Select>
        </FormGroup>
      </InputRow>

      {error && (
        <ErrorMessage>
          ❌ {error}
          <RefreshButton onClick={() => fetchExchangeRates(baseCurrency)}>
            Retry
          </RefreshButton>
        </ErrorMessage>
      )}

      {loading && !error && (
        <LoadingMessage>Loading exchange rates... 💱</LoadingMessage>
      )}

      {!loading && !error && hasValidAmount && (
        <>
          {/* Show base currency card */}
          <CurrencyCard $isBase>
            <CurrencyInfo>
              <Flag>{CURRENCY_FLAGS[baseCurrency] || '💱'}</Flag>
              <CurrencyDetails>
                <CurrencyCode>{baseCurrency.toUpperCase()}</CurrencyCode>
                <CurrencyName>{currencies[baseCurrency] || baseCurrency}</CurrencyName>
              </CurrencyDetails>
            </CurrencyInfo>
            <ConvertedValue>{parseFloat(amount).toFixed(2)}</ConvertedValue>
          </CurrencyCard>

          <CurrencyGrid>
            {sortedConversions.slice(0, 30).map(([currency, value]) => {
              const rate = exchangeRates[currency];
              const rateText = rate ? `1 ${baseCurrency.toUpperCase()} = ${rate.toFixed(4)} ${currency.toUpperCase()}` : '';
              
              return (
                <CurrencyCard key={currency}>
                  <CurrencyInfo>
                    <Flag>{CURRENCY_FLAGS[currency] || '💱'}</Flag>
                    <CurrencyDetails>
                      <CurrencyCode>{currency.toUpperCase()}</CurrencyCode>
                      <CurrencyName>{currencies[currency] || currency}</CurrencyName>
                      {rateText && <ExchangeRate>{rateText}</ExchangeRate>}
                    </CurrencyDetails>
                  </CurrencyInfo>
                  <RightSection>
                    <ConvertedValue>{value.toFixed(2)}</ConvertedValue>
                    <CopyButton onClick={() => copyToClipboard(value.toFixed(2))}>
                      Copy
                    </CopyButton>
                  </RightSection>
                </CurrencyCard>
              );
            })}
          </CurrencyGrid>

          <InfoNote>
            📅 Rates updated: {lastUpdated}

            {' '}
            Via <a href="https://github.com/fawazahmed0/currency-api" target="_blank" rel="noopener noreferrer">Currency API</a>
            <RefreshButton onClick={() => fetchExchangeRates(baseCurrency)}>
              Refresh
            </RefreshButton>
          </InfoNote>
        </>
      )}
    </ToolCard>
  );
}

export default CurrencyConverter;

