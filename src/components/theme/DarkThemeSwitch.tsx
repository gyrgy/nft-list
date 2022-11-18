import { FC, useCallback } from 'react';
import { Box, Switch, Typography } from '@mui/material';
import { useThemeContext } from 'providers/theme/ThemeProvider';

const DarkThemeSwitch: FC = () => {
  const { createSxStyles, themeMode, toggleTheme } = useThemeContext();
  const { boxStyles, darkModaLabelStyles } = createSxStyles({
    boxStyles: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      pl: 2,
    },
    darkModaLabelStyles: {
      marginBottom: 0,
    },
  });

  const handleToggleTheme = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);
  return (
    <Box sx={boxStyles}>
      <Typography paragraph sx={darkModaLabelStyles}>
        Dark mode
      </Typography>
      <Switch checked={themeMode === 'dark'} onChange={handleToggleTheme} />
    </Box>
  );
};

export default DarkThemeSwitch;
