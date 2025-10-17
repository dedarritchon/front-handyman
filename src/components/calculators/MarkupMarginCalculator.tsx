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

function MarkupMarginCalculator() {
  const [cost, setCost] = useState('100');
  const [price, setPrice] = useState('120');

  const calculateMarkup = () => {
    const costVal = parseFloat(cost);
    const priceVal = parseFloat(price);
    if (!isNaN(costVal) && !isNaN(priceVal) && costVal !== 0) {
      return ((priceVal - costVal) / costVal) * 100;
    }
    return null;
  };

  const calculateMargin = () => {
    const costVal = parseFloat(cost);
    const priceVal = parseFloat(price);
    if (!isNaN(costVal) && !isNaN(priceVal) && priceVal !== 0) {
      return ((priceVal - costVal) / priceVal) * 100;
    }
    return null;
  };

  const calculateProfit = () => {
    const costVal = parseFloat(cost);
    const priceVal = parseFloat(price);
    if (!isNaN(costVal) && !isNaN(priceVal)) {
      return priceVal - costVal;
    }
    return null;
  };

  const markup = calculateMarkup();
  const margin = calculateMargin();
  const profit = calculateProfit();

  return (
    <ToolCard
      title="Markup/Margin Calculator"
      icon="💰"
      description="Calculate pricing and profitability"
    >
      <FormGroup>
        <Label>Cost ($)</Label>
        <Input
          type="number"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          placeholder="Enter cost"
        />
      </FormGroup>

      <FormGroup>
        <Label>Selling Price ($)</Label>
        <Input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter selling price"
        />
      </FormGroup>

      {profit !== null && (
        <Result>
          <ResultLabel>Profit</ResultLabel>
          <ResultValue>${profit.toFixed(2)}</ResultValue>
        </Result>
      )}

      {markup !== null && (
        <Result>
          <ResultLabel>Markup</ResultLabel>
          <ResultValue>{markup.toFixed(2)}%</ResultValue>
        </Result>
      )}

      {margin !== null && (
        <Result>
          <ResultLabel>Margin</ResultLabel>
          <ResultValue>{margin.toFixed(2)}%</ResultValue>
        </Result>
      )}
    </ToolCard>
  );
}

export default MarkupMarginCalculator;

