// SendTokenButton.js

import { useAddress } from '@thirdweb-dev/react';
import React from 'react';
// Assuming you have imported your useAddress hook

const SendTokenButton = () => {
    // Get the address using your custom hook
    const address = useAddress();

    const handleSendToken = () => {
        // Data to be sent
        const data = {
            address: address, // Use the dynamically fetched address
            chain: "C"
        };

        // Replace '0.0.0.0' with the IP address of your server machine
        const serverUrl = process.env.REACT_APP_SERVER_URL;

        fetch(serverUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json()) // assuming the server responds with JSON
        .then(data => {
            console.log('Success:', data);
            // Handle success if needed
        })
        .catch((error) => {
            console.error('Error:', error);
            // Handle error if needed
        });
    };

    return (
        <button style={{width:"200px", height: "40px" ,borderRadius: "20px", cursor: "pointer"}} onClick={handleSendToken}>Faucet</button>
    );
};

export default SendTokenButton;
