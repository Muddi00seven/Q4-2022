export const CONTRACT_ADDRESS = "0x601a43Fc59674Cd66BbB51B73ACF123c8f8D597f";

export const CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "petId",
        type: "uint256",
      },
    ],
    name: "adopt",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "adopters",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAdopters",
    outputs: [
      {
        internalType: "address[16]",
        name: "",
        type: "address[16]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
