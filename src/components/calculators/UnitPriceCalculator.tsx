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

function UnitPriceCalculator() {
  const [totalPrice, setTotalPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('items');

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

      <FormGroup>
        <Label>Unit Type</Label>
        <Select value={unit} onChange={(e) => setUnit(e.target.value)}>
          <option value="items">Items</option>
          <option value="kg">Kilograms (kg)</option>
          <option value="lb">Pounds (lb)</option>
          <option value="oz">Ounces (oz)</option>
          <option value="L">Liters (L)</option>
          <option value="gal">Gallons (gal)</option>
          <option value="m">Meters (m)</option>
          <option value="ft">Feet (ft)</option>
        </Select>
      </FormGroup>

      {unitPrice !== null && (
        <Result>
          <ResultLabel>Unit Price</ResultLabel>
          <ResultValue>
            ${unitPrice.toFixed(4)} per {unit}
          </ResultValue>
        </Result>
      )}
    </ToolCard>
  );
}

export default UnitPriceCalculator;

