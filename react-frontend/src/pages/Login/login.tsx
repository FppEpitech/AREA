import React, { useState } from 'react';
import { AuthLogin } from '../../services/auth/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const sendLogin = async(e: React.FormEvent) => {
        e.preventDefault();

        await AuthLogin({email, password}, navigate, setError);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-customLightBlue">
            <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-2xl overflow-hidden w-[1536px] h-[768px]">
                {/* Left Section with Image */}
                <div className="md:w-1/3">
                    <img
                        src="https://www.shutterstock.com/image-photo/beauty-nature-amazing-waterfall-tropical-600nw-2479929633.jpg"
                        alt="Waterfall"
                        className="h-full w-full object-cover"
                    />
                </div>

                {/* Right Section with Form */}
                <div className="md:w-2/3 p-8 pl-16 pt-20 bg-customGreen text-white flex flex-col">
                    {/* Logo */}
                    <div className="flex items-center justify-left mb-6 pt-10">
                        <img
                            src="https://static-00.iconduck.com/assets.00/react-icon-512x456-5xl7nmtw.png"
                            alt="Plumpy Logo"
                            className="w-38 h-32 mr-3 pl-4"
                        />
                        <h1 className="text-5xl font-bold">Plumpy</h1>
                    </div>

                    {/* Form */}
                    <h2 className="text-2xl font-semibold mb-4">Sign in to your account</h2>
                    <form className="space-y-4">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="w-3/5 px-4 py-2 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-customOrange text-customDarkGreen"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-3/5 px-4 py-2 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-customOrange text-customDarkGreen"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <p className='text-customYellow'>{error}</p>}
                        <button
                            type="submit"
                            className="w-3/5 bg-customYellow py-2 rounded-lg font-semibold hover:bg-customOrange transition text-customDarkGreen"
                            onSubmit={sendLogin}
                        >
                            Login
                        </button>
                    </form>

                    {/* Forgot Password */}
                    <a
                        href="/"
                        className="text-sm text-customOrange mt-2 text-left"
                    >
                        Forgot password?
                    </a>

                    {/* Register */}
                    <p className="text-sm mt-4">
                        Don't have an account?{" "}
                        <a
                            href="/signup"
                            className="text-customYellow hover:underline"
                        >
                            Register here
                        </a>
                    </p>

                    {/* Oauth2 Login */}
                    <div className="mt-6">
                        <p className="text-sm text-center mb-4">or continue with</p>
                        <div className="flex space-x-4 justify-center">
                            <button
                                className="flex items-center bg-customDarkGray text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition">
                                <i className="fab fa-github mr-2"></i> Github
                            </button>
                            <button
                                className="flex items-center bg-white text-customGreen py-2 px-4 rounded-lg shadow hover:bg-gray-100 transition">
                                <i className="fab fa-google mr-2"></i> Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
