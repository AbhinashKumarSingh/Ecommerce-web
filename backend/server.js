import express from "express"
import data from './data.js'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyparser from 'body-parser'
import mongoose from 'mongoose'
import userRouter from "./routers/userRouter.js"
import productRouter from "./routers/productRouter.js"
import orderRouter from "./routers/orderRouter.js"

const result = dotenv.config()

if (result.error) {
  throw result.error
}

//console.log(result.parsed)

const app=express();
//console.log(process.env.JWT_SECRET)
mongoose.connect(process.env.MONGODB,
{
    //urlNewUrlParser:true,
    useUnifiedTopology:true//,useCreateIndex:true
}).then(()=>console.log('database connected'))
.catch((error)=>{
    console.log(error.message)
})

app.get('/',(req,res)=>{
    res.send(`Server is ready`)
});
// app.get("/api/products",(req,res)=>{
//     console.log("hy")
//    return res.send(data.products)
// })
// app.get("/api/products/:id",(req,res)=>{
//     console.log("hy")
//     const product=data.products.find(x=>x._id===req.params.id)
//     if(product){
//         res.send(product)
//     }
//     else{
//         return res.status(404).send({message:"Product Not Found"});
//     }
   
// })


    //some other code
//});    
app.use(bodyparser.json())
app.use(cors())
app.use(express.json())
app.use('/api/users',userRouter)
app.use('/api/products',productRouter)
app.use('/api/orders',orderRouter);
app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message})
})
const port=process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})