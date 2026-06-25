// Products.jsx
// Página de listado de productos (ruta "/productos"). Tiene buscador
// por nombre, filtro por categoría y paginado (8 productos por página).

import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Box,
  Pagination,
} from "@mui/material";

import useProducts from "../hooks/useProducts";
import useCategories from "../hooks/useCategories";
import ProductGrid from "../components/ProductGrid";

const PRODUCTOS_POR_PAGINA = 8;

function Products() {
  const { products, loading } = useProducts();
  const { categories } = useCategories();

  // Leemos los parámetros que nos pudo haber mandado el Navbar
  // (ej: si el usuario buscó algo o hizo click en una categoría)
  const [searchParams] = useSearchParams();

  const [busqueda, setBusqueda] = useState(searchParams.get("busqueda") || "");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(
    searchParams.get("categoria") || ""
  );

  // En qué página estamos parados
  const [pagina, setPagina] = useState(1);

  // Filtramos por nombre y por categoría
  const productosFiltrados = products.filter((producto) => {
    const coincideTexto = producto.title
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    const coincideCategoria =
      categoriaSeleccionada === "" ||
      producto.category.id === Number(categoriaSeleccionada);

    return coincideTexto && coincideCategoria;
  });

  // Cuántas páginas hay en total, según cuántos productos quedaron filtrados
  const totalPaginas = Math.ceil(productosFiltrados.length / PRODUCTOS_POR_PAGINA);

  // Recortamos el array para mostrar solo los productos de la página actual
  const indiceInicio = (pagina - 1) * PRODUCTOS_POR_PAGINA;
  const productosDeLaPagina = productosFiltrados.slice(
    indiceInicio,
    indiceInicio + PRODUCTOS_POR_PAGINA
  );

  // Cada vez que cambia un filtro, volvemos a la página 1
  // (si no, podríamos quedar en una página que ya no tiene productos)
  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
    setPagina(1);
  };

  const handleCategoriaChange = (e) => {
    setCategoriaSeleccionada(e.target.value);
    setPagina(1);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Nuestros productos
      </Typography>

      {/* Buscador y filtro de categoría */}
      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        <TextField
          label="Buscar por nombre"
          value={busqueda}
          onChange={handleBusquedaChange}
          sx={{ flexGrow: 1, minWidth: 200 }}
        />

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Categoría</InputLabel>
          <Select
            value={categoriaSeleccionada}
            label="Categoría"
            onChange={handleCategoriaChange}
          >
            <MenuItem value="">Todas</MenuItem>
            {categories.map((categoria) => (
              <MenuItem key={categoria.id} value={String(categoria.id)}>
                {categoria.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {productosFiltrados.length === 0 ? (
            <Typography>No se encontraron productos.</Typography>
          ) : (
            <ProductGrid productos={productosDeLaPagina} />
          )}

          {/* Paginado: solo se muestra si hay más de una página */}
          {totalPaginas > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={totalPaginas}
                page={pagina}
                onChange={(e, numeroDePagina) => setPagina(numeroDePagina)}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
}

export default Products;
