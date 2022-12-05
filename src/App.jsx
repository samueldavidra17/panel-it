import { ThemeProvider } from '@mui/material/styles';
import theme from 'utils/theme';
import Router from 'Router';

function App() {
  //Contexto con la informacion del tema para los componentes del panel
  return (
    <ThemeProvider theme={theme}>
       <Router />
    </ThemeProvider>
  )
}

export default App
