import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EyeLogo from '../images/Eye.png';

const Navbar = () => {
  const navigate = useNavigate();
  const [storedUserName, setStoredUserName] = useState(localStorage.getItem('userName'));

  const [user, setUser] = useState(null);

  useEffect(() => {
   
    if (storedUserName) {
      setUser({ userName: storedUserName });
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:3000/users/logout', {
        token: localStorage.getItem('token'),
      });

      if (response.status === 200) {
        localStorage.removeItem('userName'); 
        setUser(null); 
        navigate('/'); 
      } else {
        console.error('Logout failed:', response.data.error);
      }
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <div className="logo">
          <img src={EyeLogo} alt="Logo" className="h-10" />
        </div>
        <div className="ml-2">
          <h1 className="text-2xl font-bold">SensiBuy</h1>
        </div>
      </div>
      <ul className="flex space-x-4 jusify-center">
        <li><a href="#" className="link-light link-offset-2 link-underline link-underline-opacity-0">Home</a></li>
        <li><a href="#" className="link-light link-offset-2 link-underline link-underline-opacity-0">About Us</a></li>
        <li><a href="#" className="link-light link-offset-2 link-underline link-underline-opacity-0">Contact Us</a></li>
        <li><a href="#" className="link-light link-offset-2 link-underline link-underline-opacity-0">Services</a></li>
        <li></li>
        <li></li>
        <li></li>
        {user ? (
          <>
            <li><span className="link-light link-offset-2 link-underline link-underline-opacity-0">Hello, {user.userName}</span></li>
            <li><button onClick={handleLogout} className="link-light link-offset-2 link-underline link-underline-opacity-0">Logout</button></li>
          </>
        ) : (
          <li><a href="/login" className="link-light link-offset-2 link-underline link-underline-opacity-0">Login</a></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
