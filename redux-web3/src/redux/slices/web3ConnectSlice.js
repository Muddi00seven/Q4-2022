import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../../contract/contract';
import Web3 from 'web3';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import WalletConnectProvider from '@walletconnect/web3-provider';

export const initialState = {
    web3: null,
    contract: null,
    accounts: [],
    web3LoadingErrorMessage: null
}


//web3
//contract
//acounts

export const loadBlockchain = createAsyncThunk("loadBlockchain", async (_, thunkAPI) => {
    try {
        //network should be rinkeby
        console.log("Web3.givenProvider.chainId ", Web3.givenProvider.chainId)
        // if (Web3.givenProvider && Web3.givenProvider.chainId == "0x4") {
        if (Web3.givenProvider) {
            await Web3.givenProvider.enable();
            const web3 = new Web3(Web3.givenProvider);
            console.log("web3", web3)
            const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
            const accounts = await web3.eth.getAccounts();
            return {
                web3,
                accounts,
                contract
            }
        }
        else {
            return {
                web3LoadingErrorMessage: "error in connecting wallet"
            }
        }

    }
    catch (error) {
        console.log("error", error)
    }
})



export const loadWalletConnect = createAsyncThunk("loadWalletConnect", async (_, thunkAPI) => {
    try {
        
        const provider =  new WalletConnectProvider({
            rpc: {
                4: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
            },
            chainId: 4,
        })

        if (provider) {
            await provider.enable();
            const web3 = new Web3(provider);
            console.log("web3", web3)
            const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
            const accounts = await web3.eth.getAccounts();
            return {
                web3,
                accounts,
                contract
            }
        }
        else {
            return {
                web3LoadingErrorMessage: "error in connecting wallet"
            }
        }

    }
    catch (error) {
        console.log("error", error)
    }
})


export const updateAccount = createAsyncThunk("updateAccount", async (data, thunkAPI) => {
    try {
        let accounts =  data
            return {
                accounts,
            }
        }
    
    catch (error) {
        console.log("error", error)
    }
})

const web3ConnectSlice = createSlice({
    name: "Web3Connect",
    initialState,
    reducers: {},
    extraReducers: {
        [loadBlockchain.fulfilled.toString()]: (
            state,
            { payload }
        ) => {
            state.web3 = payload?.web3;
            state.contract = payload?.contract;
            state.accounts = payload?.accounts;

        },
        [loadWalletConnect.fulfilled.toString()]: (
            state,
            { payload }
        ) => {
            state.web3 = payload?.web3;
            state.contract = payload?.contract;
            state.accounts = payload?.accounts;

        },
        [updateAccount.fulfilled.toString()]: (
            state,
            { payload }
        ) => {
            state.accounts = payload?.accounts;

        }
    }

});

export const web3Reducer = web3ConnectSlice.reducer;