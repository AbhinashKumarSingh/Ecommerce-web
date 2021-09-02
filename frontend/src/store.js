import {applyMiddleware, createStore, compose, combineReducers} from 'redux'
//import data from "./data";
import thunk from 'redux-thunk'
import { productDetailsReducer, productListReducer } from './reducers/productReducers';

const initialState={};
const reducer=combineReducers({
        productList:productListReducer,
        productDetails:productDetailsReducer
})

const composeEnhancer=compose;
const store=createStore(reducer,initialState,composeEnhancer(applyMiddleware(thunk)));

export default store;