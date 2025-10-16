# Front Handyman Plugin 🛠️

A comprehensive utility companion app for Front, helping support agents and CX teams quickly handle practical tasks without switching contexts. Optimized for iframe sidebar usage with a compact, intuitive interface.

## Features

### 🧮 Calculators

Useful for support reps dealing with invoices, logistics, or product specs.

- **Basic Calculator** – Standard arithmetic operations
- **Percentage Calculator** – For discounts, commissions, or refunds
- **Markup/Margin Calculator** – For pricing and profitability checks
- **Tax/VAT Calculator** – Quick total or reverse-tax calculations
- **Currency Converter** – Convert between common currencies
- **Unit Price Calculator** – Cost per unit or weight

### 📏 Converters

Helps when agents or customers use different measurement systems.

- **Length Converter** – m ↔ ft, cm ↔ in, and more
- **Weight Converter** – kg ↔ lb, and more
- **Volume Converter** – L ↔ gal, mL ↔ fl oz, and more
- **Temperature Converter** – °C ↔ °F ↔ K
- **Area Converter** – m² ↔ ft², and more
- **Speed Converter** – km/h ↔ mph, and more
- **Time Zone Converter** – Show local vs customer time

### 🧰 Utility Tools

Quick, context-independent helpers that add value during conversations.

- **Text Case Converter** – Uppercase, lowercase, title case, sentence case
- **URL Encoder/Decoder** – Encode and decode URL strings
- **JSON Formatter** – Format, minify, and validate JSON
- **Base64 Encoder/Decoder** – Encode and decode Base64 strings
- **Color Picker** – HEX ↔ RGB converter with visual picker
- **Clipboard Cleaner** – Trim, remove HTML, clean text

### 💼 CX-Specific Tools

Tailored for customer support or sales use inside Front.

- **Response Time Calculator** – Calculate time between two timestamps
- **SLA Deadline Estimator** – Calculate deadline based on working hours
- **ETA Calculator** – Calculate delivery dates with delays
- **Customer Local Time** – Show customer's current time by timezone
- **Snippet Randomizer** – Randomly select from pre-set responses for variety

## App Structure

### Key Features

- 🔍 **Tool Selector** – Dropdown menu in header for quick tool access
- ⭐ **Favorites System** – Mark frequently used tools with star button
- 📂 **Category Filtering** – Browse tools by category from the dropdown
- 🎯 **Iframe Optimized** – Compact design perfect for Front sidebar
- 🎨 **Front UI Kit** – Built with official Front components
- ⚡ **Fast & Responsive** – Instant tool switching and calculations
- 📱 **Compact Layout** – No sidebar, all controls in header

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building

Build for production:
```bash
npm run build
```

### Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test
```

### Code Quality

Check linting:
```bash
npm run lint
```

Fix linting issues:
```bash
npm run lint:fix
```

Check formatting:
```bash
npm run format-check
```

Fix formatting:
```bash
npm run format:fix
```

Type check:
```bash
npm run type-check
```

## GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages.

### Automatic Deployment (Recommended)

1. Push your code to the `main` or `master` branch
2. GitHub Actions will automatically build and deploy your site
3. Your site will be available at: `https://[your-username].github.io/front-handyman/`

### Manual Deployment

If you prefer manual deployment:

```bash
npm run deploy
```

### Setting up GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. The workflow will automatically deploy when you push to the main branch

## Project Structure

```
src/
├── components/
│   ├── calculators/       # Calculator tools (6 tools)
│   ├── converters/        # Unit converter tools (7 tools)
│   ├── utilities/         # Utility tools (6 tools)
│   ├── cx-tools/          # CX-specific tools (5 tools)
│   ├── common/            # Shared components (ToolCard, FormElements)
│   ├── layout/            # Layout components (ToolContent)
│   └── HandymanApp.tsx    # Main app with dropdown selector
├── context/               # React contexts
│   ├── FrontContext.tsx
│   ├── FrontContextProvider.tsx
│   └── FavoritesContext.tsx
├── constants/             # App constants
│   └── tools.ts           # Tool definitions (24 tools)
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
├── App.tsx                # Root app component
├── main.tsx               # App entry point
└── index.css              # Global styles
```

## Technologies Used

- **React 19** – UI framework
- **TypeScript** – Type safety
- **Vite** – Build tool and dev server
- **Styled Components** – CSS-in-JS styling
- **Front Plugin SDK** – Front integration
- **Front UI Kit** – Official Front UI components (PluginLayout, PluginHeader, Select, etc.)
- **React Icons** – Icon library for additional icons

## Usage in Front

1. **Select Tools** – Use the dropdown in the header to select any tool
2. **Browse by Category** – Categories are listed at the top of the dropdown
3. **Mark Favorites** – Click the star icon in the header to favorite the current tool
4. **Filter Favorites** – Click the filter icon to show only starred tools
5. **Use Tools** – Selected tool displays immediately below the header

## Adding New Tools

To add a new tool:

1. Create a new component in the appropriate category folder
2. Add the tool definition to `src/constants/tools.ts`
3. The tool will automatically appear in the sidebar

Example:

```tsx
// src/components/calculators/MyNewCalculator.tsx
import ToolCard from '../common/ToolCard';

function MyNewCalculator() {
  return (
    <ToolCard
      title="My New Calculator"
      icon="🔢"
      description="Description of what it does"
    >
      {/* Your tool UI here */}
    </ToolCard>
  );
}

export default MyNewCalculator;
```

Then add to `tools.ts`:

```tsx
import MyNewCalculator from '../components/calculators/MyNewCalculator';

export const TOOLS: Tool[] = [
  // ... other tools
  {
    id: 'my-new-calculator',
    name: 'My New Calculator',
    description: 'Description of what it does',
    category: 'calculators',
    icon: '🔢',
    component: MyNewCalculator,
  },
];
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Run linting and type checking
6. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Built with [Front Plugin SDK](https://dev.frontapp.com/docs/plugin-sdk)
- UI components from [Front UI Kit](https://github.com/frontapp/front-ui-kit)
- Inspired by the need for quick utility tools in customer support workflows

