// SendTokenButton.js

import { useAddress } from '@thirdweb-dev/react';
import React, { useState } from 'react';

const SendTokenButton = () => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const address = useAddress();

    const handleSendToken = () => {
        setIsButtonDisabled(true); // Disable the button on click

        const data = {
            address: address,
            chain: "C"
        };

        const serverUrl = process.env.REACT_APP_SERVER_URL;

        fetch(serverUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Handle success if needed
        })
        .catch((error) => {
            console.error('Error:', error);
            // Handle error if needed
        })
        .finally(() => {
            setIsButtonDisabled(false); // Enable the button after the fetch is complete
            window.location.reload(); // Refresh the page
        });
    };

    return (
        <button
            className='sendtokenbutton'
            onClick={handleSendToken}
            disabled={isButtonDisabled} // Disable the button based on state
        >
            Faucet
        </button>
    );
};

export default SendTokenButton;
