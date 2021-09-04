import {applyMiddleware, createStore, compose, combineReducers} from 'redux'
//import data from "./data";
import thunk from 'redux-thunk'
import { cartReducer } from './reducers/cartReducers';
import { productDetailsReducer, productListReducer } from './reducers/productReducers';

const initialState={
        cart:{
                cartItems:localStorage.getItem('cartItems')
                ? JSON.parse(localStorage.getItem('cartItems'))
                :[]
        }
};
const reducer=combineReducers({
        productList:productListReducer,
        productDetails:productDetailsReducer,
        cart:cartReducer
})

const composeEnhancer=compose;
const store=createStore(reducer,initialState,composeEnhancer(applyMiddleware(thunk)));

export default store;