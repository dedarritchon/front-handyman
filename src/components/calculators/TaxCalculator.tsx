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

function TaxCalculator() {
  const [amount, setAmount] = useState('100');
  const [taxRate, setTaxRate] = useState('10');

  const calculateTaxAmount = () => {
    const amt = parseFloat(amount);
    const rate = parseFloat(taxRate);
    if (!isNaN(amt) && !isNaN(rate)) {
      return (amt * rate) / 100;
    }
    return null;
  };

  const calculateTotal = () => {
    const amt = parseFloat(amount);
    const tax = calculateTaxAmount();
    if (!isNaN(amt) && tax !== null) {
      return amt + tax;
    }
    return null;
  };

  const calculatePreTaxAmount = () => {
    const total = parseFloat(amount);
    const rate = parseFloat(taxRate);
    if (!isNaN(total) && !isNaN(rate)) {
      return total / (1 + rate / 100);
    }
    return null;
  };

  const taxAmount = calculateTaxAmount();
  const total = calculateTotal();
  const preTax = calculatePreTaxAmount();

  return (
    <ToolCard
      title="Tax/VAT Calculator"
      icon="🧾"
      description="Calculate tax or reverse-calculate pre-tax amount"
    >
      <FormGroup>
        <Label>Amount ($)</Label>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
      </FormGroup>

      <FormGroup>
        <Label>Tax Rate (%)</Label>
        <Input
          type="number"
          value={taxRate}
          onChange={(e) => setTaxRate(e.target.value)}
          placeholder="Enter tax rate"
        />
      </FormGroup>

      {taxAmount !== null && (
        <>
          <Result>
            <ResultLabel>Tax Amount</ResultLabel>
            <ResultValue>${taxAmount.toFixed(2)}</ResultValue>
          </Result>

          <Result>
            <ResultLabel>Total (Amount + Tax)</ResultLabel>
            <ResultValue>${total?.toFixed(2)}</ResultValue>
          </Result>
        </>
      )}

      {preTax !== null && (
        <Result>
          <ResultLabel>Pre-Tax Amount (if {amount} includes tax)</ResultLabel>
          <ResultValue>${preTax.toFixed(2)}</ResultValue>
        </Result>
      )}
    </ToolCard>
  );
}

export default TaxCalculator;

