// RelatedProducts.jsx
// Sección "Quienes compraron esto también vieron", que se muestra
// abajo del detalle de un producto.

import { Typography, Box } from "@mui/material";
import ProductGrid from "./ProductGrid";

function RelatedProducts({ productos }) {
  // Si no hay productos relacionados, no mostramos nada
  if (!productos || productos.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant="h5" gutterBottom>
        Quienes compraron esto también vieron
      </Typography>
      <ProductGrid productos={productos} />
    </Box>
  );
}

export default RelatedProducts;
