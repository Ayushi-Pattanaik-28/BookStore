import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, changeRole } from './store/auth';  // Correct import for actions

import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import AllBooks from './pages/AllBooks';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import ViewBookDetails from './components/ViewBookDetails';
import AboutUs from './pages/AboutUs';
import Favourites from './components/Profile/Favourites';
import Edit from './components/Profile/Edit';
import AddBook from './components/Profile/AddBook';



function App() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(login()); // Dispatch login action
      dispatch(changeRole(localStorage.getItem("role"))); // Dispatch role change action
    }
  }, [dispatch]);  // Add dispatch as a dependency to ensure it's updated correctly

  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/all-books' element={<AllBooks />} />
        <Route path='/profile' element={<Profile />} />
          
          
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/view-book-details/:id' element={<ViewBookDetails />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/favourite' element={<Favourites />} />
        <Route path='/editProduct/:id' element={<Edit />} />
        <Route path='/addBook' element={<AddBook />} />
        
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
