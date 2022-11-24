import { ThemeProvider } from '@mui/material/styles';
import theme from 'utils/theme';
import NavBar from 'component/navegacion/NavBar';
import Routes from 'Routes';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar onContextMenu={(e) =>  console.log(e)}>
       <Routes />
      </NavBar>
    </ThemeProvider>
  )
}

export default App
