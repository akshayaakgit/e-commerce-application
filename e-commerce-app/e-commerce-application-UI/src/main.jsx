import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './Public/Login.jsx'
import Register from './Public/Register'
import Home from './Public/Home'
import SellerDashboard from './Private/Seller/SellerDashboard'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/seller' element={<SellerDashboard/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
