# Explicación del proyecto — NovaTech

Esta es una guía para repasar antes de entregar/defender el proyecto. Para
cada archivo explico: **qué hace**, **qué conceptos de la materia usa**, y
si hay algo "raro" que te puedan preguntar, **cómo explicarlo**.

El orden de abajo es el orden recomendado para presentarlo: de "lo que
arranca primero" hacia "lo que se ve en pantalla".

---

## 1) Punto de entrada

### `src/main.jsx`
Es el primer archivo que se ejecuta. Crea el "root" de React (donde se
monta toda la app) y renderiza `<App />`. También pone `<CssBaseline />`,
un componente de MUI que resetea estilos raros del navegador (lo trae la
documentación oficial de MUI).

### `src/App.jsx`
El componente principal. Acá se envuelve TODA la aplicación con:
1. `BrowserRouter` (de React Router) — habilita la navegación por URL.
2. `CartProvider` y `UserProvider` — los dos Context, para que cualquier
   página pueda usar `useCart()` y `useUser()`.
3. Un `Box` con `flexDirection: column` y `minHeight: 100vh` — truco de
   CSS para que el Footer quede siempre pegado abajo, aunque la página
   tenga poco contenido.

Adentro se renderiza `<Navbar />`, después `<AppRoutes />` (el contenido
que cambia según la URL), y al final `<Footer />`.

**Si preguntan:** ¿por qué los Providers están en App.jsx y no en
main.jsx? Porque main.jsx es más "técnico" (configuración de React), y
App.jsx es donde armamos la estructura visual + lógica de la app.

---

## 2) Context API (estado global)

### `src/contexts/CartContext.jsx`
Maneja el carrito de compras para toda la app. Expone:
- `carrito`: array de productos agregados (cada uno con su `cantidad`).
- `agregarProducto(producto)`: si el producto ya está, le suma 1 a la
  cantidad; si no, lo agrega nuevo.
- `eliminarProducto(id)`: lo saca del carrito con `filter()`.
- `vaciarCarrito()`: vacía el array.
- `total`: no es un estado, se calcula con `reduce()` en cada render
  (precio × cantidad de cada producto, sumado).

### `src/contexts/UserContext.jsx`
Maneja el usuario logueado (simulado, sin backend real):
- `usuario`: `null` si nadie inició sesión.
- `login(email, password)`: validación básica (que no estén vacíos). Si
  pasa, "loguea" con un usuario fake armado a partir del email.
- `registro(nombre, email, password, confirmar)`: valida que no haya
  campos vacíos, que las contraseñas coincidan y que tengan mínimo 6
  caracteres. Devuelve `{ exito, mensaje }`.
- `logout()`: pone `usuario` en `null`.

**Concepto clave en ambos:** `createContext()` crea la "caja" compartida,
el `Provider` la llena de datos, y un custom hook (`useCart()` / `useUser()`)
es solo un atajo para no escribir `useContext(CartContext)` en cada
archivo.

---

## 3) Custom Hooks (traer datos de la API)

### `src/hooks/useProducts.js`
Trae TODOS los productos al montarse (`useEffect` con `[]` de
dependencia = se ejecuta una sola vez). Maneja los 3 estados típicos:
`products`, `loading` y `error`.

### `src/hooks/useCategories.js`
Exactamente el mismo patrón, pero para las categorías.

**Por qué son "custom hooks" y no código suelto:** porque encapsulan la
lógica de "pedir datos + loading + error" en una función reutilizable
(`useProducts()`), en vez de copiar y pegar ese mismo `useEffect` en cada
página que necesite productos.

---

## 4) Services (conexión con la API)

### `src/services/productService.js`
Es el ÚNICO archivo que conoce la URL de la API
(`https://api.escuelajs.co/api/v1`, que es la API real detrás de
"fakeapi.platzi.com"). Tiene 4 funciones, todas con `fetch()`:
- `getProducts()` — trae todos los productos.
- `getProductById(id)` — trae uno puntual (para el detalle).
- `getRelatedProducts(id)` — usa un endpoint específico de la API
  (`/products/{id}/related`) para la sección "también vieron".
- `getCategories()` — trae todas las categorías.

**Por qué separar esto:** si el día de mañana cambia la URL de la API,
se cambia en un solo lugar, no en los 10 componentes que la usan.

---

## 5) Rutas

### `src/routes/AppRoutes.jsx`
El "mapa" de la app: qué componente se muestra según la URL. Usa
`<Routes>` y `<Route>` de React Router v6. La ruta `/producto/:id` usa
un **parámetro dinámico** (`:id`), que se lee en `ProductDetail.jsx` con
`useParams()`. La ruta `path="*"` (comodín) captura cualquier URL que no
matchee con ninguna de arriba, y por eso va siempre al final.

---

## 6) Componentes reutilizables

### `src/components/Navbar.jsx`
Barra de arriba. Tiene: logo (link al Home), botones de categorías
(leídas con `useCategories()`), un buscador (estado local `busqueda`,
al enviar el formulario navega a `/productos?busqueda=...`), el ícono
del carrito con el contador (`carrito.reduce()` para sumar cantidades),
y el botón de login/perfil según si hay `usuario` o no.

### `src/components/Footer.jsx`
Pie de página fijo: datos de la empresa, links de ayuda, redes sociales
y medios de pago. No tiene lógica, es contenido fijo con `Grid` de MUI.

### `src/components/Hero.jsx`
El banner grande del Home, con el botón de bienvenida ("Ver productos").
Sin estado, sin lógica — puro JSX.

### `src/components/CategoryCard.jsx` y `CategoryGrid.jsx`
`CategoryCard` muestra una categoría (imagen + nombre) y, al hacer
click, navega a `/productos?categoria=ID`. `CategoryGrid` simplemente
recorre el array de categorías con `.map()` y pone una `CategoryCard`
por cada una, dentro de un `Grid` (responsive: 2 columnas en celular, 4
en pantallas grandes).

### `src/components/ProductCard.jsx`
La card de un producto. Tiene imagen, nombre, estrellas, badge de
stock, precio (con el de antes tachado si hay descuento), botón "Ver
detalle" (te lleva al detalle) y botón "Agregar"/"Agregar al carrito"
(llama a `agregarProducto()` del `CartContext`). El descuento, el
stock y la calificación NO vienen de la API (la API no los tiene): se
calculan con funciones de `utils/productMeta.js` a partir del `id` del
producto (ver punto 8).

### `src/components/ProductGrid.jsx`
Recorre un array de productos y muestra un `ProductCard` por cada uno,
en un `Grid` responsive. Lo usan tanto `Home.jsx` como `Products.jsx`
(y también `RelatedProducts.jsx`), para no repetir el mismo `Grid` tres
veces.

### `src/components/StarRating.jsx`
Dibuja 5 estrellitas: llena las primeras N (según
`Math.round(calificacion)`) y deja el resto vacías. Es puramente
visual, recibe el número por props.

### `src/components/TrustBadges.jsx`
3 íconos fijos (envío gratis, garantía, pago seguro) cerca del botón de
compra. Sin lógica.

### `src/components/RelatedProducts.jsx`
Recibe un array de productos relacionados y, si tiene algo, muestra el
título "Quienes compraron esto también vieron" + un `ProductGrid`. Si
el array está vacío, no renderiza nada (`return null`).

---

## 7) Utilidad: datos que la API no tiene

### `src/utils/productMeta.js`
La API de Platzi no manda descuento, stock ni calificación de cada
producto, pero la consigna pide mostrarlos. La solución: "inventar"
esos datos a partir del **id del producto**, usando el operador `%`
(resto de una división):

- `tieneDescuento(id)`: `true` si el id es múltiplo de 3.
- `obtenerEstadoStock(id)`: según el resto de `id % 7`, devuelve
  `"sin-stock"`, `"ultimas-unidades"` o `"disponible"`.
- `obtenerCalificacion(id)`: una fórmula simple que da un número entre
  3.5 y 5.

**Por qué NO usamos `Math.random()`:** porque cambiaría el valor cada
vez que se recarga la página (un producto podría tener descuento ahora
y no tenerlo en el próximo refresh). Usando el `id` como base, el
mismo producto siempre muestra el mismo dato.

---

## 8) Páginas

### `src/pages/Home.jsx` (ruta `/`)
Muestra el `Hero`, las categorías (`useCategories()` + `CategoryGrid`),
y 8 productos "destacados". Estos se calculan con `useState` +
`useEffect`: cuando `products` llega de `useProducts()`, se desordena
una copia del array con `.sort(() => Math.random() - 0.5)` y se toman
los primeros 8 con `.slice(0, 8)`.

### `src/pages/Products.jsx` (ruta `/productos`)
Lista todos los productos con buscador, filtro de categoría y
**paginado** (8 productos por página, con el componente `Pagination`
de MUI). El filtrado se hace en JavaScript puro con `.filter()`
(comparando el texto en minúsculas y la categoría), y de ese resultado
filtrado se recorta solo la "página" actual con `.slice()`. Cada vez
que se cambia un filtro, se vuelve a la página 1 (si no, se podría
quedar viendo una página vacía).

### `src/pages/ProductDetail.jsx` (ruta `/producto/:id`)
Lee el `id` de la URL con `useParams()`, y con dos `useEffect`
separados trae: (1) el producto puntual con `getProductById`, y (2) los
relacionados con `getRelatedProducts`. Muestra imagen grande,
descripción, precio con descuento, stock, estrellas, el botón de
agregar al carrito, los `TrustBadges`, y al final `RelatedProducts`.

### `src/pages/Login.jsx` (ruta `/login`)
Formulario controlado (cada campo es un `useState`). Al enviar, llama
a `login()` del `UserContext`; si devuelve `false`, muestra un
`Alert` de error.

### `src/pages/Register.jsx` (ruta `/registro`)
Igual que Login, pero con 4 campos y llamando a `registro()`, que
devuelve un objeto `{ exito, mensaje }` con el motivo puntual del
error (contraseñas distintas, campos vacíos, etc.).

### `src/pages/Cart.jsx` (ruta `/carrito`)
Lista los productos del carrito (`useCart()`), con su subtotal, el
total general, un botón para eliminar cada uno, y un botón "Vaciar
carrito" que abre un `Dialog` de confirmación antes de vaciar de
verdad (usamos un `useState` booleano para abrir/cerrar el diálogo).

### `src/pages/Profile.jsx` (ruta `/perfil`)
Si no hay `usuario` en el `UserContext`, muestra un mensaje invitando a
loguearse. Si hay usuario, muestra su nombre, email y la cantidad de
productos en el carrito (sumando cantidades del `CartContext`).

### `src/pages/Contact.jsx` (ruta `/contacto`)
Formulario simple (nombre, email, asunto, mensaje), todo con
`useState`. No usa ningún Context porque no necesita ni el usuario ni
el carrito. Al enviar, como no hay backend, solo se muestra un `Alert`
de éxito y se limpian los campos.

### `src/pages/NotFound.jsx` (ruta `*`)
Página fija (sin estado) que se muestra cuando la URL no matchea con
ninguna ruta definida.

---

## Preguntas típicas que te pueden hacer (y cómo responder)

**¿Por qué usaste Context API y no pasar props?**
Porque el carrito y el usuario los necesitan componentes que están en
lugares muy distintos del árbol (Navbar, Cart, Profile, ProductCard...).
Pasarlo todo por props significaría atravesar muchos componentes
intermedios que ni siquiera lo usan ("prop drilling").

**¿Por qué `total` no es un `useState`?**
Porque se puede calcular siempre a partir de `carrito` (es un "valor
derivado"). Si lo guardáramos en un estado aparte, tendríamos que
acordarnos de actualizarlo manualmente cada vez que cambia el carrito,
y eso es una fuente común de bugs.

**¿De dónde salen el descuento/estrellas/stock si la API no los tiene?**
Se calculan en el front, en `utils/productMeta.js`, usando el `id` del
producto con el operador `%` (ver punto 7).

**¿Por qué la API es `api.escuelajs.co` y no `fakeapi.platzi.com`?**
Porque `fakeapi.platzi.com` es el nombre de marketing del servicio,
pero el dominio real al que apuntan las peticiones es
`api.escuelajs.co` (lo podés confirmar en la propia documentación de
Platzi).
