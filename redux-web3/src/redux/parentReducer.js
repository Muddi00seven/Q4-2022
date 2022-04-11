import { combineReducers } from "@reduxjs/toolkit";
import { web3Reducer } from './slices/web3ConnectSlice';

const parentReducer = combineReducers({
    web3Connect: web3Reducer
})


export default parentReducer;