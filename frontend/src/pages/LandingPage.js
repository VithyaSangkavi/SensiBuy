import React from 'react';
import picture from '../images/picture1.jpg'
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {

    return (
        <div className="relative h-screen">
            <img src={picture} alt="Background" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h1 className="text-5xl font-bold mb-2">Welcome to SensiBuy</h1>
                <h2 className="text-5xl font-semibold mb-2 text-red">Enhancing Shopping Experience to Visually Challenged</h2>
                <button className='border text-xl font-semibold px-12 py-2 '>LOGIN</button>
            </div>
        </div>
    );
}

export default LandingPage;
