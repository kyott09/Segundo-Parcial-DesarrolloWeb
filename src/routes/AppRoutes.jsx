
// Routes: el contenedor que agrupa todas las rutas posibles
// Route: cada ruta individual (URL + componente a mostrar)
import { Routes, Route } from "react-router-dom";

// Importamos las 9 páginas que ya armamos
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Cart from "../pages/Cart";
import Profile from "../pages/Profile";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <Routes>
      {/* Ruta raíz: la página principal */}
      <Route path="/" element={<Home />} />

      {/* Listado de productos, con buscador y filtro */}
      <Route path="/productos" element={<Products />} />

      {/* Ruta con parámetro dinámico :id
          Por ejemplo /producto/5 → ProductDetail lee el "5" con useParams() */}
      <Route path="/producto/:id" element={<ProductDetail />} />

      {/* Autenticación */}
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Register />} />

      {/* Carrito y perfil */}
      <Route path="/carrito" element={<Cart />} />
      <Route path="/perfil" element={<Profile />} />

      {/* Formulario de contacto */}
      <Route path="/contacto" element={<Contact />} />

      {/* Ruta comodín: captura CUALQUIER url que no matchee con las de arriba.
          Por eso siempre tiene que ir AL FINAL de la lista */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
