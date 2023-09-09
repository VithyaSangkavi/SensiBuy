import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import SignUpImage from '../../images/signup.png'

const SignupForm = () => {

    const navigate = useNavigate('');
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    const [recognizedSpeech, setRecognizedSpeech] = useState('');

    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState('');
    const [userImage, setImage] = useState("");

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userEmail: '',
        password: '',
        userType: 'User',
        imageUrl: '',
    });


    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    }

    //uploading the image
    const uploadImage = async (event) => {
        event.preventDefault();

        const file = event.target.files[0];
        const base64 = await convertBase64(file);
        setLoading(true);
        console.log(base64);
        axios
            .post(`http://localhost:4000/uploadImage`, { image: base64 })
            .then((res) => {
                console.log(res.data);
                setImageUrl(res.data);

                //res.data
                alert("Image uploaded Succesfully");
            })
            .then(() => setLoading(false))
            .catch(console.log);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (name === 'password') {
            // Check if confirm password matches
            if (confirmPassword !== value) {
                setPasswordMatchError('Passwords do not match');
            } else {
                setPasswordMatchError('');
            }
        } else if (name === 'confirmPassword') {
            // Update the confirm password state
            setConfirmPassword(value);

            // Check if confirm password matches
            if (formData.password !== value) {
                setPasswordMatchError('Passwords do not match');
            } else {
                setPasswordMatchError('');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if the passwords match
        if (formData.password !== confirmPassword) {
            setPasswordMatchError('Passwords do not match');
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
                            onMouseEnter={() => speakLabel('You can register yourself by providing your details')}>USER REGISTRATION</h2><br />
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName"
                                    onMouseEnter={() => speakLabel('Enter your First Name')}>
                                    First Name:
                                </label>
                                <input
                                    className="w-full border rounded"
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
                                    onMouseEnter={() => speakLabel('Enter your Last Name')}>
                                    Last Name:
                                </label>
                                <input
                                    className="w-full border rounded text-s"
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
                                    onMouseEnter={() => speakLabel('Enter your email')}>
                                    Email:
                                </label>
                                <input
                                    className="w-full border rounded"
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
                                    onMouseEnter={() => speakLabel('Enter you password')}>
                                    Password:
                                </label>
                                <input
                                    className="w-full border rounded"
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
                                    onMouseEnter={() => speakLabel('Re enter your password')}>
                                    Confirm Password:
                                </label>
                                <input
                                    className="w-full border rounded"
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder='Re-enter your password'
                                    value={confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                                {passwordMatchError && (
                                    <p className="text-red-500 text-sm">{passwordMatchError}</p>
                                )}
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-900 text-white p-2 rounded hover:bg-blue-600 font-bold"
                                    onMouseEnter={() => speakLabel('Click to signup')}
                                >
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
