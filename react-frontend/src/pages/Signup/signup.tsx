import logo from '../../assets/plumpy_logo.png'
import waterfall from '../../assets/waterfall.png'
import { useState } from "react";
import { AuthSignUp } from '../../services/auth/auth'
import { useNavigate } from "react-router-dom";

export default function Signup() {

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const sendSignUp = async(e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        await AuthSignUp({email, password}, navigate, setError);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-customLightBlue">
            <div className="flex flex-col md:flex-row bg-white shadow-custom rounded-2xl overflow-hidden w-[1536px] h-[768px]">
                {/* Left Section with Image */}
                <div className="md:w-1/3">
                    <img
                        src={waterfall}
                        alt="Waterfall"
                        className="h-full w-full object-cover"
                    />
                </div>

                {/* Right Section with Form */}
                <div className="md:w-2/3 p-8 pl-16 pt-20 bg-customGreen text-white flex flex-col">
                    {/* Logo and Title */}
                    <div className="flex items-center justify-start mb-6 pt-10">
                        <img
                            src={logo}
                            alt="Plumpy Logo"
                            className="w-38 h-32 mr-3 pl-4"
                        />
                        <h1 className="text-5xl font-abrilFatface text-shadow-custom">Plumpy</h1>
                    </div>

                    <h2 className="text-3xl font-instrumentSans text-shadow-custom mb-4">Create your account</h2>

                    {/* Content Wrapper */}
                    <div className="flex flex-wrap md:flex-nowrap justify-between items-start">
                        {/* Form */}
                        <div className="md:w-5/6">
                            <form className="space-y-4">
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    className="w-full shadow-custom font-instrumentSans h-12 px-4 py-2 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-customOrange text-customDarkGreen"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required>
                                </input>
                                <input
                                    type="password"
                                    placeholder="Create Password"
                                    className="w-full shadow-custom font-instrumentSans h-12 px-4 py-2 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-customOrange text-customDarkGreen"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required>
                                </input>
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    className="w-full shadow-custom font-instrumentSans h-12 px-4 py-2 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-customOrange text-customDarkGreen"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required>
                                </input>
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                                <button
                                    type="submit"
                                    className="w-full text-2xl shadow-custom font-abrilFatface h-12 bg-customYellow py-2 rounded-lg font-semibold hover:bg-customOrange transition text-customDarkGreen"
                                    onSubmit={sendSignUp}>
                                    Sign up
                                </button>
                            </form>

                            {/* Register */}
                            <p className="text-sm text-shadow-custom font-instrumentSans mt-4">
                                Already have an account?{" "}
                                <a
                                    href="/login"
                                    className="text-customYellow font-instrumentSans hover:underline"
                                >
                                    Login
                                </a>
                            </p>
                        </div>

                        {/* Separator */}
                        <div className="block w-1 bg-customDarkGreen h-full mx-10"></div>

                        {/* Oauth2 Login */}
                        <div className="md:w-1/6 mt-6 md:mt-0">
                            <p className="text-sl mb-4 text-customYellow text-shadow-custom font-instrumentSans text-center">
                                or<br/>continue with
                            </p>
                            <div className="flex flex-col space-y-4">
                                <button
                                    className="flex shadow-custom items-center font-instrumentSans bg-customGreen text-customDarkGreen py-2 px-4 rounded-xl hover:bg-customYellow transition border-2 border-customDarkGreen">
                                    <i className="fab fa-github mr-6"></i> Github
                                </button>
                                <button
                                    className="flex shadow-custom items-center font-instrumentSans bg-customGreen text-customDarkGreen py-2 px-4 rounded-xl shadow hover:bg-customYellow transition border-2 border-customDarkGreen">
                                    <i className="fab fa-google mr-6"></i> Google
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

