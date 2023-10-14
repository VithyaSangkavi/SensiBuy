import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import EyeLogo from '../images/Eye.png';

const Navbar = () => {
  const navigate = useNavigate();
  const [storedUserName, setStoredUserName] = useState(localStorage.getItem('userName'));
  const selectedLanguage = localStorage.getItem('selectedLanguage')

  const [user, setUser] = useState(null);

  useEffect(() => {

    if (storedUserName) {
      setUser({ userName: storedUserName });
    }
  }, []);

  const speakLabel = (labelText) => {
    const utterance = new SpeechSynthesisUtterance(labelText);
    window.speechSynthesis.speak(utterance);
  };

  const speakSinhala = (sinhalaLabel) => {
    const utterance = new SpeechSynthesisUtterance(sinhalaLabel);
    utterance.lang = "si-LK"
    window.speechSynthesis.speak(utterance);
  }

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/users/logout', {
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
    navigate('/profile2')
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
            <a href="#" className="hover:text-gray-300 text-xl">Home</a>
            <a href="#" className="hover:text-gray-300 text-xl">About Us</a>
            <a href="#" className="hover:text-gray-300 text-xl">Contact Us</a>
            <a href="#" className="hover:text-gray-300 text-xl">Services</a>
          </div>
          <div className='flex gap-[20px]'>
            {user ? (
              <>
                <span className="text-gray-300">Hello, {user.userName}</span>
                <button onClick={viewProfile} className="hover:text-gray-300 border px-4 py-2 rounded-lg"
                 onMouseEnter={() => selectedLanguage === "Sinhala" ? speakSinhala('ඔබගේ ගිණුම් විස්තර බලන්න') : speakLabel('Click here to view your profile details')}>View Profile</button>
                <button onClick={handleLogout} className="hover:text-gray-300 border px-4 py-2 rounded-lg">Logout</button>
              </>
            ) : (
              <a href="/login" className="hover:text-gray-300 border px-4 py-2 rounded-lg">Login</a>
            )}
          </div>

      </nav>
      <Outlet>

      </Outlet>
    </>
  );
};

export default Navbar;
