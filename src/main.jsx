import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Loader from './components/ui/Loader.jsx'

import { HelmetProvider } from "react-helmet-async";

// Just to show you my loading screen 😁
const App = lazy(() =>
  new Promise(
    resolve => setTimeout(
      () => resolve(import('./App.jsx')), 0
    )))


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <App />
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
)
