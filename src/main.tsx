import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App';
import { BrowserRouter } from 'react-router';
import './index.css'

const root : HTMLElement = document.getElementById('root')!;

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
