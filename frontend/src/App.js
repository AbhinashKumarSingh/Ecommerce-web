import React from 'react'
import './index.css';
import { Link } from 'react-router-dom';

//import Product from './components/Product';
import  { BrowserRouter ,Route} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/cartScreen';
import { useSelector } from 'react-redux';



function App() {
    const cart=useSelector(state=>state.cart);
    const {cartItems}=cart;
  return (
    <BrowserRouter >
    <div className="grid-container">
        <header className="row">
            <div>
                <Link className="brand" to="/">Ecommerce-Web</Link>

            </div>
            <div>
                <Link to="/cart">Cart{cartItems.length>0 && (<span className="badge">{cartItems.length}</span>)}</Link>
                <Link to="/signin">Signin</Link>
            </div>
        </header>
        <main>
        <Route path='/cart/:id?' component={CartScreen}></Route>
        <Route path='/product/:id' component={ProductScreen}  />
        <Route path='/' component={HomeScreen} exact />
            
        </main>
        <footer className="row center">
            All right reserved
        </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
