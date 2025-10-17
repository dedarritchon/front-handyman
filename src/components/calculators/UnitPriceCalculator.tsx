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

function UnitPriceCalculator() {
  const [totalPrice, setTotalPrice] = useState('100');
  const [quantity, setQuantity] = useState('10');

  const calculateUnitPrice = () => {
    const price = parseFloat(totalPrice);
    const qty = parseFloat(quantity);
    if (!isNaN(price) && !isNaN(qty) && qty !== 0) {
      return price / qty;
    }
    return null;
  };

  const unitPrice = calculateUnitPrice();

  return (
    <ToolCard
      title="Unit Price Calculator"
      icon="📊"
      description="Calculate cost per unit or weight"
    >
      <FormGroup>
        <Label>Total Price ($)</Label>
        <Input
          type="number"
          value={totalPrice}
          onChange={(e) => setTotalPrice(e.target.value)}
          placeholder="Enter total price"
        />
      </FormGroup>

      <FormGroup>
        <Label>Quantity</Label>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Enter quantity"
        />
      </FormGroup>

      {unitPrice !== null && (
        <Result>
          <ResultLabel>Unit Price</ResultLabel>
          <ResultValue>
            ${unitPrice.toFixed(2)} per unit
          </ResultValue>
        </Result>
      )}
    </ToolCard>
  );
}

export default UnitPriceCalculator;

