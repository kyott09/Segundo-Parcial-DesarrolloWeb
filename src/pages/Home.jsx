// Home.jsx
// Página principal (ruta "/"). Muestra el banner de bienvenida (Hero),
// las categorías y 8 productos elegidos al azar como "destacados".

import { useState, useEffect } from "react";
import { Container, Typography, CircularProgress, Box } from "@mui/material";

import useProducts from "../hooks/useProducts";
import useCategories from "../hooks/useCategories";

import Hero from "../components/Hero";
import CategoryGrid from "../components/CategoryGrid";
import ProductGrid from "../components/ProductGrid";
import TrustBadges from "../components/TrustBadges";

function Home() {
  const { products, loading: cargandoProductos } = useProducts();
  const { categories, loading: cargandoCategorias } = useCategories();

  // Productos destacados: 8 productos elegidos al azar
  const [destacados, setDestacados] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      // Copiamos el array y lo desordenamos con sort + Math.random
      const productosDesordenados = [...products].sort(() => Math.random() - 0.5);
      setDestacados(productosDesordenados.slice(0, 8));
    }
  }, [products]);

  return (
    <Box>
      <Hero />

      <Container maxWidth="lg" sx={{ py: 5 }}>
        {/* Categorías */}
        <Typography variant="h5" gutterBottom>
          Categorías
        </Typography>

        {cargandoCategorias ? (
          <CircularProgress />
        ) : (
          <CategoryGrid categorias={categories} />
        )}

        <Box sx={{ my: 4 }}>
          <TrustBadges />
        </Box>

        {/* Productos destacados */}
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Productos destacados
        </Typography>

        {cargandoProductos ? (
          <CircularProgress />
        ) : (
          <ProductGrid productos={destacados} />
        )}
      </Container>
    </Box>
  );
}

export default Home;
