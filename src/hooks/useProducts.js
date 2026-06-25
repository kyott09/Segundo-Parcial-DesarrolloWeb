// Importamos useState y useEffect, los dos hooks base de React
import { useState, useEffect } from "react";

// Importamos la función que ya armamos en el service
// Este hook NO sabe nada de fetch ni de URLs, eso ya lo resuelve el service
import { getProducts } from "../services/productService";

// Custom Hook: useProducts
// Su única responsabilidad es traer los productos y manejar
// los 3 estados típicos: loading, error y los datos (products)
function useProducts() {
  // products: array con los productos que trae la API. Arranca vacío.
  const [products, setProducts] = useState([]);

  // loading: true mientras esperamos la respuesta de la API
  // Arranca en true porque apenas se monta el componente, empezamos a cargar
  const [loading, setLoading] = useState(true);

  // error: guarda el mensaje de error si algo sale mal
  const [error, setError] = useState(null);

  // useEffect con [] como dependencia: se ejecuta UNA SOLA VEZ,
  // apenas el componente que use este hook se monta en pantalla
  useEffect(() => {
    // Función async adentro del useEffect (no se puede poner async
    // directamente en la función del useEffect)
    const fetchProducts = async () => {
      try {
        setLoading(true); // arrancamos la carga
        setError(null); // limpiamos errores previos

        const data = await getProducts(); // le pedimos los datos al service
        setProducts(data); // guardamos los productos en el estado

      } catch (err) {
        // Si getProducts() lanzó un error, lo capturamos acá
        setError(err.message);

      } finally {
        // Pase lo que pase (éxito o error), dejamos de cargar
        setLoading(false);
      }
    };

    fetchProducts(); // llamamos a la función recién definida
  }, []); // [] vacío = se ejecuta solo una vez al montar

  // Devolvemos los 3 valores para que cualquier página los pueda usar
  return { products, loading, error };
}

export default useProducts;
