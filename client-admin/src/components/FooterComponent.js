import React, { Component } from "react";
import { Link } from 'react-router-dom';
import logo from '../assets/Logo.jpg';

class Footer extends Component{

    render(){
        return(
            <div class="container-flur footer-container">
                <footer class="d-flex flex-wrap justify-content-between align-items-center py-3">
                    <div class="col-md-4 d-flex align-items-center">
                        <a href="/" class="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
                            <img className="footer-logo" src={logo}/>
                        </a>
                        <span class="mb-3 mb-md-0">© 2023 Nhóm Tài, Tuấn, Hiếu, Hậu, Thông</span>
                    </div>
                    <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
                        <li class="nav-item"><Link to="/admin/home" class="nav-link px-2 link-footer-text">Trang chủ</Link></li>
                        <li class="nav-item"><Link to="/admin/category" class="nav-link px-2 link-footer-text">Thể loại</Link></li>
                        <li class="nav-item"><Link to="/admin/product" class="nav-link px-2 link-footer-text">Sản phẩm</Link></li>
                        <li class="nav-item"><Link to="/admin/order" class="nav-link px-2 link-footer-text">Đơn đặt hàng</Link></li>
                        <li class="nav-item"><Link to="/admin/customer" class="nav-link px-2 link-footer-text">Khách hàng</Link></li>
                    </ul>
                </footer>
            </div>
        );
    }

}

export default Footer;