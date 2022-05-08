import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './redux/store'
import { loadBlockchain, loadWalletConnect, updateAccount } from './redux/slices/web3ConnectSlice'
import './App.css';

function App() {
  //use states
  const [amount, setAmount] = useState()
  const [address, setAddress] = useState()
  const [userBalance, setUserBalance] = useState()

  const dispatch = useAppDispatch()
  const { web3, accounts, contract } = useAppSelector((state) => state.web3Connect)
  const handleMetamask = () => {
    dispatch(loadBlockchain());
  }

  const handleWalletConnect = () => {
    dispatch(loadWalletConnect());
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
      console.log("transfer", transfer)
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
  }, [contract, accounts])

  const switchNetwork = async () => {
    try {
      await web3.currentProvider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: "0x61" }]
      })
    }
    catch (error) {
      if (error.code == 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x61',
              chainName: "bsc testnet",
              nativeCurrency: {
                name: "bnb",
                symbol: "bnb",
                decimals: 18
              },
              blockExplorerUrls: [
                "https://testnet.bscscan.com"
              ],
              rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"]
            }
          ]
        })
      }
      console.log("error", error)
    }
  }

  // account switch
  window.ethereum.on('accountsChanged', async (data)=>{
      dispatch(updateAccount(data))
  })
  return (
    <div className="App">
      {userBalance
        ? <>
          user Balance : {userBalance / 10 ** 18}
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
            <br /><br /><br />
            <button onClick={() => switchNetwork()}>
              Switch Network
            </button>
          </>
          :
          <>
            <button onClick={() => handleMetamask()}>
              Connect Metamask
            </button>
            <br /><br /><br />
            <button onClick={() => handleWalletConnect()}>
              Connect WalletConnect
            </button>
          </>
      }

    </div>
  );
}

export default App;
