import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProfileImage from '../../images/profileImage.png'

const Profile2 = () => {
    const navigate = useNavigate('');

    const [user, setUser] = useState(null);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const userID = localStorage.getItem('userID')

    const selectedLanguage = localStorage.getItem("selectedLanguage") || "English";

    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState('');

    useEffect(() => {
        // Fetch user profile data from the server
        axios.get(`http://localhost:4000/api/users/${userID}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log(response)
                    const userData = response.data;
                    setFirstName(response.data.firstName);
                    setLastName(response.data.lastName);
                    setUserEmail(response.data.userEmail);
                    //setImageUrl(response.data.imageUrl)

                } else {
                    console.error('Failed to fetch user profile:', response.data.error);
                }
            })
            .catch((error) => {
                console.error('Error fetching user profile:', error);
            });
    }, []);

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({
    //         ...formData,
    //         [name]: value,
    //     });
    // };

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
        if (!validateName(firstName)) {
            if (selectedLanguage === 'Sinhala') {
                setEmailError('මුල් නමේ අකුරු පමණක් අඩංගු විය යුතුය');
            } else {
                setEmailError('First name should contain only letters');
            }
            return;
        }

        // Validate last name
        if (!validateName(lastName)) {
            if (selectedLanguage === 'Sinhala') {
                setEmailError('අවසාන නමේ අකුරු පමණක් අඩංගු විය යුතුය');
            } else {
                setEmailError('Last name should contain only letters');
            }
            return;
        }

        // Validate email
        if (!validateEmail(userEmail)) {
            if (selectedLanguage === 'Sinhala') {
                setEmailError('වලංගු නොවන ඊමේල් ආකෘතිය');
            } else {
                setEmailError('Invalid email format');
            }
            return;
        }

        const updateDetails = {
            firstName: firstName,
            lastName: lastName,
            userEmail: userEmail,
        }

        await axios.put(`http://localhost:4000/api/users/${userID}`, updateDetails).then(() => {
            console.log('Update Successful:', updateDetails);
           // selectedLanguage === "Sinhala" ? speakSinhala('ගිණුම සාර්ථකව යාවත්කාලීන කරන ලදී') : speakLabel('Profile updated successfully');
            alert('Profile updated successfully')
            if (selectedLanguage === 'Sinhala') {
                speakSinhala('ගිණුම සාර්ථකව යාවත්කාලීන කරන ලදී');
            } else {
                speakLabel('Profile updated successfully');
            }
            window.location.reload();

        }).catch((err) => {
            console.log('Update failed:', err.message);
            alert('Update Failed ' + err.message);
        })

    }


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
                    navigate('/')

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

    const speakSinhala = (sinhalaLabel) => {
        const utterance = new SpeechSynthesisUtterance(sinhalaLabel);
        utterance.lang = "si-LK"
        window.speechSynthesis.speak(utterance);
    }

    const stopSpeaking = () => {
        window.speechSynthesis.cancel();
      }; 

    return (

        <div>
            <div className="justify-center flex w-full">
                <div className="w-[800px] px-[50px] md:shadow-[0_0_10px_rgba(0,0,0,0.5)] my-[70px]">
                    <br />
                    <h1 className="text-2xl font-semibold mb-4 text-center">Your Profile</h1>
                    <div className="mb-4 w-full justify-center flex">
                        <img src={ProfileImage} className='w-[150px] h-[150px] rounded-full ' />
                    </div>
                    <div className='flex gap-[50px] w-full'>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2"
                                onMouseEnter={() => selectedLanguage === "Sinhala" ? speakSinhala('ඔබගේ පරිශීලක හැඳුනුම්පත, ' + userID) : speakLabel('Your User ID is ' + userID)}>
                                User ID:
                            </label>
                            <input
                                className="w-[330px] border rounded py-2 px-3"
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={userID}
                                disabled='true'
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2"
                                onMouseEnter={() => selectedLanguage === "Sinhala" ? speakSinhala('ඔබගේ ඊමේල්, ' + userEmail) : speakLabel('Your email is ' + userEmail)}
                                onMouseLeave={stopSpeaking}>
                                Email:
                            </label>
                            <input
                                className="w-[330px] border rounded py-2 px-3"
                                type="email"
                                id="email"
                                name="email"
                                value={userEmail}
                                onChange={(e) => { setUserEmail(e.target.value) }}
                            />
                            {validateEmail(userEmail) ? (
                                // Valid input
                                null
                            ) : (
                                // Display an error message
                                <p className="text-red-500 font-bold text-sm"  onMouseEnter={() => selectedLanguage === "Sinhala" ? speakSinhala('වලංගු නොවන ඊමේල් ආකෘතිය') : speakLabel('Invalid email format')}
                                onMouseLeave={stopSpeaking}>
                                    {selectedLanguage === 'Sinhala'
                                        ? 'වලංගු නොවන ඊමේල් ආකෘතිය'
                                        : 'Invalid email format'}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className='flex gap-[50px] w-full'>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2"
                                onMouseEnter={() => selectedLanguage === "Sinhala" ? speakSinhala('ඔබේ මුල් නම, ' + firstName) : speakLabel('Your first name is ' + firstName)}
                                onMouseLeave={stopSpeaking}>
                                First Name:
                            </label>
                            <input
                                className="w-[330px] border rounded py-2 px-3"
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={firstName}
                                onChange={(e) => { setFirstName(e.target.value) }}
                                // onMouseEnter={() => speakLabel()}
                            />
                            {validateName(firstName) ? (
                                // Valid input
                                null
                            ) : (
                                // Display an error message
                                <p className="text-red-500 font-bold text-sm" onMouseEnter={() => selectedLanguage === "Sinhala" ? speakSinhala('මුල් නමේ අකුරු පමණක් අඩංගු විය යුතුය') : speakLabel('First name should contain only letters')}
                                onMouseLeave={stopSpeaking}>
                                    {selectedLanguage === 'Sinhala'
                                        ? 'මුල් නමේ අකුරු පමණක් අඩංගු විය යුතුය'
                                        : 'First name should contain only letters'}
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2"
                                onMouseEnter={() => selectedLanguage === "Sinhala" ? speakSinhala('ඔබේ අවසාන නම, ' + lastName) : speakLabel('Your last name is ' + lastName)}
                                onMouseLeave={stopSpeaking}>
                                Last Name:
                            </label>
                            <input
                                className="w-[330px] border rounded py-2 px-3"
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={lastName}
                                onChange={(e) => { setLastName(e.target.value) }}
                            />
                            {validateName(lastName) ? (
                                // Valid input
                                null
                            ) : (
                                // Display an error message
                                <p className="text-red-500 font-bold text-sm" onMouseEnter={() => selectedLanguage === "Sinhala" ? speakSinhala('අවසාන නමේ අකුරු පමණක් අඩංගු විය යුතුය') : speakLabel('Last name should contain only letters')}
                                onMouseLeave={stopSpeaking}>
                                    {selectedLanguage === 'Sinhala'
                                        ? 'අවසාන නමේ අකුරු පමණක් අඩංගු විය යුතුය'
                                        : 'Last name should contain only letters'}
                                </p>
                            )}
                        </div>
                    </div>
                    <br />
                    <div className="flex gap-8 ml-[400px] justify-center items-center mb-4">
                        <button
                            className="bg-blue-900 text-white px-2 py-2 rounded hover:bg-blue-600 w-56"
                            onClick={handleSubmit}
                            onMouseEnter={() => selectedLanguage === "Sinhala" ? speakSinhala('ඔබගේ ගිණුම සංස්කරණය කිරීමට මෙතන click කරන්න') : speakLabel('Click here to update your profile')}
                            onMouseLeave={stopSpeaking}>
                            Update Profile
                        </button>
                        <button
                            className="bg-red-500 text-white px-2 py-2 rounded hover:bg-red-600 w-56"
                            onClick={handleDeleteProfile}
                            onMouseEnter={() => selectedLanguage === "Sinhala" ? speakSinhala('ඔබගේ ගිණුම ඉවත් කිරීමට මෙතන click කරන්න') : speakLabel('Click here to delete your profile')}
                            onMouseLeave={stopSpeaking} >
                            Delete Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile2;
