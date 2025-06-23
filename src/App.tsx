import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Logins';
import TransparentNavbar from './components/TransparentNavbar';
import Users from './pages/Users';
import EditUser from './pages/EditUser';
import EditProfile from './pages/EditProfile';
function App() {
  return (
    <BrowserRouter>
    <TransparentNavbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/edit/:id" element={<EditUser />} />
        <Route path="/users/edit/profile" element={<EditProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
