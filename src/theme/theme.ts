import { createTheme, Theme } from '@mui/material/styles';

const lightTheme: Theme = createTheme({
  palette: {
    mode: 'light',
  },
});

const darkTheme: Theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export { lightTheme, darkTheme };
