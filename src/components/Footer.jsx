// Footer.jsx
// Pie de página con los datos de la empresa, redes sociales,
// medios de pago y links de ayuda. Aparece en todas las páginas
// (se renderiza una sola vez en App.jsx).

import { Link } from "react-router-dom";
import { Box, Container, Typography, Grid, Link as MuiLink } from "@mui/material";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

function Footer() {
  return (
    <Box component="footer" sx={{ backgroundColor: "#1a1a2e", color: "white", mt: "auto" }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Datos de la empresa */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              NovaTech
            </Typography>
            <Typography variant="body2">contacto@novatech.com</Typography>
            <Typography variant="body2">+54 376 123-4567</Typography>
            <Typography variant="body2">Posadas, Misiones, Argentina</Typography>
          </Grid>

          {/* Links de ayuda */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Ayuda
            </Typography>
            <Typography variant="body2">
              <MuiLink component={Link} to="/contacto" color="inherit">
                Envíos y devoluciones
              </MuiLink>
            </Typography>
            <Typography variant="body2">
              <MuiLink component={Link} to="/contacto" color="inherit">
                Contacto
              </MuiLink>
            </Typography>
          </Grid>

          {/* Redes sociales y medios de pago */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Seguinos
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <FacebookIcon />
              <InstagramIcon />
              <TwitterIcon />
            </Box>
            <Typography variant="body2">
              Medios de pago: tarjeta de crédito, débito y transferencia
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="body2" sx={{ textAlign: "center", mt: 4 }}>
          © {new Date().getFullYear()} NovaTech. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
