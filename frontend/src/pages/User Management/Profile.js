import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProfileImage from '../../images/profile.png'

const Profile = () => {
    const navigate = useNavigate('');


    const [user, setUser] = useState(null);

    const [formData, setFormData] = useState({
        userID: '',
        firstName: '',
        lastName: '',
        userEmail: '',
        // Add other user data fields here
    });

    const userID = localStorage.getItem('userID')

    useEffect(() => {
        // Fetch user profile data from the server
        axios.get(`http://localhost:4000/api/users/${userID}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    const userData = response.data;
                    setFormData({
                        userID: userID,
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        userEmail: userData.userEmail,
                        // Populate other user data fields here
                    });
                } else {
                    console.error('Failed to fetch user profile:', response.data.error);
                }
            })
            .catch((error) => {
                console.error('Error fetching user profile:', error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleUpdateProfile = async () => {
        try {
            // Send a PUT request to the server with the updated profile data
            const response = await axios.put(
                `http://localhost:4000/api/users/${userID}`,
                formData, // Send the updated profile data
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the user's token for authentication
                    },
                }
            );

            if (response.status === 200) {
                // Profile updated successfully
                console.log('Profile updated:', response.data);
                alert('Profile Updated Successfully!')
                navigate('/UserInterface')

            } else {
                // Handle the case where the update failed
                console.error('Profile update failed:', response.data.error);
                // You can show an error message to the user
            }
        } catch (error) {
            console.error('Error updating profile:', error.message);
            // You can show an error message to the user
        }
    };

    const handleDeleteProfile = async () => {

        const confirmDelete = window.confirm('Are you sure you want to delete your profile?');

        if (confirmDelete) {
            try {
                // Send a DELETE request to the server to delete the user's profile
                const response = await axios.delete(`http://localhost:4000/api/users/${userID}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the user's token for authentication
                    },
                });

                if (response.status === 200) {
                    // Profile deleted successfully
                    console.log('Profile deleted:', response.data);
                    alert('Profile Deleted Successfully!');

                } else {
                    // Handle the case where the deletion failed
                    console.error('Profile deletion failed:', response.data.error);
                    // You can show an error message to the user
                }
            } catch (error) {
                console.error('Error deleting profile:', error.message);
                // You can show an error message to the user
            }
        } else {
            navigate('/UserInterface')
        }

    };

    const speakLabel = (labelText) => {
        const utterance = new SpeechSynthesisUtterance(labelText);
        window.speechSynthesis.speak(utterance);
      };

    return (
        <div className="flex min-h-screen justify-center mt-[100px] h-[400px]">
            <div className="flex shadow-none md:shadow-[0_0_10px_rgba(0,0,0,0.5)] h-[300px] md:h-[350px] border-2">
                <div className="bg-blue-900 w-[300px] h-[500px] hidden md:block relative p-[15px]">
                    <img
                        src={ProfileImage}
                        alt="Signup Image"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
            <div>
            <div className="flex shadow-none md:shadow-[0_0_10px_rgba(0,0,0,0.5)] w-[400px] md:h-[500px] border-2">
          <div className="w-full px-[50px] h-[400px] ">
            <br/>
                <h1 className="text-2xl font-semibold mb-4 text-center">Your Profile</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName"
                     onMouseEnter={() => speakLabel('Your User ID is ' + formData.userID)}>
                        User ID:
                    </label>
                    <input
                        className="w-full border rounded py-2 px-3"
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.userID}
                        onChange={handleChange}
                        disabled='true'
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName"
                    onMouseEnter={() => speakLabel('Your first name is ' + formData.firstName)}>
                        First Name:
                    </label>
                    <input
                        className="w-full border rounded py-2 px-3"
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        onMouseEnter={() => speakLabel()}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName"
                    onMouseEnter={() => speakLabel('Your last name is ' + formData.lastName)}>
                        Last Name:
                    </label>
                    <input
                        className="w-full border rounded py-2 px-3"
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email"
                    onMouseEnter={() => speakLabel('Your email is ' + formData.userEmail)}>
                        Email:
                    </label>
                    <input
                        className="w-full border rounded py-2 px-3"
                        type="email"
                        id="email"
                        name="email"
                        value={formData.userEmail}
                        onChange={handleChange}
                    />
                </div>
                <br/>
                <div className="flex gap-4">
                    <button
                        className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={handleUpdateProfile}
                        onMouseEnter={() => speakLabel('Click here to update your profile')}
                    >
                        Update Profile
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        onClick={handleDeleteProfile}
                        onMouseEnter={() => speakLabel('Click here to delete your profile')}
                    >
                        Delete Profile
                    </button>
                </div>
            </div>
        </div>
        </div>
        </div>
    );
};

export default Profile;
