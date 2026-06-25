import { Link } from "react-router-dom";

import {
  Container,
  Paper,
  Typography,
  Avatar,
  Box,
  Button,
  Divider,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";

// Usamos los dos contexts juntos en esta página
import { useUser } from "../contexts/UserContext";
import { useCart } from "../contexts/CartContext";

function Profile() {
  // Del UserContext sacamos el usuario logueado
  const { usuario } = useUser();

  // Del CartContext sacamos el carrito, para contar cuántos productos tiene
  const { carrito } = useCart();

  // Sumamos las cantidades de todos los productos del carrito
  // (mismo cálculo que ya hicimos en el Navbar, Archivo 6)
  const cantidadEnCarrito = carrito.reduce(
    (acumulado, item) => acumulado + item.cantidad,
    0
  );

  // ---------------------------------------------
  // CASO: no hay usuario logueado
  // ---------------------------------------------
  if (!usuario) {
    return (
      <Container maxWidth="sm" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          No iniciaste sesión
        </Typography>
        <Typography variant="body1" sx={{ color: "#666", mb: 3 }}>
          Iniciá sesión para ver tu perfil
        </Typography>
        <Button component={Link} to="/login" variant="contained">
          Ir a Login
        </Button>
      </Container>
    );
  }

  // ---------------------------------------------
  // CASO: hay usuario logueado
  // ---------------------------------------------
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>

        {/* Avatar con ícono de persona, simulando una foto de perfil */}
        <Avatar sx={{ width: 80, height: 80, mx: "auto", mb: 2, bgcolor: "#1a1a2e" }}>
          <PersonIcon fontSize="large" />
        </Avatar>

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {usuario.nombre}
        </Typography>

        <Typography variant="body1" sx={{ color: "#666", mb: 3 }}>
          {usuario.email}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Cantidad de productos en el carrito, pedido por la consigna */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">
            Productos en tu carrito: <strong>{cantidadEnCarrito}</strong>
          </Typography>

          <Button component={Link} to="/carrito" variant="outlined" sx={{ mt: 2 }}>
            Ver mi carrito
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Profile;

