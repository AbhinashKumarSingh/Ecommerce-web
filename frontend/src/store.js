import {applyMiddleware, createStore, compose, combineReducers} from 'redux'
//import data from "./data";
import thunk from 'redux-thunk'
import { productListReducer } from './reducers/productReducers';

const initialState={};
const reducer=combineReducers({
        productList:productListReducer,
})

const composeEnhancer=compose;
const store=createStore(reducer,initialState,composeEnhancer(applyMiddleware(thunk)));

export default store;