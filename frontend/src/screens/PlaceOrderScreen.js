import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createdOrder } from '../actions/orderActions';
import CheckoutStep from '../components/ChackoutStep';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
//import { cartReducers } from '../reducers/cartReducers';
export default function PlaceOrderScreen(props){

    const cart=useSelector(state=>state.cart);
    if(!cart.paymentMethod){
        props.history.push('/payment')
    }
    const toPrice=(num)=>{
        return Number(num.toFixed(2))
    }
    const orderCreate=useSelector(state=>state.orderCreate);
    const {loading,success,error,order}=orderCreate;
    //console.log(order)
    cart.itemsPrice=toPrice(cart.cartItems.reduce((a,c)=>a+c.qty*c.price,0));
    cart.shippingPrice=cart.itemsPrice>100?toPrice(0):toPrice(10);
    cart.taxPrice=toPrice(.18*cart.itemsPrice);
    cart.totalPrice=cart.itemsPrice+cart.taxPrice+cart.shippingPrice;
    const dispatch=useDispatch();
    const placeOrderHandler=()=>{
        //console.log("hy")
            dispatch(createdOrder({...cart,orderItems:cart.cartItems}));
            //window.location.reload(true);

    }
    useEffect(()=>{
            if(success){
                props.history.push(`/order/${order._id}`);
                dispatch({type:ORDER_CREATE_RESET});
            }
    },[success,dispatch,props.history,order])
    return (
        <div>
            <CheckoutStep step1 step2 step3 step4></CheckoutStep>
            <div className='row top'>
                <div className='col-2'>
                    <ul>
                        <li>
                            <div className='card card-body'>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                                    <strong>Address:</strong> {cart.shippingAddress.address},
                                    {cart.shippingAddress.city},{cart.shippingAddress.postalCode},{cart.shippingAddress.country}

                                </p>
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method:</strong> {cart.paymentMethod} <br />
                                    

                                </p>
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Order Items</h2>
                                <ul>
                      {
                          cart.cartItems.map((item)=>(
                              <li key={item.product}>
                                  <div className='row'>
                                      <div>
                                      <img className='small' src={item.image} alt={item.name}></img>
                                      </div>
                                      <div
                                      className='min-30'>
                                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                                      </div>
                                      
                                      <div> {item.qty}x
                                      Rs.{item.price}=Rs.{item.qty*item.price}
                                      </div>
                                      
                                  </div>
                              </li>
                          ))
                      }
                  </ul>
                                
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='col-1'>
                    <div className='card card-body'>
                        <ul>
                            <li>
                                <h2>Order Summary</h2>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>
                                    Items
                                    </div>
                                    <div>Rs.{cart.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>
                                    Shipping
                                    </div>
                                    <div>Rs.{cart.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>
                                    Tax
                                    </div>
                                    <div>Rs.{cart.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div><strong>
                                    Order Total</strong>
                                    </div>
                                    <div><strong>Rs.{cart.totalPrice.toFixed(2)}</strong></div>
                                </div>
                            </li>
                            <li>
                                <button type='button' onClick={placeOrderHandler} className='primary block' disabled={cart.cartItems.length===0}>
                                    Place Order
                                </button>
                            </li>{
                                loading && <LoadingBox></LoadingBox>
                            }
                            {error&& <MessageBox variant='danger' >{error}</MessageBox>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}