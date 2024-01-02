import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'
import { ThirdwebProvider, localWallet } from "@thirdweb-dev/react";


import './main.scss';
import './styles.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThirdwebProvider
      clientId="c609a6f3e01bda96930a5cf48166d120"
      activeChain={{
        // === Required information for connecting to the network === \\
        chainId: 6833895, // Chain ID of the network
        // Array of RPC URLs to use
        rpc: ["https://evmrpc.jupiternft.xyz/"],

        // === Information for adding the network to your wallet (how it will appear for first time users) === \\
        // Information about the chain's native currency (i.e. the currency that is used to pay for gas)
        icon: {
          url: "ipfs://QmbqDBiBLuGYnBGfvBtmuq9F5boNTsXfppJ1fuP5jUqXWt/favicon%20(1).png",
          height: 512,
          width: 512,
          format: "png",
       },
        nativeCurrency: {
          decimals: 18,
          name: "GAS",
          symbol: "GAS",
        },
        shortName: "Jupiter", // Display value shown in the wallet UI
        slug: "Jupiter", // Display value shown in the wallet UI
        testnet: true, // Boolean indicating whether the chain is a testnet or mainnet
        chain: "Jupiter", // Name of the network
        name: "Jupiter", // Name of the network
        explorers: [
          {
            'name': 'jupiterRollappExplorer',
            'url': 'https://explorer.jupiternft.xyz/',
            'standard': 'none',
          },
        ],
      }}
      supportedWallets={[
        localWallet(),
      ]}
	  >
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ThirdwebProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
