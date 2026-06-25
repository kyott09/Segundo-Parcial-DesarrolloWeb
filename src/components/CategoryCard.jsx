// CategoryCard.jsx
// Una tarjeta de categoría. Al hacer click, te lleva a /productos
// con esa categoría ya elegida (se la pasamos en la URL).

import { Link } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

function CategoryCard({ categoria }) {
  return (
    <Card
      component={Link}
      to={`/productos?categoria=${categoria.id}`}
      sx={{ textDecoration: "none", display: "block" }}
    >
      <CardMedia
        component="img"
        height="100"
        image={categoria.image}
        alt={categoria.name}
      />
      <CardContent>
        <Typography variant="subtitle1" sx={{ color: "#1a1a2e" }}>
          {categoria.name}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CategoryCard;
