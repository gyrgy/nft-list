import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from 'providers/theme/ThemeProvider';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import DataContext from 'providers/data/DataProvider';
import LocalStorageProvider from 'providers/localStorage/LocalStorageProvider';
import { THE_GRAPHS_KEY } from 'constants/keys';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const client = new ApolloClient({
  uri: `https://gateway.thegraph.com/api/${THE_GRAPHS_KEY}/subgraphs/id/BEkzgsGPhih7VE6aVwUL4h7EZyXJjZYn16T9PE5XCmou`,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider>
        <CssBaseline enableColorScheme />
        <DataContext>
          <LocalStorageProvider />
          <App />
        </DataContext>
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
