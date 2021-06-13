import { configureStore } from '@reduxjs/toolkit'
import contactReducer from './contactSlice'
import {combineReducers} from "redux";
import {loggerMiddleware} from "../loggerMiddleware/loggerMiddleware";



const rootReducer = combineReducers({
    toolkit: contactReducer
})

export default  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware)
})


