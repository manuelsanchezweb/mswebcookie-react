import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { CookieContextProvider } from './context/CookieContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CookieContextProvider>
      <App />
    </CookieContextProvider>
  </React.StrictMode>
)
