import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import { Link } from 'react-router-dom';

class Menu extends Component{
    static contextType = MyContext; // using this.context to access global state
    
    render(){
        return(
            <div className="border-bottom">
                <div className="float-left">
                    <ul className="menu">
                        <li className="menu"><Link to='/admin/home'>Home</Link></li>
                        <li className="menu"><Link to='/admin/category'>Category</Link></li>
                        <li className="menu"><Link to='/admin/product'>Product</Link></li>
                        <li className="menu"><Link to='/admin/order'>Order</Link></li>
                        <li className="menu"><Link to='/admin/customer'>Customer</Link></li>
                    </ul>
                </div>
                <div className="float-right">
                    Hello <b>{ this.context.username }</b> | <Link to='/admin/home' onClick={() => this.lnkLogoutClick()}>Logout</Link>
                </div>
                <div className="float-clear" />
            </div>
            
            // -----------------------
            // <header class="p-3 bg-dark text-white">
            //     <div class="container">
            //         <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            //             <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            //                 <li><a href="#" class="nav-link px-2 text-secondary">Home</a></li>
            //                 <li><a href="#" class="nav-link px-2 text-white">Features</a></li>
            //                 <li><a href="#" class="nav-link px-2 text-white">Pricing</a></li>
            //                 <li><a href="#" class="nav-link px-2 text-white">FAQs</a></li>
            //                 <li><a href="#" class="nav-link px-2 text-white">About</a></li>
            //             </ul>

            //             <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            //                 <input type="search" class="form-control form-control-dark" placeholder="Search..." aria-label="Search" />
            //             </form>

            //             <div class="text-end">
            //                 <button type="button" class="btn btn-outline-light me-2">Login</button>
            //                 <button type="button" class="btn btn-warning">Sign-up</button>
            //             </div>
            //         </div>
            //     </div>
            // </header>
        );
    }

    // event-handlers
    lnkLogoutClick(){
        this.context.setToken('');
        this.context.setUsername('');
    }
}

export default Menu;