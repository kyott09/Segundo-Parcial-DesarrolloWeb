// CategoryGrid.jsx
// Muestra todas las categorías en un grid (2 por fila en celular,
// 4 en pantallas grandes).

import { Grid } from "@mui/material";
import CategoryCard from "./CategoryCard";

function CategoryGrid({ categorias }) {
  return (
    <Grid container spacing={2}>
      {categorias.map((categoria) => (
        <Grid item xs={6} sm={4} md={3} key={categoria.id}>
          <CategoryCard categoria={categoria} />
        </Grid>
      ))}
    </Grid>
  );
}

export default CategoryGrid;
