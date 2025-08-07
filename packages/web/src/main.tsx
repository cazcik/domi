import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './main.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <p>web</p>
  </StrictMode>,
)
