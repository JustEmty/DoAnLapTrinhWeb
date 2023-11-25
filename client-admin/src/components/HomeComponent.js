import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import logo from '../assets/Logo.jpg';
import { Link } from 'react-router-dom';

class Home extends Component{
    
    static contextType = MyContext; // using this.context to access global state

    render(){
        return(
            <div class="px-4 py-5 my-5 text-center hero-container">
                <img class="d-block mx-auto mb-4" src={logo} alt="logo" width="150" />
                <h1 class="display-5 fw-bold">Xin Chào {this.context.username}</h1>
                <div class="col-lg-6 mx-auto">
                    <p class="lead mb-4">Đây là trang chủ của Admin nơi bạn có thể điều chỉnh và quản lý sản phẩm và khách hàng của mình. Hãy bắt đầu bằng việc nhấn vào những nút bấm dưới đây</p>
                    <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
                        <button type="button" class="btn default-button"><Link to="/admin/category" className="text-decoration-none logout-text link-text">Thể loại</Link></button>
                        <button type="button" class="btn default-button"><Link to="/admin/product" className="text-decoration-none logout-text link-text">Sản phẩm</Link></button>
                        <button type="button" class="btn default-button"><Link to="/admin/order" className="text-decoration-none logout-text link-text">Đơn đặt hàng</Link></button>
                        <button type="button" class="btn default-button"><Link to="/admin/customer" className="text-decoration-none logout-text link-text">Khách hàng</Link></button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;