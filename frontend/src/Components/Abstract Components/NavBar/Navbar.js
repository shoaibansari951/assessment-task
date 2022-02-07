import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Home from '../../Composit Components/Home/Home';
import AddProducts from '../AddProducts/AddProducts';
import Cart from '../CartComponent/Cart';
import ProductCard from '../ProductCard/ProductCard';
export default function Navbar() {
  return <div>
  <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
              <a className="navbar-brand" href="#">Navbar</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                      <ul className="navbar-nav" >
                            <li className="nav-item">
                              <Link className="nav-link" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/cart">Cart</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/checkout">Checkout</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/addproducts">Add Products</Link>
                            </li>
                      </ul>
                 </div>
            </div>
      </nav>
       <Switch>
            <Route exact path="/">
                <Home/>
                {/* <ProductCard/> */}
            </Route>
            <Route exact path="/cart">
                <Cart/>
            </Route>
            <Route exact path="/checkout">
                {/* <Pricing/> */}
            </Route>
            <Route exact path="/addproducts">
                <AddProducts/> 
            </Route>
      </Switch>
  </Router>
</div>;
}
