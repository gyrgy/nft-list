import {
  FC,
  useState,
  createContext,
  ReactNode,
  useContext,
  useCallback,
  useMemo,
} from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { lightTheme, darkTheme } from 'theme/theme';
import { Theme, ThemeProvider as MuiThemeProvider } from '@mui/material';
import createSxStyles, {
  CreateSxStyles,
} from 'helpers/styleHelpers/createSxStyles';

interface ThemeContextProps {
  themeMode: 'light' | 'dark';
  theme: Theme;
  createSxStyles: CreateSxStyles;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  themeMode: 'light',
  theme: lightTheme,
  createSxStyles: () => {
    throw new Error(
      "createSxStyles cannot be called outside of the ThemeProvider's context.",
    );
  },
  toggleTheme: () => {
    throw new Error(
      "toggleTheme cannot be called outside of the ThemeProvider's context.",
    );
  },
});

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const defaultTheme = useMemo<ThemeContextProps['themeMode']>(
    () => (prefersDarkMode ? 'dark' : 'light'),
    [prefersDarkMode],
  );

  const [themeMode, setThemeMode] =
    useState<ThemeContextProps['themeMode']>(defaultTheme);

  const toggleTheme = useCallback(() => {
    setThemeMode((prevValue) => (prevValue === 'light' ? 'dark' : 'light'));
  }, []);

  const providerValue = useMemo(
    () => ({
      themeMode,
      theme: themeMode === 'light' ? lightTheme : darkTheme,
      createSxStyles,
      toggleTheme,
    }),
    [themeMode, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={providerValue}>
      <MuiThemeProvider theme={providerValue.theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useThemeContext = () => useContext(ThemeContext);
