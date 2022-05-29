import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../../contract/contract";
import Web3 from "web3";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialState = {
  web3: null,
  contract: null,
  socketContract: null,
  accounts: [],
  web3LoadingErrorMessage: null,
};

//web3
//contract
//acounts

export const loadBlockchain = createAsyncThunk(
  "loadBlockchain",
  async (_, thunkAPI) => {
    try {
      //network should be rinkeby
      console.log("Web3.givenProvider.chainId ", Web3.givenProvider.chainId);
      // if (Web3.givenProvider && Web3.givenProvider.chainId == "0x4") {
      if (Web3.givenProvider) {
        await Web3.givenProvider.enable();
        const web3 = new Web3(Web3.givenProvider);
        console.log("web3", web3);
        const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        const accounts = await web3.eth.getAccounts();
        // web3 scoket
        const web3Socket = new Web3(
          new Web3.providers.WebsocketProvider(
            `wss://rinkeby.infura.io/ws/v3/9043c5907b4f4696a35189799c013dee`
          )
        );
        const socketContract = new web3Socket.eth.Contract(
          CONTRACT_ABI,
          CONTRACT_ADDRESS
        );
        return {
          web3,
          accounts,
          contract,
          socketContract,
        };
      } else {
        return {
          web3LoadingErrorMessage: "error in connecting wallet",
        };
      }
    } catch (error) {
      console.log("error", error);
    }
  }
);

const web3ConnectSlice = createSlice({
  name: "Web3Connect",
  initialState,
  reducers: {},
  extraReducers: {
    [loadBlockchain.fulfilled.toString()]: (state, { payload }) => {
      state.web3 = payload?.web3;
      state.contract = payload?.contract;
      state.socketContract = payload?.socketContract;
      state.accounts = payload?.accounts;
    },
  },
});

export const web3Reducer = web3ConnectSlice.reducer;
