import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import './index.css'
import App from './App.jsx'

// CssBaseline es de Material UI: resetea márgenes y estilos raros
// que trae el navegador por defecto (lo recomienda la documentación
// oficial de MUI cuando usás sus componentes)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CssBaseline />
    <App />
  </StrictMode>,
)
