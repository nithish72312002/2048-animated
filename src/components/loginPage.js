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
      
    useEffect(() => {
        const fetchBalance = async () => {
            if (typeof balanceQuery.data?.displayValue === "undefined") {
              setBalance(0);
            } else {
              const tokenBalance = await balanceQuery.data.displayValue;
              setBalance(parseInt(tokenBalance));
            }
          };
          fetchBalance();
    }, [address, balanceQuery]);
      
        console.log(balance);

    return (
        <div className="login-page">
            <h1>Welcome to 2048 Game</h1>
            <ConnectWallet 
            dropdownPosition={{
                side: "right", //  "top" | "bottom" | "left" | "right";
                align: "center", // "start" | "center" | "end";
            }}/>
                  <SendTokenButton />

        </div>
    );  
};
