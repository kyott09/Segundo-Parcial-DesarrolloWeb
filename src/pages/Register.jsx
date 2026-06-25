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

import { useUser } from "../contexts/UserContext";

function Register() {
  // Sacamos la función registro() del UserContext (Archivo 5)
  const { registro } = useUser();
  const navigate = useNavigate();

  // Un estado por cada campo del formulario
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");

  // Estado para el mensaje de error (texto vacío = sin error)
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // evita que recargue la página
    setError(""); // limpiamos error previo

    // registro() devuelve un objeto: { exito: true/false, mensaje: "..." }
    const resultado = registro(nombre, email, password, confirmarPassword);

    if (resultado.exito) {
      // Si el registro funcionó, mandamos al usuario a su perfil
      navigate("/perfil");
    } else {
      // Mostramos el mensaje ESPECÍFICO que armamos en el contexto
      // (ej: "Las contraseñas no coinciden")
      setError(resultado.mensaje);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
          Crear cuenta
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Nombre"
            fullWidth
            margin="normal"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

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

          <TextField
            label="Confirmar contraseña"
            type="password"
            fullWidth
            margin="normal"
            value={confirmarPassword}
            onChange={(e) => setConfirmarPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 3 }}
          >
            Registrarme
          </Button>
        </Box>

        <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
          ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default Register;
