import { DefaultStyleProvider } from '@frontapp/ui-kit';
import { createGlobalStyle } from 'styled-components';

import HandymanApp from './components/HandymanApp';
import { FavoritesProvider } from './context/FavoritesContext';
import { FrontContextProvider } from './context/FrontContextProvider';

// Global styles to prevent overflow issues in iframe
const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
  }
  
  *, *::before, *::after {
    box-sizing: border-box;
  }
  
  #root {
    height: 100%;
    overflow: hidden;
  }
`;

function App() {
  return (
    <DefaultStyleProvider>
      <GlobalStyle />
      <FrontContextProvider>
        <FavoritesProvider>
          <HandymanApp />
        </FavoritesProvider>
      </FrontContextProvider>
    </DefaultStyleProvider>
  );
}

export default App;

