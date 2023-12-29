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
      try {
        if (typeof balanceQuery.data?.displayValue === "undefined") {
          setBalance(0);
          setIsLoggedIn(false); // No balance means user is not logged in or has insufficient balance
        } else {
          const tokenBalance = await balanceQuery.data.displayValue;
          const parsedBalance = parseInt(tokenBalance);
          setBalance(parsedBalance);
          if (parsedBalance > 0) {
            setIsLoggedIn(true); // Set isLoggedIn to true if balance > 0
          } else {
            setIsLoggedIn(false); // If balance is 0, user remains logged out
          }
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };
    fetchBalance();
  }, [address, balanceQuery]);

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
