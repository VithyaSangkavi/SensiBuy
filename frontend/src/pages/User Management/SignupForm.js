import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SignUpImage from '../../images/signup.png'

const SignupForm = () => {

    const navigate = useNavigate('');

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userEmail: '',
        password: '',
        imageUrl: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/api/users', formData); // Send POST request

            if (response.status === 201) {
                // Successful signup
                const data = response.data;
                console.log('User registered:', data);
                navigate('/login')
            } else {
                // Signup failed
                console.error('Signup failed');
            }
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    return (
        <div className="flex min-h-screen justify-center mt-[50px] h-[500px]">
        <div className="flex shadow-none md:shadow-[0_0_10px_rgba(0,0,0,0.5)] h-[400px] md:h-[500px]">
          <div className="bg-blue-700 w-[300px] h-[600px] hidden md:block relative p-[15px]">
                    <img
                        src={SignUpImage}
                        alt="Signup Image"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
            <div className="w-[400px] h-[500px] mt-[50px] flex items-center justify-center">
            <div className="justify-center items-center w-full px-[50px]">
              <div className="justify-center text-center text-blue-700 font-bold text-2xl mb-[20px]">
                <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                            First Name:
                        </label>
                        <input
                            className="w-full p-2 border rounded"
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                            Last Name:
                        </label>
                        <input
                            className="w-full p-2 border rounded text-s"
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userEmail">
                            Email:
                        </label>
                        <input
                            className="w-full p-2 border rounded"
                            type="email"
                            id="userEmail"
                            name="userEmail"
                            value={formData.userEmail}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password:
                        </label>
                        <input
                            className="w-full p-2 border rounded"
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                            Image:
                        </label>
                        <input
                            className="w-full p-2 border rounded"
                            type="text"
                            id="imageUrl"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}

                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </div>
        </div>

    );
};

export default SignupForm;
