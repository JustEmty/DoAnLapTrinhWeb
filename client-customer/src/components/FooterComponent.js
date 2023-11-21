import React, {Component} from 'react';

class Footer extends Component{

    render(){
        return(
            <div className="container-fluid contain-first">
                <div className="container contain-second">
                    <footer className="py-5 footer-first">
                        <div className="row">
                            <div class="col-6 col-md-2 mb-3">
                                <h5 className='text-white'>Hổ trợ</h5>
                                <ul className="nav flex-column column-1">
                                    <li className="nav-item mb-2"><a href="#" className="text-decoration-none p-0 text-default-white-70percent">Địa chỉ: 685 Market Street, Las Vegas, LA 95820, United States.</a></li>
                                    <li className="nav-item mb-2"><a href="#" className="text-decoration-none p-0 text-default-white-70percent">example@domain.com</a></li>
                                    <li className="nav-item mb-2"><a href="#" className="text-decoration-none p-0 text-default-white-70percent">Điện thoại: 0967284</a></li>
                                </ul>
                            </div>

                            <div className="col-6 col-md-2 mb-3">
                                <h5 className='text-white'>Tài khoản</h5>
                                <ul className="nav flex-column">
                                    <li className="nav-item mb-2"><a href="#" className="text-decoration-none p-0 text-default-white-70percent">Tài khoản của tôi</a></li>
                                    <li className="nav-item mb-2"><a href="/signup" className="text-decoration-none p-0 text-default-white-70percent">Đăng ký</a></li>
                                    <li className="nav-item mb-2"><a href="/login" className="text-decoration-none p-0 text-default-white-70percent">Đăng nhập</a></li>
                                    <li className="nav-item mb-2"><a href="/mycart" className="text-decoration-none p-0 text-default-white-70percent">Giỏ hàng</a></li>
                                </ul>
                            </div>

                            <div className="col-6 col-md-2 mb-3">
                                <h5 className='text-white'>Liên kết</h5>
                                <ul className="nav flex-column">
                                    <li className="nav-item mb-2"><a href="#" className="text-decoration-none p-0 text-default-white-70percent">Chính sách bảo mật</a></li>
                                    <li className="nav-item mb-2"><a href="#" className="text-decoration-none p-0 text-default-white-70percent">Điều khoản sử dụng</a></li>
                                    <li className="nav-item mb-2"><a href="#" className="text-decoration-none p-0 text-default-white-70percent">FAQ</a></li>
                                    <li className="nav-item mb-2"><a href="#" className="text-decoration-none p-0 text-default-white-70percent">Liên hệ</a></li>
                                </ul>
                            </div>

                            <div className="col-md-5 offset-md-1 mb-3">
                                <form>
                                    <h6 className='text-white'>Theo dõi bản tin của chúng tôi</h6>
                                    <p className='text-white'>Thông báo hàng tháng về những gì mới và thú vị từ chúng tôi.</p>
                                    <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                                        <label for="newsletter1" className="visually-hidden text-white">Email address</label>
                                        <input id="newsletter1" type="text" className="form-control" placeholder="Email"/>
                                        <button className="btn btn-primary" type="button">Subscribe</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="container">
                            <footer className="py-3 my-4">
                                <ul className="nav justify-content-center border-bottom pb-3 mb-3"/> 
                                <p className="text-center text-default-white-70percent">&copy; 2023 Company, Inc</p>
                            </footer>
                        </div>
                    </footer>  
                </div> 
            </div>
        );
    }
}

export default Footer;