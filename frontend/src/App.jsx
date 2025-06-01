import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Cadastro from './Components/Cadastro';
import Home from './Components/Home';

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/login' && location.pathname !== '/cadastro' && <Navbar />}
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/cadastro' element={<Cadastro />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  )
}

export default App