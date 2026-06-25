// Navbar.jsx
// Barra de arriba: logo, categorías, buscador, carrito y login.
// Las categorías son simples botones (sin menú desplegable) y el
// buscador, al enviarse, te manda a /productos con lo que escribiste
// en la URL (ej: /productos?busqueda=mouse).

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Badge,
  IconButton,
  Box,
  InputBase,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";

import { useCart } from "../contexts/CartContext";
import { useUser } from "../contexts/UserContext";
import useCategories from "../hooks/useCategories";

function Navbar() {
  const { carrito } = useCart();
  const { usuario, logout } = useUser();
  const { categories } = useCategories();
  const navigate = useNavigate();

  // Estado del texto que el usuario escribe en el buscador
  const [busqueda, setBusqueda] = useState("");

  // Sumamos las cantidades de todos los productos del carrito,
  // para mostrar el numerito arriba del ícono
  const cantidadEnCarrito = carrito.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  const handleBuscar = (e) => {
    e.preventDefault();
    navigate(`/productos?busqueda=${busqueda}`);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1a1a2e" }}>
      <Toolbar sx={{ flexWrap: "wrap", gap: 2, py: 1 }}>
        {/* Logo */}
        <Typography
          component={Link}
          to="/"
          variant="h6"
          sx={{ color: "white", textDecoration: "none", fontWeight: "bold" }}
        >
          NovaTech
        </Typography>

        {/* Categorías (solo en pantallas grandes, para no amontonar todo) */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
          {categories.slice(0, 5).map((categoria) => (
            <Button
              key={categoria.id}
              component={Link}
              to={`/productos?categoria=${categoria.id}`}
              sx={{ color: "white" }}
            >
              {categoria.name}
            </Button>
          ))}
        </Box>

        {/* Buscador */}
        <Box
          component="form"
          onSubmit={handleBuscar}
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: 1,
            px: 1,
            flexGrow: 1,
            maxWidth: 400,
          }}
        >
          <SearchIcon sx={{ color: "#666" }} />
          <InputBase
            placeholder="Buscar productos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            sx={{ ml: 1, flexGrow: 1 }}
          />
        </Box>

        {/* Carrito con contador */}
        <IconButton component={Link} to="/carrito" sx={{ color: "white" }}>
          <Badge badgeContent={cantidadEnCarrito} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>

        {/* Login / cuenta */}
        {usuario ? (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button component={Link} to="/perfil" sx={{ color: "white" }}>
              {usuario.nombre}
            </Button>
            <Button onClick={logout} sx={{ color: "white" }}>
              Salir
            </Button>
          </Box>
        ) : (
          <Button
            component={Link}
            to="/login"
            variant="contained"
            sx={{ backgroundColor: "white", color: "#1a1a2e" }}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
