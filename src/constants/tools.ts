import { Tool } from '../types/tools';

// Import tool components
import BasicCalculator from '../components/calculators/BasicCalculator';
import MarkupMarginCalculator from '../components/calculators/MarkupMarginCalculator';
import PercentageCalculator from '../components/calculators/PercentageCalculator';
import TaxCalculator from '../components/calculators/TaxCalculator';
import UnitPriceCalculator from '../components/calculators/UnitPriceCalculator';
import CurrencyConverter from '../components/converters/CurrencyConverter';
import AreaConverter from '../components/converters/AreaConverter';
import LengthConverter from '../components/converters/LengthConverter';
import SpeedConverter from '../components/converters/SpeedConverter';
import TemperatureConverter from '../components/converters/TemperatureConverter';
import TimeZoneConverter from '../components/converters/TimeZoneConverter';
import VolumeConverter from '../components/converters/VolumeConverter';
import WeightConverter from '../components/converters/WeightConverter';
import CustomerLocalTime from '../components/cx-tools/CustomerLocalTime';
import ETACalculator from '../components/cx-tools/ETACalculator';
import ResponseTimeCalculator from '../components/cx-tools/ResponseTimeCalculator';
import SLADeadlineEstimator from '../components/cx-tools/SLADeadlineEstimator';
import SnippetRandomizer from '../components/cx-tools/SnippetRandomizer';
import Base64Tool from '../components/utilities/Base64Tool';
import ClipboardCleaner from '../components/utilities/ClipboardCleaner';
import ColorPicker from '../components/utilities/ColorPicker';
import JSONFormatter from '../components/utilities/JSONFormatter';
import TextCaseConverter from '../components/utilities/TextCaseConverter';
import URLEncoderDecoder from '../components/utilities/URLEncoderDecoder';

export const TOOLS: Tool[] = [
  // Calculators
  {
    id: 'basic-calculator',
    name: 'Calculator',
    description: 'Advanced calculator with history and scientific functions',
    category: 'calculators',
    icon: '🧮',
    component: BasicCalculator,
  },
  {
    id: 'percentage-calculator',
    name: 'Percentage Calculator',
    description: 'For discounts, commissions, or refunds',
    category: 'calculators',
    icon: '%',
    component: PercentageCalculator,
  },
  {
    id: 'markup-margin-calculator',
    name: 'Markup/Margin Calculator',
    description: 'For pricing and profitability checks',
    category: 'calculators',
    icon: '💰',
    component: MarkupMarginCalculator,
  },
  {
    id: 'tax-calculator',
    name: 'Tax/VAT Calculator',
    description: 'Quick total or reverse-tax calculations',
    category: 'calculators',
    icon: '🧾',
    component: TaxCalculator,
  },
  {
    id: 'currency-converter',
    name: 'Currency Converter',
    description: 'Live exchange rates with all conversions at once',
    category: 'converters',
    icon: '💱',
    component: CurrencyConverter,
  },
  {
    id: 'unit-price-calculator',
    name: 'Unit Price Calculator',
    description: 'Cost per unit or weight',
    category: 'calculators',
    icon: '📊',
    component: UnitPriceCalculator,
  },

  // Converters
  {
    id: 'length-converter',
    name: 'Length Converter',
    description: 'm ↔ ft, cm ↔ in',
    category: 'converters',
    icon: '📏',
    component: LengthConverter,
  },
  {
    id: 'weight-converter',
    name: 'Weight Converter',
    description: 'kg ↔ lb',
    category: 'converters',
    icon: '⚖️',
    component: WeightConverter,
  },
  {
    id: 'volume-converter',
    name: 'Volume Converter',
    description: 'L ↔ gal, mL ↔ fl oz',
    category: 'converters',
    icon: '🥤',
    component: VolumeConverter,
  },
  {
    id: 'temperature-converter',
    name: 'Temperature Converter',
    description: '°C ↔ °F',
    category: 'converters',
    icon: '🌡️',
    component: TemperatureConverter,
  },
  {
    id: 'area-converter',
    name: 'Area Converter',
    description: 'm² ↔ ft²',
    category: 'converters',
    icon: '📐',
    component: AreaConverter,
  },
  {
    id: 'speed-converter',
    name: 'Speed Converter',
    description: 'km/h ↔ mph',
    category: 'converters',
    icon: '🚗',
    component: SpeedConverter,
  },
  {
    id: 'timezone-converter',
    name: 'Time Zone Converter',
    description: 'Show local vs customer time',
    category: 'converters',
    icon: '🌍',
    component: TimeZoneConverter,
  },

  // Utilities
  {
    id: 'text-case-converter',
    name: 'Text Case Converter',
    description: 'Uppercase, lowercase, title case',
    category: 'utilities',
    icon: '🔤',
    component: TextCaseConverter,
  },
  {
    id: 'url-encoder-decoder',
    name: 'URL Encoder/Decoder',
    description: 'Encode and decode URLs',
    category: 'utilities',
    icon: '🔗',
    component: URLEncoderDecoder,
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format and validate JSON',
    category: 'utilities',
    icon: '{ }',
    component: JSONFormatter,
  },
  {
    id: 'base64-tool',
    name: 'Base64 Encoder/Decoder',
    description: 'Encode and decode Base64',
    category: 'utilities',
    icon: '🔐',
    component: Base64Tool,
  },
  {
    id: 'color-picker',
    name: 'Color Picker',
    description: 'HEX ↔ RGB converter',
    category: 'utilities',
    icon: '🎨',
    component: ColorPicker,
  },
  {
    id: 'clipboard-cleaner',
    name: 'Text Cleaner',
    description: 'Trim, remove HTML, etc.',
    category: 'utilities',
    icon: '📋',
    component: ClipboardCleaner,
  },

  // CX Tools
  {
    id: 'response-time-calculator',
    name: 'Response Time Calculator',
    description: 'Between two timestamps',
    category: 'cx-tools',
    icon: '⏱️',
    component: ResponseTimeCalculator,
  },
  {
    id: 'sla-deadline-estimator',
    name: 'SLA Deadline Estimator',
    description: 'Based on working hours',
    category: 'cx-tools',
    icon: '📅',
    component: SLADeadlineEstimator,
  },
  {
    id: 'eta-calculator',
    name: 'ETA Calculator',
    description: 'Given shipping times or delays',
    category: 'cx-tools',
    icon: '📦',
    component: ETACalculator,
  },
  {
    id: 'customer-local-time',
    name: 'Customer Local Time',
    description: 'Based on their timezone',
    category: 'cx-tools',
    icon: '🕐',
    component: CustomerLocalTime,
  },
  {
    id: 'snippet-randomizer',
    name: 'Snippet Randomizer',
    description: 'Choose from pre-set responses',
    category: 'cx-tools',
    icon: '🎲',
    component: SnippetRandomizer,
  },
];

export const CATEGORY_LABELS = {
  calculators: 'Calculators',
  converters: 'Converters',
  utilities: 'Utilities',
  'cx-tools': 'CX Tools',
} as const;

export const CATEGORY_DESCRIPTIONS = {
  calculators: 'Useful for support reps dealing with invoices and pricing',
  converters:
    'Helps when agents or customers use different measurement systems',
  utilities: 'Quick, context-independent helpers',
  'cx-tools': 'Tailored for customer support or sales use inside Front',
} as const;

