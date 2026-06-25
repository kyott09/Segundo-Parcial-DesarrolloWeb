import { useState } from "react";

import {
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  Box,
  Paper,
} from "@mui/material";

function Contact() {
  // Esta página NO necesita ningún Context: no usa usuario ni carrito,
  // solo maneja sus propios datos del formulario con estados locales

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Estado para mostrar el mensaje de éxito una vez enviado
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Como no hay backend real, simplemente marcamos que se "envió"
    // y mostramos el Alert de éxito
    setEnviado(true);

    // Limpiamos el formulario después de enviar
    setNombre("");
    setEmail("");
    setAsunto("");
    setMensaje("");
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
          Contacto
        </Typography>

        {/* Solo se muestra después de enviar el formulario con éxito */}
        {enviado && (
          <Alert severity="success" sx={{ mb: 2 }}>
            ¡Tu mensaje fue enviado correctamente! Te responderemos a la brevedad.
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Nombre"
            fullWidth
            margin="normal"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <TextField
            label="Asunto"
            fullWidth
            margin="normal"
            value={asunto}
            onChange={(e) => setAsunto(e.target.value)}
            required
          />

          {/* multiline + rows convierte el TextField en un textarea de varias líneas */}
          <TextField
            label="Mensaje"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 3 }}
          >
            Enviar mensaje
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Contact;
