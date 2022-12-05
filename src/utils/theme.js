import { createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
//tema de la aplicacion 
//https://mui.com/material-ui/customization/theming/ --> doc de la customizacion del tema para los componentes
const theme = createTheme({
    palette: {
        primary: {
            light: '#5cec51',
            main: '#00b819',
            dark: '#008600',
            contrastText: '#fff',
        },
    },
    components: {
        MuiLink: {
          defaultProps: {
            component: Link,
          },
        },
        MuiButtonBase: {
          defaultProps: {
            LinkComponent: Link,
          },
        },
      },
});

export default theme;