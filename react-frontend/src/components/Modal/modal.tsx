import React, { useState } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (password: string) => void; // Pass password as a parameter
    title: string;
    message: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
    const [password, setPassword] = useState(""); // Store the password entered by the user

    if (!isOpen) return null; // Don't render modal if it's not open

    const handleConfirm = () => {
        if (password) {
            onConfirm(password); // Pass the password to onConfirm
        } else {
            alert("Please enter your password.");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
            <div className="bg-white dark:bg-customDarkGreen rounded-lg shadow-lg p-6 max-w-sm w-full">
                <h2 className="text-xl font-bold text-center mb-4">{title}</h2>
                <p className="text-center mb-6">{message}</p>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Enter Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md dark:bg-customDarkGreen dark:border-customLightGreen dark:text-white"
                        placeholder="Your password"
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        onClick={onClose}
                        className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
