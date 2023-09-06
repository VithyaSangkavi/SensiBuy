import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:4000/api/users/login', {
        userEmail: email,
        password: password
      });
  
      if (response.status === 200) {
        const data = response.data;
        const firstName = data.user.firstName;
  
        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', data.user.firstName);
  
        console.log('Login successful:');
        console.log('User Name: ', firstName);
  
        window.location.reload();

      } else {
        console.error('Login error:', response.data);
        alert('Invalid Login');
      }
    } catch (error) {
      if (error.response) {
        // Server responded with an error status code (e.g., 401)
        console.error('Authentication Error:', error.response.data.error);
        alert('Authentication Error: ' + error.response.data.error);
      } else if (error.request) {
        // The request was made, but no response was received
        console.error('Network Error:', error.request);
        alert('Network Error: Unable to connect to the server');
      } else {
        // Something happened in setting up the request
        console.error('Error:', error.message);
        alert('An error occurred while logging in');
      }
    }
  };
  
  return (
    <>
      <div className='min-h-screen flex justify-center items-center'>
        <div className='border-2 border[#1F2937] p-16'>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email Address</label> <br />
              <input type="email" placeholder="Email Address" className='border-2 border[#1F2937] w-[250px] h-[35px]' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <br />
            <div>
              <label>Password</label> <br />
              <input type="password" placeholder="password" className='border-2 border[#1F2937] w-[250px] h-[35px]' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <br />
            <button type="submit" className='bg-[#5850EC] pr-20 pl-20 pt-2 pb-2 text-white w-[250px] h-[35px] font-bold'>Sign in</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
