import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import EyeLogo from '../images/Eye.png';

const AdminNavbar = () => {
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

  const viewProfile = () => {
    navigate('/profile')
  }

  return (
    <>
      <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="logo">
            <img src={EyeLogo} alt="Logo" className="h-10" />
          </div>
          <div className="ml-2">
            <h1 className="text-2xl font-bold">SensiBuy</h1>
          </div>
        </div>
        <div className='flex gap-[50px]'>
          <a href="#" className="hover:text-gray-300 text-xl">Products</a>
          <a href="#" className="hover:text-gray-300 text-xl">Tickets</a>
        </div>

        <div className='flex gap-[20px]'>
          {user ? (
            <>
              <span className="text-gray-300">Hello, {user.userName}</span>
              <button onClick={viewProfile} className="hover:text-gray-300 border px-4 py-2 rounded-lg">View Profile</button>
              <button onClick={handleLogout} className="hover:text-gray-300 border px-4 py-2 rounded-lg">Logout</button>
            </>
          ) : (
            <li><a href="/login" className="hover:text-gray-300 border px-4 py-2 rounded-lg">Login</a></li>
          )}
        </div>
      </nav>
      <Outlet>

      </Outlet>
    </>
  );
};

export default AdminNavbar;
