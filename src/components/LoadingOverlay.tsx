import { FC } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useThemeContext } from 'providers/theme/ThemeProvider';

const LoadingOverlay: FC = () => {
  const { createSxStyles } = useThemeContext();
  const { circular } = createSxStyles({
    circular: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%,-50%)',
    },
  });

  return (
    <Box>
      <CircularProgress sx={circular} />
    </Box>
  );
};

export default LoadingOverlay;
