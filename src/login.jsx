import React from 'react';
import Logo from './assets/logo2.svg';
import { useNavigate } from 'react-router-dom';
import { TbUserScan } from "react-icons/tb";
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const handleFaceLogin = () => {
    navigate('/scan');
  };

  return (
    <div className="fixed inset-0 bg-gray-100 flex items-center justify-center z-50 font-poppins">
      <div className="bg-white p-10 rounded-lg shadow-xl flex max-w-4xl w-full">
        {/* Logo Section */}
        <div className="w-1/3 flex items-center justify-center">
          <img src={Logo} alt="Logo" className="max-h-48" />
        </div>
        
        {/* Login Section */}
        <div className="w-2/3 text-center p-10">
          <h2 className="text-4xl font-bold mb-8 text-gray-800">Welcome!</h2>
          <p className="text-gray-600 mb-8">Please choose how you would like to proceed</p>

          <div className="flex flex-col space-y-6">
            <button 
              onClick={() => navigate('/register')}
              className="w-full bg-teal-600 text-white py-4 rounded-full hover:bg-teal-700 transition duration-300 ease-in-out"
            >
              Register New Account
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or Login with</span>
              </div>
            </div>

            <button 
              onClick={handleFaceLogin}
              className="w-full bg-[#013D43] text-white py-4 rounded-full hover:bg-[#05545B] transition duration-300 ease-in-out flex items-center justify-center"
            >
              <TbUserScan className="mr-3 text-2xl" />
              Face Recognition Login
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
