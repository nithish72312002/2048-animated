// LoginPage.js
import React from 'react';
import { ConnectWallet, useAddress } from '@thirdweb-dev/react';
import { useBalance } from "@thirdweb-dev/react";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";

export default function LoginPage() {
    const address = useAddress();

    return (
        <div className="login-page">
            <h1>Welcome to 2048 Game</h1>
            <ConnectWallet />
        </div>
    );  
};
