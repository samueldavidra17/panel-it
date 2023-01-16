import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Backdrop, CircularProgress, Paper } from '@mui/material';
import axios from 'utils/axioIntance';
import { useState } from 'react';
//componente login para el inicio de sesion
export function Login() {
  //estado si esta cargando la peticion de inicio de sesion
  const [loading, setLoading] = useState(false);
  //peticion de de inicio de sesion en el servidor 
  //el token de respuesta se almacena en un sesion storage
  const login = async (body) => {
    try {
      const res = await axios.post('login/', body)
      if (res.status !== 200) {
        alert("usuario o contraseña invalido");
        throw res.data;
      }
      sessionStorage.setItem('token', res.data.token);
      sessionStorage.setItem('usuario', JSON.stringify(res.data.user));
      window.location.href = process.env.REACT_APP_BASE_URL+"equipos";
    } catch (error) {
      console.log(error);
    } finally{
      setLoading(false);
    }
  }
  //recuperacion de los datos del formulario al dar click en el boton de envio (submit)
  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      username: data.get('username'),
      password: data.get('password'),
    }
    login(body);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 5, marginTop: 8, }}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Inicio de Sessión
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              name="username"
              label="Nombre de usuario"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar sesión
            </Button>
          </Box>
        </Box>
      </Paper>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={() => setLoading(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}