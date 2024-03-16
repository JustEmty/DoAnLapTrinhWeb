import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import { Link } from 'react-router-dom';
import logo from '../assets/Logo.jpg'
import {Helmet} from "react-helmet";
class Menu extends Component{
    static contextType = MyContext; // using this.context to access global state
    
    render(){
        return (
            <div class="container-flur container-header">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Trang chủ</title>
                </Helmet>
                <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4">
                    <a href="/admin/home" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                        <img className="nav-logo" src={logo} alt="logo" />
                    </a>
                    <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                        <li><Link to="/admin/home" class="nav-link padding-nav">Trang chủ</Link></li>
                        <li><Link to="/admin/category" class="nav-link padding-nav">Thể loại</Link></li>
                        <li><Link to="/admin/product" class="nav-link padding-nav">Sản phẩm</Link></li>
                        <li><Link to="/admin/order" class="nav-link padding-nav">Đơn đặt hàng</Link></li>
                        <li><Link to="/admin/customer" class="nav-link padding-nav">Khách hàng</Link></li>
                    </ul>
                    <div class="col-md-3 text-end">
                        <button type="button" class="btn logout-button" onClick={() => this.lnkLogoutClick()}><Link to='/admin/home' className="text-decoration-none logout-text logout-text">Đăng xuất</Link></button>
                    </div>
                </header>
            </div>
        );
    }

    // event-handlers
    lnkLogoutClick(){
        this.context.setToken('');
        this.context.setUsername('');
    }
}

export default Menu;
