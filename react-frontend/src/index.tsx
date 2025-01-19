import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App/App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDkao3nTKOWFQZPRc7S69BT2UQKTeD-vqI",
    authDomain: "plumpy-f4ec9.firebaseapp.com",
    projectId: "plumpy-f4ec9",
    storageBucket: "plumpy-f4ec9.firebasestorage.app",
    messagingSenderId: "918802512532",
    appId: "1:918802512532:web:b2cd5ba9f7ab736d449281",
    measurementId: "G-J2W8XSSDES"
};

initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
