import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'  // ← Pastikan import ini ada!
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>  {/* ← Pastikan ini ada! */}
      <App />
    </BrowserRouter>
  </StrictMode>,
)