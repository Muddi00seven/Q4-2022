import React, { useState } from "react";
import { useWeb3Transfer } from "react-moralis";

function TransferErc20({ Moralis }) {
  const [userAddress, setUserAddress] = useState("0");
  const [contractAddress, setContractAddress] = useState("0");

  const [userAmount, setUserAmount] = useState("0");

  const { fetch, error, isFetching } = useWeb3Transfer({
    type: "erc20",
    amount: Moralis.Units.Token(userAmount, 18),
    receiver: userAddress,
    contractAddress: contractAddress,
  });
  console.log("error", error);
  return (
    <div>
      <input
        placeholder="user address"
        value={userAddress}
        onChange={(e) => setUserAddress(e.target.value)}
      />
      <input
        placeholder="user amount"
        value={userAmount}
        onChange={(e) => setUserAmount(e.target.value)}
      />

      <input
        placeholder="contract address"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
      />
      <button onClick={() => fetch()} disabled={isFetching}>
        Transfer ERC20
      </button>
    </div>
  );
}

export default TransferErc20;
