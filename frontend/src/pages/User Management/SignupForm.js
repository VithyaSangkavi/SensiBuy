import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import SignUpImage from '../../images/signup.png'

const SignupForm = () => {


    const [emailError, setEmailError] = useState('');

    const navigate = useNavigate('');
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    const [recognizedSpeech, setRecognizedSpeech] = useState('');

    //const [selectedLanguage, setSelectedLanguage] = useState("Sinhala");
    const selectedLanguage = localStorage.getItem("selectedLanguage") || "English";
    console.log(selectedLanguage)

    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState('');

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userEmail: '',
        password: '',
        userType: 'User',
        imageUrl: '',
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // if (name === 'password') {
        //     // Check if confirm password matches
        //     if (confirmPassword !== value) {
        //         if (selectedLanguage === 'Sinhala') {
        //             setEmailError('මුර පද ගැලපෙන්නේ නැත');
        //           } else {
        //             setEmailError('Passwords do not match');
        //           }
        //     } else {
        //         setPasswordMatchError('');
        //     }
        // } else if (name === 'confirmPassword') {
        //     // Update the confirm password state
        //     setConfirmPassword(value);

        //     // Check if confirm password matches
        //     if (formData.password !== value) {
        //         if (selectedLanguage === 'Sinhala') {
        //             setEmailError('මුර පද ගැලපෙන්නේ නැත');
        //           } else {
        //             setEmailError('Passwords do not match');
        //           }
        //           return;
        //     } else {
        //         setPasswordMatchError('');
        //     }
        // }
    };

    const validateName = (name) => {
        // Check if the name contains only letters (no numbers or special characters)
        return /^[A-Za-z]+$/.test(name);
    };

    const validateEmail = (email) => {
        // Check if the email is in the proper format using a simple regex pattern
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate first name
        if (!validateName(formData.firstName)) {
            // setEmailError('First name should contain only letters');
            // return;
            if (selectedLanguage === 'Sinhala') {
                setEmailError('මුල් නමේ අකුරු පමණක් අඩංගු විය යුතුය');
              } else {
                setEmailError('First name should contain only letters');
              }
              return;
        } else {
            setEmailError('');
        }

        // Validate last name
        if (!validateName(formData.lastName)) {
            if (selectedLanguage === 'Sinhala') {
                setEmailError('අවසාන නමේ අකුරු පමණක් අඩංගු විය යුතුය');
              } else {
                setEmailError('Last name should contain only letters');
              }
              return;
        } else {
            setEmailError('');
        }

        // Validate email
        if (!validateEmail(formData.userEmail)) {
            if (selectedLanguage === 'Sinhala') {
                setEmailError('වලංගු නොවන ඊමේල් ආකෘතිය');
              } else {
                setEmailError('Invalid email format');
              }
              return;
        } else {
            setEmailError('');
        }

        // Check if the passwords match
        if (formData.password !== formData.confirmPassword) {
            if (selectedLanguage === 'Sinhala') {
                setEmailError('මුර පද ගැලපෙන්නේ නැත');
              } else {
                setEmailError('Passwords do not match');
              }
              return;
        }

        try {
            const response = await axios.post('http://localhost:4000/api/users', formData);

            if (response.status === 201) {
                const data = response.data;
                console.log('User registered:', data);
                navigate('/login');
            } else {
                console.error('Signup failed');
            }
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };


    const speakLabel = (labelText) => {
        const utterance = new SpeechSynthesisUtterance(labelText);
        window.speechSynthesis.speak(utterance);
    };

    const speakSinhala = (sinhalaLabel) => {
        const utterance = new SpeechSynthesisUtterance(sinhalaLabel);
        utterance.lang = "si-LK"
        window.speechSynthesis.speak(utterance);
    }

    // // Initialize SpeechRecognition
    // recognition.lang = 'en-US';
    // recognition.interimResults = false;

    // recognition.onresult = (event) => {
    //     const transcript = event.results[0][0].transcript;
    //     // Update the input field with the recognized text
    //     setRecognizedSpeech(transcript);
    // };

    // recognition.onerror = (event) => {
    //     console.error('Speech recognition error:', event.error);
    //     // Handle the error as needed
    // };

    // // Function to start speech recognition
    // const startRecognition = () => {
    //     recognition.start();
    // };

    return (
        <div className="flex min-h-screen justify-center mt-[50px] h-[400px]">
            <div className="flex shadow-none md:shadow-[0_0_10px_rgba(0,0,0,0.5)] h-[300px] md:h-[350px] border-2">
                <div className="bg-blue-900 w-[300px] h-[600px] hidden md:block relative p-[15px]">
                    <img
                        src={SignUpImage}
                        alt="Signup Image"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
            <div className="flex shadow-none md:shadow-[0_0_10px_rgba(0,0,0,0.5)] w-[400px] md:h-[600px] border-2">
                <div className="w-full px-[50px] h-[400px] ">
                    <div className=" mb-[20px]">
                        <br />
                        <br />
                        <h2 className="text-blue-900 font-bold text-2xl  mb-4"
                            onMouseEnter={() => selectedLanguage === "Sinhala" ? speakSinhala('පහත විස්තර ලබා දීමෙන් ඔබම ලියාපදිංචි වන්න') : speakLabel('Register yourself by providing following details')}>
                                USER REGISTRATION
                                </h2><br />
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName"
                                    onMouseEnter={() => selectedLanguage === "Sinhala" ? speakSinhala('ඔබගේ මුල් නම ඇතුලත් කරන්න') : speakLabel('Enter your first name')}>
                                    First Name:
                                </label>
                                <input
                                    className="w-full border rounded px-2"
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    placeholder='Enter your first name'
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />

                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName"
                                    onMouseEnter={() => selectedLanguage === "Sinhala" ? speakSinhala('ඔබගේ අවසන් නම ඇතුලත් කරන්න') : speakLabel('Enter your last name')}>
                                    Last Name:
                                </label>
                                <input
                                    className="w-full border rounded text-s px-2"
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    placeholder='Enter your last name'
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userEmail"
                                    onMouseEnter={() => selectedLanguage === "Sinhala" ? speakSinhala('ඔබගේ විද්‍යුත් තැපෑල ඇතුලත් කරන්න') : speakLabel('Enter your email address')}>
                                    Email:
                                </label>
                                <input
                                    className="w-full border rounded px-2"
                                    type="email"
                                    id="userEmail"
                                    name="userEmail"
                                    placeholder='Enter your email'
                                    value={formData.userEmail}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password"
                                    onMouseEnter={() => selectedLanguage === "Sinhala" ? speakSinhala('ඔබගේ මුරපදය ඇතුලත් කරන්න') : speakLabel('Enter your password')}>
                                    Password:
                                </label>
                                <input
                                    className="w-full border rounded px-2"
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder='Enter your password'
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword"
                                    onMouseEnter={() => selectedLanguage === "Sinhala" ? speakSinhala('නැවත ඔබගේ මුරපදය ඇතුලත් කරන්න') : speakLabel('Re enter your password')}>
                                    Confirm Password:
                                </label>
                                <input
                                    className="w-full border rounded px-2"
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder='Re-enter your password'
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                                {emailError && (
                                    <p className="text-red-500 font-bold text-sm" onMouseEnter={() =>  selectedLanguage === "Sinhala" ? speakSinhala(emailError) : speakLabel(emailError)}>
                                        {emailError}
                                    </p>
                                )}
                                {/* {passwordMatchError && (
                                    <p className="text-red-500 font-bold text-sm"onMouseEnter={() =>  selectedLanguage === "Sinhala" ? speakSinhala(passwordMatchError) : speakLabel(passwordMatchError)}>{passwordMatchError}</p>
                                )} */}
                            </div>
                            
                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-900 text-white p-2 rounded hover:bg-blue-600 font-bold"
                                    onMouseEnter={() => selectedLanguage === "Sinhala" ? speakSinhala('ලියාපදිංචි වීමට click කරන්න') : speakLabel('Click to signup')}>
                                    Sign Up
                                </button>
                                <br /><br />
                                <Link to="/login"> Already have an account? Login</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default SignupForm;
