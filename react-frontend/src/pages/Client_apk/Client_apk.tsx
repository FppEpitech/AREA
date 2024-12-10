import React, { useEffect } from 'react';
import logo from '../../assets/plumpy_logo.png'

export default function Client_apk() {
    const handleDownload = () => {
        window.location.href = "${process.env.REACT_APP_API_URL}/client.apk";
    };

    useEffect(() => {
        handleDownload();
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-customLightBlue">
            <div className="flex flex-col bg-white shadow-custom rounded-2xl w-full md:w-[800px] h-[600px] p-8">
                {/* Logo and Title Section */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-abrilFatface text-customDarkGreen text-shadow-custom mb-4">Thank you!</h1>
                    <h2 className="text-2xl font-instrumentSans text-customDarkGreen mb-2">Your download will start in a few seconds...</h2>
                    <h3 className="text-xl font-instrumentSans text-customDarkGreen mb-6">If not, click here:</h3>
                </div>

                {/* Download Button */}
                <div className="text-center">
                    <button
                        onClick={handleDownload}
                        className="w-full md:w-48 text-2xl font-abrilFatface bg-customYellow py-3 rounded-lg text-customDarkGreen hover:bg-customOrange transition duration-300"
                    >
                        Download APK
                    </button>
                </div>
            </div>
        </div>
    );
}
