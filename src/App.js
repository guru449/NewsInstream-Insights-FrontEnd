// src/App.js
import './styles.css';
import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import NewsList from './NewsList';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <NewsList />
      </div>
    </ThemeProvider>
  );
}

export default App;
