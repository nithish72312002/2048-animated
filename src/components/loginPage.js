// LoginPage.js
import React, { useEffect, useState } from 'react';
import { ConnectWallet, useAddress } from '@thirdweb-dev/react';
import { useBalance } from "@thirdweb-dev/react";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import SendTokenButton from './SendTokenButton';

export default function LoginPage() {
    const address = useAddress();
    const balanceQuery = useBalance(NATIVE_TOKEN_ADDRESS);
    const [balance, setBalance] = useState(0);
    const [isWalletConnected, setIsWalletConnected] = useState(false);

    useEffect(() => {
        if (address) {
            setIsWalletConnected(true);
        } else {
            setIsWalletConnected(false);
        }
    }, [address]);

    useEffect(() => {
        const fetchBalance = async () => {
            if (typeof balanceQuery.data?.displayValue === "undefined") {
                setBalance(0);
            } else {
                const tokenBalance = await balanceQuery.data.displayValue;
                setBalance(parseInt(tokenBalance));
            }
        };

        if (isWalletConnected) {
            fetchBalance();
        }
    }, [isWalletConnected, balanceQuery]);

    return (
        <div className="login-page">
            {!isWalletConnected && (
                <h1>Welcome to 2048 Game</h1>
            )}

            {!isWalletConnected ? (
                <ConnectWallet 
                    dropdownPosition={{
                        side: "right",
                        align: "center",
                    }}
                />
            ) : balance <= 0 ? (<>
                <h2>Please fund your wallet in order to play the game.</h2><SendTokenButton/></>
            ) : (
                <p>Your wallet balance: {balance}</p>
            )}
        </div>
    );  
}
