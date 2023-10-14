import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';
import LoginImage from '../../images/login.png'


function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const selectedLanguage = localStorage.getItem("selectedLanguage") || "English";
  console.log('get language ', selectedLanguage)

  // const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  // recognition.lang = 'en-US'; // Set the language to English (or your preferred language)
  // recognition.continuous = false; // Disable continuous recognition

  // recognition.onresult = (event) => {
  //   const transcript = event.results[0][0].transcript;
  //   setEmail(transcript); // Update the email input field with the recognized text
  // };

  // recognition.onend = () => {
  //   // Speech recognition ended
  //   // You can choose to restart recognition here if needed
  // };

  const speakLabel = (labelText) => {
    const utterance = new SpeechSynthesisUtterance(labelText);
    window.speechSynthesis.speak(utterance);
  };

  const speakSinhala = (sinhalaLabel) => {
    const utterance = new SpeechSynthesisUtterance(sinhalaLabel);
    utterance.lang = "si-LK"
    window.speechSynthesis.speak(utterance);
  }

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
  };

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
        localStorage.setItem('userType', data.user.userType);
        localStorage.setItem('userID', data.user._id);

        console.log('Login successful:');
        console.log('User Name: ', firstName);
        console.log('user type', data.user.userType);
        console.log('userID: ', data.user._id)


        if (data.user.userType === 'Admin') {
          navigate('/AdminInterface');
        } else if (data.user.userType === 'User') {
          navigate('/UserInterface');
        } else {
          console.log('Login unsuccessful: Unknown userType', data.userType);
          alert('Invalid Login');
        }

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
      <div className="flex min-h-screen justify-center mt-[100px] h-[400px]">
        <div className="flex shadow-none md:shadow-[0_0_10px_rgba(0,0,0,0.5)] h-[300px] md:h-[350px] border-2">
          <div className="bg-blue-900 w-[300px] h-[400px] hidden md:block relative p-[15px]">
            <img
              src={LoginImage}
              alt="Signup Image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex shadow-none md:shadow-[0_0_10px_rgba(0,0,0,0.5)] w-[400px] md:h-[400px] border-2">
          <div className="w-full px-[50px] h-[400px] ">
            <form onSubmit={handleSubmit}>
              <br /><br />
              <h1 className='font-bold text-xl text-blue-900' onMouseEnter={() => selectedLanguage === "Sinhala" ? speakSinhala('කරුණාකර ඔබගේ පිවිසුම් අක්තපත්‍ර සපයන්න') : speakLabel('Please provide your login credentials')}
                onMouseLeave={stopSpeaking}>
                Login to your account
              </h1>
              <br />
              <div>
                <label onMouseEnter={() => selectedLanguage === "Sinhala" ? speakSinhala('ඔබගේ විද්‍යුත් තැපෑල ඇතුලත් කරන්න') : speakLabel('Enter your email address')}
                  onMouseLeave={stopSpeaking}>
                  Email Address
                </label>
                <br />
                <input type="email" placeholder="Email Address" className='border-2 border[#1F2937] w-[250px] h-[35px]' value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <br />
              <div>
                <label onMouseEnter={() => selectedLanguage === "Sinhala" ? speakSinhala('ඔබගේ මුරපදය ඇතුලත් කරන්න') : speakLabel('Enter your password')}
                  onMouseLeave={stopSpeaking}>
                  Password
                </label>
                <br />
                <input type="password" placeholder="password" className='border-2 border[#1F2937] w-[250px] h-[35px]' value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <br />
              <button onMouseEnter={() => selectedLanguage === "Sinhala" ? speakSinhala('පුරනය වීමට click කරන්න') : speakLabel('Click to signin')} type="submit" className='bg-blue-900 pr-20 pl-20 pt-2 pb-2 text-white w-[250px] h-[35px] font-bold'
                onMouseLeave={stopSpeaking}>Sign in</button>
              <br />
              <br />
              <Link to="/signup" onMouseEnter={() => selectedLanguage === "Sinhala" ? speakSinhala('ඔබට ගිණුමක් නැද්ද?') : speakLabel("Don't have an account?")}
                onMouseLeave={stopSpeaking}>
                Don't have an account? Create Account</Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
