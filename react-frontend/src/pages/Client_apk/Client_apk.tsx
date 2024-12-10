import React from 'react';

export default function Client_apk() {
    const handleDownload = () => {
        window.location.href = "http://localhost:8080/client.apk";
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20%' }}>
            <h1>Download Mobile Client</h1>
            <button onClick={handleDownload} style={{ padding: '10px 20px', fontSize: '16px' }}>
                Download APK
            </button>
        </div>
    );
}