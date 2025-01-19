import logo from '../../assets/plumpy_logo.png';
import googleLogo from '../../assets/login/Google.webp';
import githubLogo from '../../assets/login/Github.svg';
import React, { useState } from 'react';
import { AuthLogin } from '../../services/auth/auth';
import { useNavigate } from 'react-router-dom';
import './mockup.css';
import screenshot from '../../assets/login/website_screenshot.png';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const sendLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        await AuthLogin({ email, password }, navigate, setError);
    };

        const externalLog = async (type : string) => {
            try {
                let result;
                if (type === "github") {
                    result = await FirebaseAuthentication.signInWithGithub();
                } else if (type === "google") {
                    result = await FirebaseAuthentication.signInWithGoogle();
                }
                if (!result)
                    return;
                const idToken = await FirebaseAuthentication.getIdToken();
                if (!idToken)
                    return;
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/account/loginExternal`, {
                    idToken: idToken
                });
                if (response.data.token) {
                    localStorage.setItem('access_token', response.data.token);
                    localStorage.setItem("token_date", Date.now().toString());
                    navigate('/explore');
                }
            } catch (error) {
                console.error("Google login error:", error);
            }
        };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-customDarkBg">
            {/* Left Section */}
            <div className="bg-white dark:bg-customDarkCard relative">
                {/* Top-Left Logo */}
                <div className="absolute top-4 left-4">
                    <img src={logo} alt="Plumpy Logo" className="w-[50px] h-[50px]" onClick={() => navigate('/welcome')}/>
                </div>

                {/* Main Content */}
                <div className="flex items-center justify-center h-full">
                    <div className="w-full max-w-md p-8 rounded-md">
                        <h2 className="text-3xl font-bold font-inter text-customDarkGreen dark:text-customDarkText mb-2">
                            Welcome back!
                        </h2>
                        <h3 className="text-base font-semibold text-customDarkGreen dark:text-gray-400 mb-6">
                            Enter your credentials to access your account
                        </h3>
                        <form className="mt-12">
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-bold font-inter text-gray-700 dark:text-gray-300">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-customDarkBorder bg-white dark:bg-customDarkCard text-black dark:text-customDarkText rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-customGreen dark:focus:ring-customDarkLightGreen focus:border-customGreen dark:focus:border-customDarkLightGreen"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="password" className="block text-sm font-bold font-inter text-gray-700 dark:text-gray-300">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Enter your password"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-customDarkBorder bg-white dark:bg-customDarkCard text-black dark:text-customDarkText rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-customGreen dark:focus:ring-customDarkLightGreen focus:border-customGreen dark:focus:border-customDarkLightGreen"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            {error && <p className="text-red-500 font-bold font-inter text-sm">{error}</p>}
                            <button
                                type="submit"
                                className="mt-8 w-full py-2 bg-customLightGreen dark:bg-customDarkLightGreen text-white dark:text-black font-bold font-inter rounded-[10px] shadow-sm hover:bg-customDarkLightGreen focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-customDarkGreen focus:ring-offset-2"
                                onClick={sendLogin}
                            >
                                Login
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center mt-12">
                            <div className="flex-grow border-t border-gray-300 dark:border-customDarkBorder"></div>
                            <span className="px-4 text-gray-500 dark:text-gray-400 text-sm">Or</span>
                            <div className="flex-grow border-t border-gray-300 dark:border-customDarkBorder"></div>
                        </div>

                        {/* Social Login Buttons */}
                        <div className="flex space-x-6 mt-12">
                            <button
                                type="button"
                                className="flex items-center justify-center text-xs w-full py-2 bg-white font-semibold rounded-[10px] border hover:shadow-custom focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                onClick={() =>{
                                    externalLog("google");
                                }} >
                                <img src={googleLogo} alt="Google Logo" className="w-6 h-6 mr-2" />
                                Sign in with Google
                            </button>
                            <button
                                type="button"
                                className="flex items-center justify-center text-xs w-full py-2 bg-white font-semibold rounded-[10px] border hover:shadow-custom focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                onClick={() =>{
                                    externalLog("github");
                                }} >
                                <img src={githubLogo} alt="Github Logo" className="w-6 h-6 mr-2" />
                                Sign in with Github
                            </button>
                        </div>

                        <div>
                            <p className="text-center font-bold font-inter mt-4 text-sm text-gray-600 dark:text-gray-400">
                                Don't have an account?{' '}
                                <a href="/signup" className="text-customLightGreen dark:text-customDarkLightGreen font-semibold font-inter hover:underline">
                                    Sign Up
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="bg-customLightGreen border-l flex items-center justify-center hidden lg:flex relative overflow-hidden">
                <img
                    src={screenshot}
                    alt="Mockup"
                    className="absolute mockup"
                />
            </div>
        </div>
    );
}
