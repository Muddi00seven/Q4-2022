import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { loadBlockchain } from "./redux/slices/web3ConnectSlice";
import "./App.css";
import { petsData } from "./data";

function App() {
  //use states

  const dispatch = useAppDispatch();
  const { web3, accounts, contract, socketContract } = useAppSelector(
    (state) => state.web3Connect
  );
  const [nftSupply, setNftSupply] = useState();
  const [mintEvent, setMintEvent] = useState()

  const connectMetamask = () => {
    dispatch(loadBlockchain());
  };

  //smart-contract functions

  const handleMint = async () => {
    try {
      const receipt = await contract.methods.mint().send({
        from: accounts[0],
      });
      return receipt;
    } catch (error) {
      console.log("error", error);
      return error;
    }
  };

  const getCurrentSupply = async () => {
    try {
      let receipt = await contract.methods.currentSupply().call();
      return receipt;
    } catch (error) {
      console.log("error", error);
      return error;
    }
  };
  useEffect(async () => {
    if (socketContract) {
      let result = await getCurrentSupply();
      setNftSupply(result)
      ! mintEvent && listMintEvents()
    }
  }, [socketContract, mintEvent]);
  
  const listMintEvents = () => {
    socketContract.events.Transfer({}, function(error, event) {
      setMintEvent(event.returnValues)
    })
  }
  console.log("mintEvent", mintEvent)
  return (
    <div className="App">
      <br />
      {web3 ? (
        <>
          <button onClick={() => handleMint()}>Mint NFT</button>
          <>
          <br/><br/><br/>
          {
            nftSupply && petsData.map((data, index) => index < nftSupply && (
                <>
                <div className="column">
                <div className="card">
                <img  src={data?.picture} className="pet-img-size"/>
                  <h3>
                    {data?.name}
                  </h3>
                  <h3>
                  Age: {data?.age}
                  </h3>
                  <h3>
                   Breed: {data?.breed}
                  </h3>
                  <h3>
                   Location: {data?.location}
                  </h3>
                </div>
                </div>
                </>
            ))
          }
          </>
        </>
      ) : (
        <button onClick={() => connectMetamask()}>Connect Metamask</button>
      )}
    </div>
  );
}

export default App;
