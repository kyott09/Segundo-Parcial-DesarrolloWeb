// Este archivo es el ÚNICO lugar del proyecto que conoce la URL de la API.
// Ningún componente ni hook hace fetch directamente: todos le piden los datos a este archivo.
// Ventaja: si la API cambia, solo modificamos ACÁ y no en 10 archivos distintos.

// URL base de la API que vamos a usar en todo el proyecto
const BASE_URL = "https://api.escuelajs.co/api/v1";

// Nota: usamos "api.escuelajs.co" porque es la API real detrás de "fakeapi.platzi.com"
// (fakeapi.platzi.com es solo el nombre de marketing, pero el dominio real de la API es este)

// ----------------------------------------------------
// 1) Traer TODOS los productos
// ----------------------------------------------------
export async function getProducts() {
  // Hacemos la petición GET a /products
  const response = await fetch(`${BASE_URL}/products`);

  // Si la respuesta no fue exitosa (status fuera del rango 200-299), lanzamos un error
  if (!response.ok) {
    throw new Error("No se pudieron obtener los productos");
  }

  // Convertimos la respuesta a JSON y la devolvemos
  const data = await response.json();
  return data;
}

// ----------------------------------------------------
// 2) Traer UN producto puntual por su ID (para la página de Detalle)
// ----------------------------------------------------
export async function getProductById(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error("No se pudo encontrar el producto");
  }

  const data = await response.json();
  return data;
}

// ----------------------------------------------------
// 3) Traer productos RELACIONADOS a uno puntual (para "también vieron")
//    La API de Platzi expone este endpoint específico para eso.
// ----------------------------------------------------
export async function getRelatedProducts(id) {
  const response = await fetch(`${BASE_URL}/products/${id}/related`);

  if (!response.ok) {
    throw new Error("No se pudieron obtener los productos relacionados");
  }

  const data = await response.json();
  return data;
}

// ----------------------------------------------------
// 4) Traer todas las CATEGORÍAS (para el filtro de categorías)
// ----------------------------------------------------
export async function getCategories() {
  const response = await fetch(`${BASE_URL}/categories`);

  if (!response.ok) {
    throw new Error("No se pudieron obtener las categorías");
  }

  const data = await response.json();
  return data;
}
