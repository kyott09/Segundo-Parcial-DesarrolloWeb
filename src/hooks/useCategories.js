// Mismo patrón que useProducts.js, pero para las categorías
import { useState, useEffect } from "react";
import { getCategories } from "../services/productService";

// Custom Hook: useCategories
// Se encarga de traer las categorías y manejar loading/error
function useCategories() {
  // categories: array de categorías. Arranca vacío.
  const [categories, setCategories] = useState([]);

  // loading: true mientras esperamos la respuesta
  const [loading, setLoading] = useState(true);

  // error: mensaje de error si algo falla
  const [error, setError] = useState(null);

  // Igual que en useProducts: se ejecuta una sola vez al montar
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getCategories();
        setCategories(data);

      } catch (err) {
        setError(err.message);

      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Devolvemos lo necesario para que las páginas lo usen
  return { categories, loading, error };
}

export default useCategories;
