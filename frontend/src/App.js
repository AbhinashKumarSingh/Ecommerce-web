import React from 'react'

import { Route } from 'react-router';
import {BrowserRouter, Link} from 'react-router-dom'
import './index.css';
import ProductScreen from './Screens/ProductScreen';
import HomeScreen from './Screens/HomeScreen';
import CartScreen from './Screens/CartScreen';
import { useDispatch, useSelector } from 'react-redux';
import SigninScreen from './Screens/SigninScreen';
import { signout } from './actions/userActions';
import RegisterScreen from './Screens/RegisterScreen';
import ShippingAddressScreen from './Screens/ShippingAddressScreen';
import PaymentMethodScreen from './Screens/PaymentMethodScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderScreen from './Screens/oderScreen';
import OrderHistoryScreen from './Screens/OrderHistoryScreen';

function App() {
    const cart=useSelector(state=>state.cart);
    const {cartItems}=cart;
    const userSignin=useSelector(state=>state.userSignin);
    const {userInfo}=userSignin;
    //console.log(userSignin)
    const dispatch =useDispatch()
    const signoutHandler=()=>{
            dispatch(signout());
    }
    
    
    return (
      <BrowserRouter >
    <div className="grid-container">
            <header className="row">
                <div>
                    <Link className="brand" to="/">E-commerce</Link>
                </div>
                <div>
                <Link to="/cart">
              Cart
              {
                  cartItems.length>0 && (
                      <span className='badge'>{cartItems.length}</span>
                  )
              }
            </Link>
            
                    
                    {
                        userInfo?(
                            <div className='dropdown'>
                            <Link to='#'>{userInfo.name}<i className='fa fa-caret-down'></i></Link>
                            <ul className='dropdown-content'>
                            <li><Link to='/orderhistory'>Order History</Link></li>
                                <li><Link to='/' onClick={signoutHandler}>Sign Out</Link></li>
                            </ul>
                            </div>
                        ):(
                            <Link to="/signin">Sign In</Link>
                        )
                    }
                    
                    {/* <Link to="/register">Register</Link> */}
                   
                </div>
            </header>
            <main>
            <Route path='/cart/:id?' component={CartScreen} />
            <Route path='/product/:id' component={ProductScreen} />
            <Route path='/signin' component={SigninScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/shipping' component={ShippingAddressScreen} />
            <Route path='/payment' component={PaymentMethodScreen} />
            <Route path='/placeorder' component={PlaceOrderScreen} />
            <Route path='/order/:id' component={OrderScreen} />
            <Route path='/orderhistory' component={OrderHistoryScreen} />
            <Route path='/' component={HomeScreen} exact/>
                
            </main>
            <footer className="row center">
                All rights reserverd
            </footer>
        </div>
        </BrowserRouter>
  );
}

export default App;
