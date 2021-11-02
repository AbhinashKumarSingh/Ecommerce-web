import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import { isAuth } from '../utils.js';

const orderRouter=express.Router();

orderRouter.get('/mine',isAuth,expressAsyncHandler(async(req,res)=>{
    const orders=await Order.find({user:req.user._id})
    res.send(orders);
}))

orderRouter.post('/',isAuth,expressAsyncHandler(async(req,res)=>{
    console.log(req.body)
    if(req.body.orderItems.length===0)
    {
        res.status(400).send({message:'Cart is empty'})
    }
    else{
        const order=new Order({
            orderItems:req.body.orderItems,
            shippingAddress:req.body.shippingAddress,
            paymentMethod:req.body.paymentMethod,
            itemsPrice:req.body.itemsPrice,
            shippingPrice:req.body.shippingPrice,
            taxPrice:req.body.taxPrice,
            totalPrice:req.body.totalPrice,
            user:req.user._id

        })
        const createdOrder=await order.save();
        res.status(201).send({message:'New order created',order:createdOrder})
    }
}))

orderRouter.put('/:id/pay',isAuth,expressAsyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params.id);
    
    const user=await User.findById(order.user)
    //console.log(user)
    if(order){
        order.isPaid=true;
        order.paidAt=Date(Date.now());
        order.paymentResult={status:'done',
        email:user.email};
        const updatedOrder=await order.save();
        console.log(updatedOrder)
        res.send({message:'Order Paid',order:updatedOrder})
    }
    else{
        res.status(404).send({message:'Order not found'})
    }
}))

orderRouter.get('/:id',isAuth,expressAsyncHandler(async(req,res)=>{
        const order=await Order.findById(req.params.id);
        if(order){
            res.send(order)
        }
        else{
            res.status(404).send({message:'Order Not Found'});
        }
}))

export default orderRouter;