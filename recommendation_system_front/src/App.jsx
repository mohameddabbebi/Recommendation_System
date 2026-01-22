import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from 'react';
import './App.css';
import {Route ,Routes , Link} from 'react-router-dom';
import Home from './pages/home.jsx';  
import Login from './pages/login.jsx';
import Register from './pages/register.jsx';
import Dashboard from './pages/dashboard.jsx';
import MyReviews from './pages/my_reviews.jsx';
import Products from './pages/products.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
function App() {
  React.useEffect(() => {
    document.title = "RecoSystem - Recommandations Intelligentes";
  }, []);

  return <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/register' element={<Register/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/my-reviews' element={<MyReviews/>}/>
    <Route path='/products' element={<Products/>}/>
    <Route path='/products/:id' element={<ProductDetails/>}></Route>
  </Routes> ;
}

export default App;
