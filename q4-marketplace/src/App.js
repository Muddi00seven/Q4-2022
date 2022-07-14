import React, { useEffect, useState } from "react";
import "./App.css";
import { useMoralis } from "react-moralis";
// import TransferEth from "./transferEth";
// import TransferErc20 from "./transferErc20";
// import TransferErc721 from "./transferErc721";
import { UserNfts } from "./userNfts";
import { marketplaceAddress, marketplaceAbi } from "./contract/marketplace";
import Web3 from "web3";

function App() {
  const [marketplaceContract, setMarketplaceContract] = useState();
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    Moralis,
    user,
    account,
    logout,
  } = useMoralis();

  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({ signingMessage: "User Login" })
        .then(function (user) {
          console.log("user", user);
        })
        .catch(function (error) {
          console.log("error");
        });
    }
   await Moralis.enableWeb3();
    const web3 = new Web3(Moralis.provider);
    const contract = new web3.eth.Contract(marketplaceAbi, marketplaceAddress);
    setMarketplaceContract(contract);
  };

  const logOut = async () => {
    await logout();
  };
  return (
    <div className="App">
      Moralis Practice
      <br />
      <hr />
      <br />
      <button onClick={() => login()} disabled={account && true}>
        Moralis Login
      </button>
      <button onClick={() => logOut()} disabled={!account && true}>
        Moralis Logout
      </button>
      {account && (
        <div>
          <div>
            <UserNfts
              Moralis={Moralis}
              address={account}
              marketplaceContract={marketplaceContract}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
