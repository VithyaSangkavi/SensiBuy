import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [pdfGenerating, setPdfGenerating] = useState(false);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        // Fetch all users from the server
        axios.get('http://localhost:4000/api/users', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    // Filter users by userType "User" in the frontend
                    const filteredUsers = response.data.filter((user) => user.userType === 'User');
                    setUsers(filteredUsers);
                } else {
                    console.error('Failed to fetch users:', response.data.error);
                }
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const printPdf = () => {
        setPdfGenerating(true);

        // Get the HTML element to print (in this case, the entire component)
        const element = document.getElementById('user-report');

        // Show the print dialog
        window.print();

        // After the print dialog closes, reset the state
        setTimeout(() => {
            setPdfGenerating(false);
        }, 500); // Adjust the timeout as needed
    };

    
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    // Define 'filteredUsers' within the component
    const filteredUsers = users.filter((user) =>
        user.firstName.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4 text-center">USER REPORT</h1>
            <div className="flex justify-between mb-4">
                <div>
                    <label className="text-gray-800 font-bold">Filter users by first name: </label>
                    <input
                        type="text"
                        className="border-2 rounded px-2 py-1"
                        value={filter}
                        onChange={handleFilterChange}
                    />
                </div>
            </div>
            <div className="bg-white shadow-md rounded-md overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="border px-4 py-2">User ID</th>
                            <th className="border px-4 py-2">First Name</th>
                            <th className="border px-4 py-2">Last Name</th>
                            <th className="border px-4 py-2">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={user._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-200'}>
                                <td className="border px-4 py-2">{user._id}</td>
                                <td className="border px-4 py-2">{user.firstName}</td>
                                <td className="border px-4 py-2">{user.lastName}</td>
                                <td className="border px-4 py-2">{user.userEmail}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-end mt-4">
                {!pdfGenerating ? (
                    <button
                        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-green-600 w-32"
                        onClick={printPdf}
                    >
                        Print
                    </button>
                ) : (
                    <p>Preparing for printing...</p>
                )}
            </div>

        </div>
    );
};

export default AllUsers;
