import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder, payOrder } from '../actions/orderActions';
//import { createdOrder } from '../actions/orderActions';
//import CheckoutStep from '../components/ChackoutStep';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_PAY_RESET } from '../constants/orderConstants';
//import { ORDER_CREATE_RESET } from '../constants/orderConstants';
//import { cartReducers } from '../reducers/cartReducers';
export default function OrderScreen(props){
    const orderId=props.match.params.id;
    const orderDetails=useSelector(state=>state.orderDetails);
    const {order,loading,error}=orderDetails;
    console.log(loading)
    const orderPay=useSelector(state=>state.orderPay)
    const [paymentResult,setPaymentResult]=useState(false)
    //console.log(paymentResult)
    
    const {error:errorPay,success:successPay,loading:loadingPay}=orderPay
    
    const dispatch=useDispatch();
    //console.log(order.isPaid)
    useEffect(()=>{
       if(!order || successPay || (order._id!==orderId) )
       {
           
           dispatch({type:ORDER_PAY_RESET})
            dispatch(detailsOrder(orderId))
       }
    },[dispatch,orderId,order,successPay])

    const paymentHandler=()=>{
         //console.log(paymentResult);
         setPaymentResult(true);
         //function refreshPage() {
            //window.location.reload(true);
            //e.preventDefault();

          //}
         console.log('hy');
         dispatch(payOrder(order,paymentResult))
        // props.history.push('/')
        //window.location.reload(true);
        //e.preventDefault();

        //order.isPaid=true
    }
    return  loading?(<LoadingBox></LoadingBox>):error?<MessageBox variant='danger'>{error}</MessageBox>
    :
        (<div>
            <h1>Order {order._id}</h1>
            <div className='row top'>
                <div className='col-2'>
                    <ul>
                        <li>
                            <div className='card card-body'>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                                    <strong>Address:</strong> {order.shippingAddress.address},
                                    {order.shippingAddress.city},{order.shippingAddress.postalCode},{order.shippingAddress.country}

                                </p>
                                {
                                 order.isDelivered?<MessageBox variant='success'>{order.deliveredAt}</MessageBox>:
                                    <MessageBox variant='danger'>Not Delivered</MessageBox>
                                }
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method:</strong> {order.paymentMethod} <br />
                                    

                                </p>
                                {
                                    order.isPaid?<MessageBox variant='success'>{order.paidAt}</MessageBox>:
                                    <MessageBox variant='danger'>Not Paid</MessageBox>
                                }
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Order Items</h2>
                                <ul>
                                {
                          order.orderItems.map((item)=>(
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
                                    <div>Rs.{order.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>
                                    Shipping
                                    </div>
                                    <div>Rs.{order.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>
                                    Tax
                                    </div>
                                    <div>Rs.{order.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div><strong>
                                    Order Total</strong>
                                    </div>
                                    <div><strong>Rs.{order.totalPrice.toFixed(2)}</strong></div>
                                </div>
                            </li><li>
                            {
                                !order.isPaid && (
                                    <>
                                    {errorPay && <MessageBox variant='danger'>{errorPay}</MessageBox>}
                                    {loadingPay &&  <LoadingBox></LoadingBox>}
                                <button className='primary block'  onClick={()=>paymentHandler()}>Pay</button>
                                {loadingPay &&  <LoadingBox></LoadingBox>}
                                </>
                                )

                            }
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}