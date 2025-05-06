import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { router } from './backend/routes/router';

import {
  RouterProvider,
} from "react-router";

import './index.css'

const root : HTMLElement = document.getElementById('root')!;

createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
