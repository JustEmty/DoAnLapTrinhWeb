import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';

class Inform extends Component {

    static contextType = MyContext; // using this . context to access global state

    render () {
        return (
            <div class="d-flex flex-row mb-2 inform-container">
                { this.context.token === '' ?
                    <div className='flex-container'><Link to='/login' className='login inform-hover'>Đăng nhập</Link> <Link to='/signup' className='sign-up inform-hover'>Đăng ký</Link> <Link to='/active' className='inform-hover'>Xác nhận tài khoản</Link></div>
                    :
                    <div className='flex-container'>Xin chào &nbsp;<b className='hello'>{ this.context.customer.name }</b> <Link to='/myprofile' className='nav-link my-profile'>Tài khoản</Link> <Link to='/myorders' className='nav-link my-orders'>Đơn hàng</Link> <Link to='/home' className='nav-link logout' onClick={() => this.lnkLogoutClick()}>Đăng xuất</Link></div>
                }
            </div>
        );
    }

    // event - handlers
    lnkLogoutClick(){
        this.context.setToken('');
        this.context.setCustomer(null);
        this.context.setMycart([]);
    }
}

export default Inform;