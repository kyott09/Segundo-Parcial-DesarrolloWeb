import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  Box,
  Paper,
} from "@mui/material";

// Traemos la función login() de nuestro UserContext (Archivo 5)
import { useUser } from "../contexts/UserContext";

function Login() {
  // Sacamos la función login del contexto de usuario
  const { login } = useUser();

  // Para redirigir al usuario después de loguearse
  const navigate = useNavigate();

  // Estados del formulario: uno por cada campo
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estado para mostrar un mensaje de error si el login falla
  const [error, setError] = useState("");

  // Esta función se ejecuta al enviar el formulario
  const handleSubmit = (e) => {
    // preventDefault evita que el formulario recargue la página
    // (comportamiento por defecto del HTML que NO queremos en React)
    e.preventDefault();

    // Limpiamos errores previos antes de intentar de nuevo
    setError("");

    // Llamamos a login() del contexto. Recordá que devuelve true/false
    const exito = login(email, password);

    if (exito) {
      // Si el login funcionó, redirigimos al perfil
      navigate("/perfil");
    } else {
      // Si falló (campos vacíos, o no existe ese usuario), mostramos error
      setError("Email o contraseña incorrectos. ¿Ya te registraste?");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ py: 8 }}>
      {/* Paper le da un fondo blanco con sombra, como una "tarjeta" de formulario */}
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
          Iniciar sesión
        </Typography>

        {/* Solo mostramos el Alert si hay un mensaje de error */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* component="form" + onSubmit: así MUI maneja formularios reales de HTML,
            permitiendo que también funcione con la tecla Enter */}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* type="submit" hace que este botón dispare el onSubmit del Box de arriba */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 3 }}
          >
            Ingresar
          </Button>
        </Box>

        {/* Link para ir a registrarse si no tiene cuenta */}
        <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
          ¿No tenés cuenta? <Link to="/registro">Registrate acá</Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default Login;

