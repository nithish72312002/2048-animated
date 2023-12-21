export const abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "button",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "ethereumTransactionHash",
				"type": "bytes32"
			}
		],
		"name": "ButtonPressTransaction",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "getButtonPressRecords",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lastButtonPressed",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "button",
				"type": "string"
			}
		],
		"name": "recordButtonPress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];