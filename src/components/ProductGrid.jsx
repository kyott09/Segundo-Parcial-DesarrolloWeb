// ProductGrid.jsx
// Muestra una lista de productos en un grid: 1 columna en celular,
// 2 en tablet, 3-4 en pantallas grandes. Lo usan tanto el Home como
// la página de Productos, para no repetir el mismo código dos veces.

import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";

function ProductGrid({ productos }) {
  return (
    <Grid container spacing={3}>
      {productos.map((producto) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={producto.id}>
          <ProductCard producto={producto} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductGrid;
