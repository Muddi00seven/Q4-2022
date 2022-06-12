import React, {useState} from "react";
import { useWeb3Transfer } from "react-moralis";

function TransferEth({ Moralis }) {
  const [userAddress, setUserAddress ] = useState("0")
  const [userAmount, setUserAmount ] = useState("0")

    const { fetch, error, isFetching } = useWeb3Transfer({
    type: "native",
    amount: Moralis.Units.ETH(userAmount),
    receiver: userAddress,
  });
  console.log("error", error)
  return (
    <div>
        <input
        placeholder="user address"
        value={userAddress}
        onChange={(e) => setUserAddress(e.target.value)}/>
         <input
        placeholder="user amount"
        value={userAmount}
        onChange={(e) => setUserAmount(e.target.value)}/>

      <button onClick={() => fetch()} disabled={isFetching}>
        Transfer Eth
      </button>
    </div>
  );
}

export default TransferEth;
