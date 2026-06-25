// ProductCard.jsx
// Tarjeta de un producto: imagen, nombre, precio (con descuento si tiene),
// estrellas, badge de stock y un botón para agregarlo al carrito.
//
// La imagen y el título están adentro de un Link (te llevan al detalle).
// El botón "Agregar al carrito" lo dejamos AFUERA del Link para que no
// se pisen los clicks entre el link y el botón.

import { Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
} from "@mui/material";

import { useCart } from "../contexts/CartContext";
import StarRating from "./StarRating";
import {
  obtenerPorcentajeDescuento,
  calcularPrecioConDescuento,
  obtenerEstadoStock,
  TEXTO_STOCK,
  COLOR_STOCK,
  obtenerCalificacion,
  obtenerCantidadReseñas,
} from "../utils/productMeta";

function ProductCard({ producto }) {
  const { agregarProducto } = useCart();

  const porcentajeDescuento = obtenerPorcentajeDescuento(producto.id);
  const precioFinal = calcularPrecioConDescuento(producto.price, producto.id);
  const estadoStock = obtenerEstadoStock(producto.id);
  const calificacion = obtenerCalificacion(producto.id);
  const cantidadReseñas = obtenerCantidadReseñas(producto.id);

  const sinStock = estadoStock === "sin-stock";

  const handleAgregarAlCarrito = () => {
    // Guardamos el producto con el precio YA con descuento aplicado
    agregarProducto({ ...producto, price: precioFinal });
  };

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Badge de descuento, arriba a la izquierda de la imagen */}
      {porcentajeDescuento > 0 && (
        <Box sx={{ position: "relative" }}>
          <Chip
            label={`-${porcentajeDescuento}%`}
            color="error"
            size="small"
            sx={{ position: "absolute", top: 8, left: 8, zIndex: 1 }}
          />
        </Box>
      )}

      <Link to={`/producto/${producto.id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <CardMedia
          component="img"
          image={producto.images[0]}
          alt={producto.title}
          sx={{ height: 180, objectFit: "contain", backgroundColor: "#f5f5f5", p: 2 }}
        />

        <CardContent>
          <Typography variant="subtitle1" noWrap sx={{ mb: 0.5 }}>
            {producto.title}
          </Typography>

          <StarRating calificacion={calificacion} cantidadReseñas={cantidadReseñas} />

          <Chip
            label={TEXTO_STOCK[estadoStock]}
            color={COLOR_STOCK[estadoStock]}
            size="small"
            sx={{ mt: 1, mb: 1 }}
          />

          <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ color: "#1a1a2e" }}>
              ${precioFinal.toFixed(2)}
            </Typography>

            {/* Si hay descuento, mostramos el precio viejo tachado */}
            {porcentajeDescuento > 0 && (
              <Typography
                variant="body2"
                sx={{ color: "#999", textDecoration: "line-through" }}
              >
                ${producto.price}
              </Typography>
            )}
          </Box>
        </CardContent>
      </Link>

      <CardActions sx={{ mt: "auto", p: 2, gap: 1 }}>
        <Button
          component={Link}
          to={`/producto/${producto.id}`}
          variant="outlined"
          fullWidth
        >
          Ver detalle
        </Button>

        <Button
          variant="contained"
          fullWidth
          disabled={sinStock}
          onClick={handleAgregarAlCarrito}
        >
          {sinStock ? "Sin stock" : "Agregar"}
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
