import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { loadBlockchain } from "./redux/slices/web3ConnectSlice";
import "./App.css";
import { petsData } from "./data";

function App() {
  //use states
  const [adopters, setAdopters] = useState();

  const empyAddress = "0x0000000000000000000000000000000000000000";
  const dispatch = useAppDispatch();
  const { web3, accounts, contract } = useAppSelector(
    (state) => state.web3Connect
  );
  const handleMetamask = () => {
    dispatch(loadBlockchain());
  };

  const getAdopters = async () => {
    try {
      let receipt = await contract.methods.getAdopters().call();
      setAdopters(receipt);
    } catch (error) {
      console.log("error", error);
    }
  };

  const adoptPet = async (id) => {
    try {
      let receipt = await contract.methods.adopt(id).send({ from: accounts[0] });
      // console.log("adopters", receipt);
      setAdopters(receipt);
      await getAdopters()
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(async () => {
    if (contract) {
      await getAdopters();
    }
  }, [contract]);

  return (
    <div className="App">
      <br />
      {web3 ? (
        <>{adopters ? petsData.map((data, index) => <>
          <div className="column">
          <div className="card">
            <img
            className="pet-img-size"
            src={data?.picture} /> 
            <h3>
              {data?.name}
            </h3>
            <p>Age: {data?.age}</p>
            <p>Breed: {data?.breed}</p>
            <p>Location: {data?.location}</p>
            {
              adopters[index] === empyAddress ?
              <button onClick={() => adoptPet(index)}>
                Adopt
              </button>
              :
              "Adopted"
            }
          </div>
          </div>
        </>) : ""}</>
      ) : (
        <>
          <button onClick={() => handleMetamask()}>Connect Metamask</button>
          <br />
          <br />
          <br />
        </>
      )}
    </div>
  );
}

export default App;
