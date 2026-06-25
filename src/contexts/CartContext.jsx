// createContext: crea la "caja compartida"
// useContext: lo que van a usar los demás componentes para leer la caja
import { createContext, useContext, useState } from "react";

// 1) Creamos el contexto. Esto es solo la "caja" vacía, todavía no tiene lógica.
const CartContext = createContext();

// 2) Creamos el Provider: es un componente que va a ENVOLVER toda la app
// (lo vamos a usar en App.jsx más adelante)
// Todo lo que esté "adentro" de este Provider va a poder acceder al carrito
export function CartProvider({ children }) {
  // children representa todo lo que el Provider envuelve
  // (en nuestro caso, va a ser toda la aplicación)

  // carrito: array de productos agregados. Cada producto va a tener
  // los datos del producto + una propiedad "cantidad"
  const [carrito, setCarrito] = useState([]);

  // ---------------------------------------------
  // Agrega un producto al carrito
  // ---------------------------------------------
  const agregarProducto = (producto) => {
    // Buscamos si el producto ya está en el carrito
    const existe = carrito.find((item) => item.id === producto.id);

    if (existe) {
      // Si ya existe, solo le sumamos 1 a la cantidad
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 } // copiamos el item y le sumamos cantidad
            : item // si no es el que buscamos, lo dejamos igual
        )
      );
    } else {
      // Si no existe, lo agregamos nuevo con cantidad = 1
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  // ---------------------------------------------
  // Elimina un producto del carrito (completo, sin importar la cantidad)
  // ---------------------------------------------
  const eliminarProducto = (id) => {
    // filter() devuelve un nuevo array sin el producto que tiene ese id
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  // ---------------------------------------------
  // Vacía el carrito completo
  // ---------------------------------------------
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // ---------------------------------------------
  // Calculamos el total del carrito
  // No es un estado, es un valor que se recalcula en cada render
  // a partir del array "carrito" (precio * cantidad de cada item, sumado)
  // ---------------------------------------------
  const total = carrito.reduce(
    (acumulado, item) => acumulado + item.price * item.cantidad,
    0
  );

  // 3) Acá definimos QUÉ va a estar disponible para los componentes
  // que usen este contexto (carrito, las 3 funciones, y el total)
  const value = {
    carrito,
    agregarProducto,
    eliminarProducto,
    vaciarCarrito,
    total,
  };

  // El Provider envuelve a "children" (todo lo que esté adentro)
  // y le pasa "value" para que cualquier hijo pueda acceder a esos datos
  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

// 4) Custom hook para usar el carrito más fácil en cualquier componente
// En vez de escribir useContext(CartContext) en cada archivo,
// solo escribimos useCart()
export function useCart() {
  return useContext(CartContext);
}
