// productMeta.js
//
// La API que usamos (Platzi) no nos da descuento, stock ni calificación
// de cada producto. Como la consigna pide mostrar esos datos, los
// "inventamos" usando el id del producto con el operador % (resto de
// una división). Así, el mismo producto siempre muestra el mismo dato
// (no cambia cada vez que se recarga la página), sin necesidad de usar
// Math.random().

// ----------------------------------------------------
// Descuento: si el id es múltiplo de 3, tiene descuento
// ----------------------------------------------------
export function tieneDescuento(id) {
  return id % 3 === 0;
}

// Lista de porcentajes posibles. Usamos el id para "elegir" uno de la lista.
const PORCENTAJES = [10, 15, 20, 25, 30];

export function obtenerPorcentajeDescuento(id) {
  if (!tieneDescuento(id)) return 0;
  return PORCENTAJES[id % PORCENTAJES.length];
}

export function calcularPrecioConDescuento(precio, id) {
  const porcentaje = obtenerPorcentajeDescuento(id);
  if (porcentaje === 0) return precio;
  // Le restamos el porcentaje al precio original
  return precio - (precio * porcentaje) / 100;
}

// ----------------------------------------------------
// Stock: usamos el resto de dividir el id por 7
// ----------------------------------------------------
export function obtenerEstadoStock(id) {
  const resto = id % 7;
  if (resto === 0) return "sin-stock";
  if (resto === 1 || resto === 2) return "ultimas-unidades";
  return "disponible";
}

export const TEXTO_STOCK = {
  "sin-stock": "Sin stock",
  "ultimas-unidades": "Últimas unidades",
  disponible: "Disponible",
};

export const COLOR_STOCK = {
  "sin-stock": "error",
  "ultimas-unidades": "warning",
  disponible: "success",
};

// ----------------------------------------------------
// Calificación (estrellas) y cantidad de reseñas
// ----------------------------------------------------
export function obtenerCalificacion(id) {
  // Esto da siempre un número entre 3.5 y 5
  return 3.5 + (id % 4) * 0.5;
}

export function obtenerCantidadReseñas(id) {
  // Esto da siempre un número entre 5 y 200 (aprox)
  return (id * 9) % 195 + 5;
}
