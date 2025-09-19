import { ThemeProvider, CssBaseline } from '@mui/material';
import { useState, useMemo } from 'react';
import { lightTheme } from './lightTheme';
import { darkTheme } from './darkTheme';

export default function AppThemeProvider({ children }) {
  const [mode, setMode] = useState('light');
  
  const theme = useMemo(
    () => (mode === 'light' ? lightTheme : darkTheme),
    [mode]
  );

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export { lightTheme, darkTheme };
