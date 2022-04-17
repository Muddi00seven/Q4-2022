import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './redux/store'
import { loadBlockchain } from './redux/slices/web3ConnectSlice'
import './App.css';

function App() {
  //use states
  const [amount, setAmount] = useState()
  const [address, setAddress] = useState()
  const [userBalance, setUserBalance] = useState()

  const dispatch = useAppDispatch()
  const { web3, accounts, contract } = useAppSelector((state) => state.web3Connect)
  const handleWeb3Connect = () => {
    dispatch(loadBlockchain());
  }
  console.log("states", amount, address)

  const balanceOf = async () => {
    try {
      let balance = await contract?.methods.balanceOf(accounts[0]).call()
      setUserBalance(balance);
    }
    catch (error) {
      console.log("error", error)
    }
  }

  const transferErc20 = async () => {
    try {
      let value = (amount * 10 ** 18).toFixed(0).toString();
      let transfer = await contract?.methods.transfer(address, value).send({
        from: accounts[0]
      })
     await balanceOf()
    console.log("transfer",transfer)
    }
    catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    console.log("balance function outside if")
    if (contract) {
      console.log("balance function is-side if")
      balanceOf()
    }
  }, [contract])
  return (
    <div className="App">
      {userBalance
        ? <>
          user Balance : {userBalance / 10**18}
        </>
        : ""
      }
      <br />
      {
        web3 ?
          <>
            <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='Amount' />
            <br />
            <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Address' />
            <br />
            <button onClick={() => transferErc20()}> Transfer</button>
          </>
          :
          <button onClick={() => handleWeb3Connect()}>
            Connect metamask
          </button>
      }

    </div>
  );
}

export default App;
