// App.js
import React, { useEffect, useState } from 'react';
import BoardView from "./components/Board";
import LoginPage from "./components/loginPage";
import { NATIVE_TOKEN_ADDRESS, useAddress, useBalance } from '@thirdweb-dev/react';

function App() {
  const address = useAddress();
  const balanceQuery = useBalance(NATIVE_TOKEN_ADDRESS);
  const [balance, setBalance] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // To track if user is logged in

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
  
  // Set isLoggedIn based on balance
  useEffect(() => {
    setIsLoggedIn(balance >= 1);
  }, [balance]);

  return (
    <>
      {isLoggedIn ? (
        <BoardView />
      ) : (
        <LoginPage />
      )}
    </>
  );
}

export default App;
