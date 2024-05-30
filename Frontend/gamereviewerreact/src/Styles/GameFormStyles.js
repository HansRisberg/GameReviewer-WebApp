import { styled } from '@mui/system';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    // Add other color options if needed
  },
  // Add other theme configurations as needed
});

export const StyledFormContainer = styled('div')(({ theme }) => ({
  maxWidth: '400px',
  margin: '0 auto',
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],  
}));

export const StyledLabel = styled('label')(({ theme }) => ({ 
  marginBottom: theme.spacing(1),
  display: 'block',
}));

export const StyledTextField = styled('input')(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(2),
}));

export const StyledButton = styled('button')(({ theme }) => ({  
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
}));

export const StyledSelect = styled(Select)(({ theme }) => ({
  height: '25px',
}));

export const ThemeProviderWrapper = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);