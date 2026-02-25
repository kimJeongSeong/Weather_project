import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './Project/Home'
import { HashRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
    <Home />
    </HashRouter>
  </StrictMode>,
)
