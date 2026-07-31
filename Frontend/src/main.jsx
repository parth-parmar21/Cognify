import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/index.css'
import App from './app/App.jsx'
import { Provider } from 'react-redux'
import { store } from './app/app.store.js'
import { Toaster } from 'react-hot-toast'
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
      }}
    />
  </Provider>
)
