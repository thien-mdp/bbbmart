import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'

import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import store from './redux/store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ToastContainer
          theme="light"
          position="top-right"
          autoClose={3000}
          closeOnClick
          pauseOnHover={false}
          />
        <App/>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
