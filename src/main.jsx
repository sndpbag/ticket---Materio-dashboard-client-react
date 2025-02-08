import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './Router/Router'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './Provider/AuthProvider'
// import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthProvider>
  <RouterProvider router={router} >
    
    </RouterProvider>
  </AuthProvider>
  </StrictMode>,
)
