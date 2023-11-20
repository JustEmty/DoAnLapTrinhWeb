import React, { Component } from 'react';
import Menu from './MenuComponent';
import Inform from './InformComponent';
import Home from './HomeComponent';
import { Routes, Route, Navigate } from 'react-router-dom';
import Product from './ProductComponent';
import ProductDetail from './ProductDetailComponent';
import Signup from './SignupComponent';
import Active from './ActiveComponent';
import Login from './LoginComponent';
import Myprofile from './MyprofileComponent';
import Mycart from './MycartComponent';
import Myorders from './MyordersComponent';

class Main extends Component {
    render(){
        return (
            <div className="body-customer">
                <Inform />
                <Menu />
                <Routes>
                    <Route path='/' element={<Navigate replace to='/home' />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/product/category/:cid' element={<Product />} />
                    <Route path='/product/search/:keyword' element={<Product />} />
                    <Route path='/product/:id' element={<ProductDetail />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/active' element={<Active />} />
                    <Route path='/login' element={<Login />} />
                    <Route path ='/myprofile' element={<Myprofile />} />
                    <Route path='/mycart' element={<Mycart />} />
                    <Route path='/myorders' element={<Myorders />} />
                </Routes>  
                <div class="container-fluid contain-first">
                    <div class="container contain-second">
                        <footer class="py-5 footer-first">
                            <div class="row">
                                <div class="col-6 col-md-2 mb-3">
                                    <h5 className='text-white'>Hổ trợ</h5>
                                    <ul class="nav flex-column column-1">
                                        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-white">Địa chỉ: 685 Market Street, Las Vegas, LA 95820, United States.</a></li>
                                        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-white">example@domain.com</a></li>
                                        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-white">Điện thoại: 0967284</a></li>
                                    </ul>
                                </div>

                                <div class="col-6 col-md-2 mb-3">
                                    <h5 className='text-white'>Tài khoản</h5>
                                    <ul class="nav flex-column">
                                        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Tài khoản của tôi</a></li>
                                        <li class="nav-item mb-2"><a href="/signup" class="nav-link p-0 text-body-secondary">Đăng ký</a></li>
                                        <li class="nav-item mb-2"><a href="/login" class="nav-link p-0 text-body-secondary">Đăng nhập</a></li>
                                        <li class="nav-item mb-2"><a href="/mycart" class="nav-link p-0 text-body-secondary">Giỏ hàng</a></li>
                                    </ul>
                                </div>

                                <div class="col-6 col-md-2 mb-3">
                                    <h5 className='text-white'>Liên kết</h5>
                                    <ul class="nav flex-column">
                                        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-white">Chính sách bảo mật</a></li>
                                        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-white">Điều khoản sử dụng</a></li>
                                        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-white">FAQ</a></li>
                                        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-white">Liên hệ</a></li>
                                    </ul>
                                </div>

                                <div class="col-md-5 offset-md-1 mb-3">
                                    <form>
                                        <h6 className='text-white'>Theo dõi bản tin của chúng tôi</h6>
                                        <p className='text-white'>Thông báo hàng tháng về những gì mới và thú vị từ chúng tôi.</p>
                                        <div class="d-flex flex-column flex-sm-row w-100 gap-2">
                                            <label for="newsletter1" class="visually-hidden text-white">Email address</label>
                                            <input id="newsletter1" type="text" class="form-control" placeholder="Email"/>
                                            <button class="btn btn-primary" type="button">Subscribe</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="container">
                                <footer class="py-3 my-4">
                                    <ul class="nav justify-content-center border-bottom pb-3 mb-3"/> 
                                    <p class="text-center text-body-secondary">&copy; 2023 Company, Inc</p>
                                </footer>
                            </div>
                        </footer>  
                    </div> 
                </div>
            </div>
        );
    }
}

export default Main;