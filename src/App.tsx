import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Logins';
import TransparentNavbar from './components/TransparentNavbar';
import Users from './pages/Users';

function App() {
  return (
    <BrowserRouter>
    <TransparentNavbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
