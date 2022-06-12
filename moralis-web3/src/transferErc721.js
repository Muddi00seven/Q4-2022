import React, { useState } from "react";
import { useWeb3Transfer } from "react-moralis";

function TransferErc721() {
  const [userAddress, setUserAddress] = useState("0");
  const [contractAddress, setContractAddress] = useState("0");

  const [tokenId, setTokenId] = useState("0");

  const { fetch, error, isFetching } = useWeb3Transfer({
    type: "erc721",
    receiver: userAddress,
    contractAddress: contractAddress,
    tokenId: tokenId,
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
        placeholder="token id"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />

      <input
        placeholder="contract ddress"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
      />
      <button onClick={() => fetch()} disabled={isFetching}>
        Transfer ERC721
      </button>
    </div>
  );
}

export default TransferErc721;
