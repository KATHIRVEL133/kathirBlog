
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {persistor,store} from './redux/store.js'
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import './index.css'
import ThemeProvider from './components/ThemeProvider.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
   <PersistGate loading={null} persistor={persistor}>
    <ThemeProvider>
     <App />
    </ThemeProvider>
   </PersistGate>
  </Provider>
  
)
