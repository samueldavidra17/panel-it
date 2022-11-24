import { ThemeProvider } from '@mui/material/styles';
import theme from 'utils/theme';
import Router from 'Router';

function App() {
  return (
    <ThemeProvider theme={theme}>
       <Router />
    </ThemeProvider>
  )
}

export default App
