import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';

class Myprofile extends Component {

    static contextType = MyContext; // using this.context to access global state

    constructor(props) {
        super(props);
        this.state = {
            txtUsername: '',
            txtPassword: '',
            txtName: '',
            txtPhone: '',
            txtEmail: ''
        };
    }

    render() {
        if (this.context.token === '') return (<Navigate replace to='/login' />);
        return (
            <div className='myprofile-container'>
                <form className='form-myprofile'>
                    <h1 className="h3 mb-3 fw-normal text-center">Tài khoản của tôi</h1>
                    <div class="form-floating mt-2">
                        <input type="text" class="form-control" id="floatingUsername" placeholder="Tên đăng nhập" value={ this.state.txtUsername } onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} />
                        <label for="floatingUsername">Tên đăng nhập</label>
                    </div>
                    <div class="form-floating mt-2">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Mật khẩu" value={ this.state.txtPassword } onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} />
                        <label for="floatingPassword">Mật khẩu</label>
                    </div>
                    <div class="form-floating mt-2">
                        <input type="text" class="form-control" id="floatingName" placeholder="Họ và tên" value={ this.state.txtName } onChange={(e) => { this.setState({ txtName: e.target.value }) }} />
                        <label for="floatingName">Họ và tên</label>
                    </div>
                    <div class="form-floating mt-2">
                        <input type="text" class="form-control" id="floatingPhone" placeholder="Số điện thoại" value={ this.state.txtPhone } onChange={(e) => { this.setState({ txtPhone: e.target.value }) }} />
                        <label for="floatingPhone">Số điện thoại</label>
                    </div>
                    <div class="form-floating mt-2">
                        <input type="text" class="form-control" id="floatingEmail" placeholder="Email" value={ this.state.txtEmail } onChange={(e) => { this.setState({ txtEmail: e.target.value }) }} />
                        <label for="floatingEmail">Email</label>
                    </div>
                    <button className="w-100 btn btn-lg btn-warning mt-4" type="submit" onClick={(e) => this.btnUpdateClick(e)}>Cập nhật</button>
                </form>
            </div>
        );
    }

    componentDidMount() {
        if (this.context.customer) {
            this.setState({
                txtUsername: this.context.customer.username,
                txtPassword: this.context.customer.password,
                txtName: this.context.customer.name,
                txtPhone: this.context.customer.phone,
                txtEmail: this.context.customer.email
            });
        }
    }

    // event - handlers
    btnUpdateClick(e) {
        e.preventDefault();
        const username = this.state.txtUsername;
        const password = this.state.txtPassword;
        const name = this.state.txtName;
        const phone = this.state.txtPhone;
        const email = this.state.txtEmail;
        if (username && password && name && phone && email) {
            const customer = { username, password, name, phone, email };
            this.apiPutCustomerProfile(this.context.customer._id, customer);
        } else {
            alert('Please input username, password, name, phone, and email');
        }
    }

    // APIs
    apiPutCustomerProfile(id, customer) {
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.put(`/api/customer/customers/${id}`, customer, config)
            .then((res) => {
                const result = res.data;
                if (result) {
                    alert('OK BABY!');
                    this.context.setCustomer(result);
                } else {
                    alert('SORRY BABY!');
                }
            })
            .catch((error) => {
                console.error('Error updating customer:', error);
                alert('An error occurred while updating the customer.');
            });
    }
}

export default Myprofile;