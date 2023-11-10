import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'tailwindcss/tailwind.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router.jsx';
import store from './store/index.js';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>,
)
