
import { createContext, useContext, useState } from "react";

// 1) Creamos la "caja" del usuario
const UserContext = createContext();

// 2) El Provider que va a envolver toda la app (junto con CartProvider)
export function UserProvider({ children }) {
  // usuario: arranca en null porque al abrir la app nadie está logueado
  const [usuario, setUsuario] = useState(null);

  // Lista de usuarios que se fueron registrando durante esta sesión.
  // Como no hay backend, esto vive solo en memoria: si recargás la
  // página, se pierde (la consigna dice que no es necesario persistir).
  // Cada elemento es: { nombre, email, password }
  const [usuariosRegistrados, setUsuariosRegistrados] = useState([]);

  // ---------------------------------------------
  // Login: ahora SÍ valida contra los usuarios registrados.
  // Antes dejaba entrar a cualquiera con email/password no vacíos;
  // por eso se podía "loguear" sin haberse registrado antes.
  // ---------------------------------------------
  const login = (email, password) => {
    // Validación básica: que no estén vacíos
    if (!email || !password) {
      return false;
    }

    // Buscamos un usuario registrado con ESE email y ESA contraseña
    const usuarioEncontrado = usuariosRegistrados.find(
      (u) => u.email === email && u.password === password
    );

    if (!usuarioEncontrado) {
      // No existe ningún usuario registrado con esos datos
      return false;
    }

    setUsuario({
      nombre: usuarioEncontrado.nombre,
      email: usuarioEncontrado.email,
    });

    return true; // login exitoso
  };

  // ---------------------------------------------
  // Simula el registro de un usuario nuevo
  // ---------------------------------------------
  const registro = (nombre, email, password, confirmarPassword) => {
    // Validaciones básicas que pide la consigna
    if (!nombre || !email || !password || !confirmarPassword) {
      return { exito: false, mensaje: "Todos los campos son obligatorios" };
    }

    if (password !== confirmarPassword) {
      return { exito: false, mensaje: "Las contraseñas no coinciden" };
    }

    if (password.length < 6) {
      return {
        exito: false,
        mensaje: "La contraseña debe tener al menos 6 caracteres",
      };
    }

    // Nos aseguramos de que no exista ya un usuario con ese email
    const yaExiste = usuariosRegistrados.some((u) => u.email === email);
    if (yaExiste) {
      return { exito: false, mensaje: "Ese email ya está registrado" };
    }

    // Lo guardamos en la lista de usuarios registrados (con su password,
    // para poder validarlo después en el login)
    setUsuariosRegistrados([
      ...usuariosRegistrados,
      { nombre, email, password },
    ]);

    // Y lo dejamos logueado directamente, sin tener que pasar por /login
    setUsuario({ nombre, email });

    return { exito: true, mensaje: "Usuario registrado correctamente" };
  };

  // ---------------------------------------------
  // Cierra sesión
  // ---------------------------------------------
  const logout = () => {
    setUsuario(null);
  };

  // 3) Lo que va a estar disponible para todos los componentes
  const value = {
    usuario,
    login,
    logout,
    registro,
  };

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );
}

// 4) Atajo para usar el contexto fácilmente
export function useUser() {
  return useContext(UserContext);
}
