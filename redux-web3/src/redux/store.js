import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import parentReducer from "./parentReducer";

const store = configureStore({
    reducer: parentReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }),
})

export const useAppDispatch = () => useDispatch()

export const useAppSelector = useSelector;

export default store;