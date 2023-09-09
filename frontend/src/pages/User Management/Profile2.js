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
    const [imageUrl, setImageUrl] = useState("");
    const [newImageUrl, setNewImageUrl] = useState("");

    const userID = localStorage.getItem('userID')

    const [loading, setLoading] = useState(false);

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
                setNewImageUrl(res.data);

                //res.data
                alert("Image uploaded Succesfully");
                
            })
            .then(() => setLoading(false))
            .catch((error) => {
                console.log(error.message);
            })
    };


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
                    setImageUrl(response.data.imageUrl)

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


    const handleSubmit = async (e) => {

        e.preventDefault();

        const updateDetails = {
            firstName: firstName,
            lastName: lastName,
            userEmail: userEmail,
            imageUrl: newImageUrl || imageUrl
        }

        await axios.put(`http://localhost:4000/api/users/${userID}`, updateDetails).then(() => {
            alert('Profile updated successfully')
            window.location.reload();

        }).catch((err) => {
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
                    navigate('/LandingPage')

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

        <div>
            <div className="justify-center flex w-full">
                <div className="w-[800px] px-[50px] md:shadow-[0_0_10px_rgba(0,0,0,0.5)] my-[70px]">
                    <br />
                    <h1 className="text-2xl font-semibold mb-4 text-center">Your Profile</h1>
                    <div className="mb-4 w-full justify-center flex">
                        <img src={imageUrl || ProfileImage } className='w-[150px] h-[150px] rounded-full ' />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2"
                            onMouseEnter={() => speakLabel('Your User ID is ' + userID)}>
                            User ID:
                        </label>
                        <input
                            className="w-full border rounded py-2 px-3"
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={userID}
                            disabled='true'
                        />
                    </div>
                    <div className='flex gap-[50px] w-full'>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2"
                            onMouseEnter={() => speakLabel('Your first name is ' + firstName)}>
                            First Name:
                        </label>
                        <input
                            className="w-[330px] border rounded py-2 px-3"
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => { setFirstName(e.target.value) }}
                            onMouseEnter={() => speakLabel()}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2"
                            onMouseEnter={() => speakLabel('Your last name is ' + lastName)}>
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
                    </div>
                    </div>
                    <div className='flex gap-[50px] w-full'>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2"
                            onMouseEnter={() => speakLabel('Your email is ' + userEmail)}>
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
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Image:
                        </label>
                        <input
                            className="w-[330px] border rounded py-2 px-3"
                            type="file"
                            id="image"
                            name="image"
                            onChange={(e) => { uploadImage(e) }}
                        />
                    </div>
                    </div>
                    <br />
                    <div className="flex gap-8 ml-[400px] justify-center items-center mb-4">
                        <button
                            className="bg-blue-900 text-white px-2 py-2 rounded hover:bg-blue-600 w-56"
                            onClick={handleSubmit}
                            onMouseEnter={() => speakLabel('Click here to update your profile')}
                        >
                            Update Profile
                        </button>
                        <button
                            className="bg-red-500 text-white px-2 py-2 rounded hover:bg-red-600 w-56"
                            onClick={handleDeleteProfile}
                            onMouseEnter={() => speakLabel('Click here to delete your profile')}
                        >
                            Delete Profile
                        </button>
                        {newImageUrl}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile2;
