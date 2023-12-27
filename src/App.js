// App.js
import React from 'react';
import BoardView from "./components/Board";
import LoginPage from "./components/loginPage";
import { useAddress } from '@thirdweb-dev/react'; // Assuming useAddress is the correct hook
import { useBalanceForAddress } from "@thirdweb-dev/react";

function App() {
  const address = useAddress();

  return (
    <>
      {address ? (
        <BoardView />
      ) : (
        <LoginPage />
      )}
    </>
  );
}

export default App;
