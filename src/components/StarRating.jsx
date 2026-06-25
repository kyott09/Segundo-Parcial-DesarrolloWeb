// StarRating.jsx
// Dibuja 5 estrellas: las llenas según el rating (redondeado) y el resto
// vacías. Es solo visual, no tiene estado propio.

import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Box, Typography } from "@mui/material";

function StarRating({ calificacion, cantidadReseñas }) {
  // Redondeamos para saber cuántas estrellas pintar llenas
  const estrellasLlenas = Math.round(calificacion);

  // Armamos un array [1,2,3,4,5] para poder recorrerlo con map
  const numeros = [1, 2, 3, 4, 5];

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
      {numeros.map((numero) =>
        numero <= estrellasLlenas ? (
          <StarIcon key={numero} sx={{ fontSize: 18, color: "#f5a623" }} />
        ) : (
          <StarBorderIcon key={numero} sx={{ fontSize: 18, color: "#ccc" }} />
        )
      )}

      {cantidadReseñas && (
        <Typography variant="body2" sx={{ color: "#666", ml: 0.5 }}>
          ({cantidadReseñas})
        </Typography>
      )}
    </Box>
  );
}

export default StarRating;
