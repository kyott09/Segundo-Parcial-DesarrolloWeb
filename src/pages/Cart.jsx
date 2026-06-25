
import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Container,
  Typography,
  Box,
  Button,
  IconButton,
  Paper,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

// Usamos el CartContext completo: leer, eliminar, vaciar y el total
import { useCart } from "../contexts/CartContext";

function Cart() {
  // Sacamos TODO lo que necesitamos del contexto del carrito
  const { carrito, eliminarProducto, vaciarCarrito, total } = useCart();

  // Estado local SOLO para este componente: controla si el Dialog
  // de confirmación (vaciar carrito) está abierto o cerrado
  const [dialogoAbierto, setDialogoAbierto] = useState(false);

  // Confirma el vaciado: vacía el carrito y cierra el dialog
  const confirmarVaciado = () => {
    vaciarCarrito();
    setDialogoAbierto(false);
  };

  // ---------------------------------------------
  // CASO: carrito vacío
  // ---------------------------------------------
  if (carrito.length === 0) {
    return (
      <Container maxWidth="sm" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Tu carrito está vacío
        </Typography>
        <Button component={Link} to="/productos" variant="contained" sx={{ mt: 2 }}>
          Ver productos
        </Button>
      </Container>
    );
  }

  // ---------------------------------------------
  // CASO: carrito con productos
  // ---------------------------------------------
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Tu carrito
      </Typography>

      {/* Recorremos cada producto del carrito */}
      {carrito.map((item) => (
        <Paper key={item.id} sx={{ p: 2, mb: 2, display: "flex", alignItems: "center", gap: 2 }}>

          {/* Imagen chica del producto */}
          <Box
            component="img"
            src={item.images[0]}
            alt={item.title}
            sx={{ width: 80, height: 80, objectFit: "contain", backgroundColor: "#f5f5f5" }}
          />

          {/* Info del producto: nombre, precio unitario y cantidad */}
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {item.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ${item.price} x {item.cantidad} unidad(es)
            </Typography>
          </Box>

          {/* Subtotal de esta línea (precio * cantidad) */}
          <Typography variant="subtitle1" fontWeight="bold">
            ${(item.price * item.cantidad).toFixed(2)}
          </Typography>

          {/* Botón para eliminar este producto puntual */}
          <IconButton color="error" onClick={() => eliminarProducto(item.id)}>
            <DeleteIcon />
          </IconButton>
        </Paper>
      ))}

      <Divider sx={{ my: 3 }} />

      {/* Total general del carrito */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          Total: ${total.toFixed(2)}
        </Typography>

        {/* Este botón solo ABRE el dialog de confirmación, no vacía directo */}
        <Button color="error" variant="outlined" onClick={() => setDialogoAbierto(true)}>
          Vaciar carrito
        </Button>
      </Box>

      {/* ---------------------------------------------- */}
      {/* DIALOG de confirmación antes de vaciar */}
      {/* ---------------------------------------------- */}
      <Dialog open={dialogoAbierto} onClose={() => setDialogoAbierto(false)}>
        <DialogTitle>¿Vaciar el carrito?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Esta acción eliminará todos los productos del carrito y no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogoAbierto(false)}>Cancelar</Button>
          <Button onClick={confirmarVaciado} color="error" variant="contained">
            Sí, vaciar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Cart;


