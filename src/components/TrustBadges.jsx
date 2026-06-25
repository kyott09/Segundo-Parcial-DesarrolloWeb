// TrustBadges.jsx
// Iconos de confianza que se muestran cerca del botón de compra:
// envío gratis, garantía y pago seguro. Es un componente simple,
// sin estado, solo para mostrar información fija.

import { Box, Typography } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LockIcon from "@mui/icons-material/Lock";

function TrustBadges() {
  return (
    <Box sx={{ py: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
        <LocalShippingIcon sx={{ color: "#1a1a2e" }} />
        <Typography variant="body2">Envío gratis a partir de $50.000</Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
        <VerifiedUserIcon sx={{ color: "#1a1a2e" }} />
        <Typography variant="body2">Garantía oficial de 12 meses</Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <LockIcon sx={{ color: "#1a1a2e" }} />
        <Typography variant="body2">Pago 100% seguro</Typography>
      </Box>
    </Box>
  );
}

export default TrustBadges;
