// Hero.jsx
// Banner grande que aparece arriba de todo en el Home, con el nombre
// del e-commerce, una frase de bienvenida y un botón para ir a ver
// los productos (esto es lo que la consigna llama "botón de bienvenida").

import { Link } from "react-router-dom";
import { Box, Container, Typography, Button } from "@mui/material";

function Hero() {
  return (
    <Box sx={{ backgroundColor: "#f5f5f5", py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Hardware de calidad al mejor precio
        </Typography>

        <Typography variant="h6" sx={{ color: "#666", mb: 3 }}>
          Componentes, periféricos y equipamiento para tu PC, todo en un
          solo lugar.
        </Typography>

        <Button component={Link} to="/productos" variant="contained" size="large">
          Ver productos
        </Button>
      </Container>
    </Box>
  );
}

export default Hero;
