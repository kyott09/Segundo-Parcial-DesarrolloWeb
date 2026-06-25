import { Link } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";

function NotFound() {
  // Página más simple del proyecto: solo contenido fijo, sin estados ni Context

  return (
    <Container maxWidth="sm" sx={{ py: 10, textAlign: "center" }}>
      <Typography variant="h1" fontWeight="bold" sx={{ fontSize: "6rem", color: "#1a1a2e" }}>
        404
      </Typography>

      <Typography variant="h5" gutterBottom>
        Ups, esta página no existe
      </Typography>

      <Typography variant="body1" sx={{ color: "#666", mb: 4 }}>
        La ruta que buscás no se encuentra disponible.
      </Typography>

      <Box>
        <Button component={Link} to="/" variant="contained" size="large">
          Volver al inicio
        </Button>
      </Box>
    </Container>
  );
}

export default NotFound;

