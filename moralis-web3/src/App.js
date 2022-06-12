import React, { useEffect, useState } from "react";
import "./App.css";
import { useMoralis } from "react-moralis";
import TransferEth from "./transferEth";
import TransferErc20 from "./transferErc20";
import TransferErc721 from "./transferErc721";
import { UserNfts } from "./userNfts";

function App() {
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
    Moralis.enableWeb3();
  };

  const logOut = async () => {
    await logout();
  };
  console.log("Moralis", Moralis, account);
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
            <h2>Transfer Eth</h2>
            <TransferEth Moralis={Moralis} />
          </div>
          <div>
            <h2>Transfer ERC20</h2>
            <TransferErc20 Moralis={Moralis} />
          </div>
          <div>
            <h2>Transfer ERC721</h2>
            <TransferErc721 />
          </div>
          <div>
            <button onClick={() => UserNfts(Moralis, account)}>
              User Nfts
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
