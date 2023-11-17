import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import { Link } from 'react-router-dom';

class Menu extends Component{
    static contextType = MyContext; // using this.context to access global state
    
    render(){
        return (
            <header class="p-3 menu-header">
                <div class="container">
                    <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><Link to="/admin/home" class="nav-link px-2 text-dark-blue">Home</Link></li>
                            <li><Link to="/admin/category" class="nav-link px-2 text-dark-blue">Category</Link></li>
                            <li><Link to="/admin/product" class="nav-link px-2 text-dark-blue">Product</Link></li>
                            <li><Link to="/admin/order" class="nav-link px-2 text-dark-blue">Order</Link></li>
                            <li><Link to="/admin/customer" class="nav-link px-2 text-dark-blue">Customer</Link></li>
                        </ul>
                        <div class="text-end section-right"> 
                            <span>Hello </span><b>{ this.context.username }</b> | <button type="button" class="btn logout-button" onClick={() => this.lnkLogoutClick()}><Link to='/admin/home' className="text-decoration-none logout-text">Logout</Link></button>
                        </div>
                    </div>
                    <div className="float-clear" />
                </div>
            </header>
        );
    }

    // event-handlers
    lnkLogoutClick(){
        this.context.setToken('');
        this.context.setUsername('');
    }
}

export default Menu;