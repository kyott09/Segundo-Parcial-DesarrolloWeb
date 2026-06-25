// ProductDetail.jsx
// Página de detalle de un producto (ruta "/producto/:id").
// Muestra imagen grande, título, descripción, precio, categoría,
// estrellas, stock y el botón para agregar al carrito. Al final,
// se muestran productos relacionados.

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  Container,
  Grid,
  Typography,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";

import { getProductById, getRelatedProducts } from "../services/productService";
import { useCart } from "../contexts/CartContext";

import StarRating from "../components/StarRating";
import TrustBadges from "../components/TrustBadges";
import RelatedProducts from "../components/RelatedProducts";
import {
  obtenerPorcentajeDescuento,
  calcularPrecioConDescuento,
  obtenerEstadoStock,
  TEXTO_STOCK,
  COLOR_STOCK,
  obtenerCalificacion,
  obtenerCantidadReseñas,
} from "../utils/productMeta";

function ProductDetail() {
  // useParams() lee el "id" de la URL (ej: /producto/5 -> id = "5")
  const { id } = useParams();
  const { agregarProducto } = useCart();

  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [relacionados, setRelacionados] = useState([]);

  // Traemos el producto puntual cada vez que cambia el id de la URL
  useEffect(() => {
    const fetchProducto = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProductById(id);
        setProducto(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  // Traemos los productos relacionados (mismo patrón que arriba)
  useEffect(() => {
    const fetchRelacionados = async () => {
      try {
        const data = await getRelatedProducts(id);
        setRelacionados(data);
      } catch (err) {
        // Si falla, simplemente no mostramos la sección de relacionados
        setRelacionados([]);
      }
    };

    fetchRelacionados();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  const porcentajeDescuento = obtenerPorcentajeDescuento(producto.id);
  const precioFinal = calcularPrecioConDescuento(producto.price, producto.id);
  const estadoStock = obtenerEstadoStock(producto.id);
  const sinStock = estadoStock === "sin-stock";
  const calificacion = obtenerCalificacion(producto.id);
  const cantidadReseñas = obtenerCantidadReseñas(producto.id);

  const handleAgregarAlCarrito = () => {
    agregarProducto({ ...producto, price: precioFinal });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Imagen grande */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={producto.images[0]}
            alt={producto.title}
            sx={{ width: "100%", backgroundColor: "#f5f5f5", p: 2, borderRadius: 1 }}
          />
        </Grid>

        {/* Información del producto */}
        <Grid item xs={12} md={6}>
          <Chip label={producto.category.name} sx={{ mb: 2 }} />

          <Typography variant="h4" gutterBottom>
            {producto.title}
          </Typography>

          <StarRating calificacion={calificacion} cantidadReseñas={cantidadReseñas} />

          <Chip
            label={TEXTO_STOCK[estadoStock]}
            color={COLOR_STOCK[estadoStock]}
            size="small"
            sx={{ mt: 2, mb: 2 }}
          />

          <Box sx={{ display: "flex", alignItems: "baseline", gap: 2, mb: 2 }}>
            <Typography variant="h4" fontWeight="bold" sx={{ color: "#1a1a2e" }}>
              ${precioFinal.toFixed(2)}
            </Typography>

            {porcentajeDescuento > 0 && (
              <Typography
                variant="h6"
                sx={{ color: "#999", textDecoration: "line-through" }}
              >
                ${producto.price}
              </Typography>
            )}
          </Box>

          <Typography variant="body1" sx={{ color: "#666", mb: 3 }}>
            {producto.description}
          </Typography>

          <Button
            variant="contained"
            size="large"
            fullWidth
            disabled={sinStock}
            onClick={handleAgregarAlCarrito}
          >
            {sinStock ? "Sin stock" : "Agregar al carrito"}
          </Button>

          <TrustBadges />
        </Grid>
      </Grid>

      <RelatedProducts productos={relacionados} />
    </Container>
  );
}

export default ProductDetail;
