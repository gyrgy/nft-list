import { FC, ReactNode } from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import DarkThemeSwitch from 'components/theme/DarkThemeSwitch';
import { useThemeContext } from 'providers/theme/ThemeProvider';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  const { createSxStyles } = useThemeContext();

  const { container, toolbar, content } = createSxStyles({
    container: {
      pt: 8,
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
      mb: 2,
    },
    content: {
      p: 2,
    },
  });

  return (
    <Box sx={container}>
      <AppBar position="fixed">
        <Toolbar variant="dense" sx={toolbar}>
          <Typography variant="h6">NFT List</Typography>
          <DarkThemeSwitch />
        </Toolbar>
      </AppBar>
      <Box sx={content}>{children}</Box>
    </Box>
  );
};

export default AppLayout;
