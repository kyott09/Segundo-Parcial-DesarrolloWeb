// BrowserRouter: habilita el sistema de rutas en toda la aplicación
// Tiene que envolver TODO lo que use Link, useNavigate, useParams, etc.
import { BrowserRouter } from "react-router-dom";

import { Box } from "@mui/material";

// Los 2 Providers que armamos (Archivos 4 y 5)
import { CartProvider } from "./contexts/CartContext";
import { UserProvider } from "./contexts/UserContext";

// Componentes fijos que van en todas las páginas (Archivos 6 y 7)
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// El mapa de rutas (Archivo 18)
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    // BrowserRouter va primero: TODO lo de adentro puede usar Link, useNavigate, etc.
    <BrowserRouter>

      {/* CartProvider y UserProvider envuelven toda la app:
          así Navbar, AppRoutes, y cualquier página puede usar
          useCart() y useUser() sin importar cuán "abajo" estén */}
      <CartProvider>
        <UserProvider>

          {/* Box con flexDirection column + minHeight 100vh:
              truco para que el Footer quede pegado abajo
              aunque la página tenga poco contenido */}
          <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>

            {/* Navbar fijo arriba, en todas las páginas */}
            <Navbar />

            {/* Acá se renderiza la página que corresponda según la URL.
                flexGrow: 1 hace que esta zona "empuje" el Footer hacia abajo */}
            <Box sx={{ flexGrow: 1 }}>
              <AppRoutes />
            </Box>

            {/* Footer fijo abajo, en todas las páginas */}
            <Footer />
          </Box>

        </UserProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;


