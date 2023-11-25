import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import withRouter from '../utils/withRouter';
import logo from '../assets/Logo.jpg';

class Login extends Component {
    
    static contextType = MyContext; // using this . context to access global state
    
    constructor(props){
        super(props);
        this.state = {
            txtUsername: '',
            txtPassword: ''
        };
    }

    render(){
        return(
            <div className='login-container'>
                <form className='form-login'>
                    <div className='logo-container'>
                        <img className='logo' src={logo} alt='logo' />
                    </div>
                    <h1 class="h3 mb-3 fw-normal text-center">Đăng nhập</h1>
                    <div class="form-floating mt-2">
                        <input type="text" class="form-control" id="floatingUsername" placeholder="Username" value={ this.state.txtUsername } onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} />
                        <label for="floatingUsername">Tên đăng nhập</label>
                    </div>
                    <div class="form-floating mt-2">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" value={ this.state.txtPassword } onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} />
                        <label for="floatingPassword">Mật khẩu</label>
                    </div>
                    <button class="w-100 btn btn-lg btn-warning mt-4" type="submit" onClick={(e) => this.btnLoginClick(e) } >Đăng nhập</button>
                </form>
            </div>
        );
    }

    // event - handler
    btnLoginClick(e){
        e.preventDefault();
        const username = this.state.txtUsername;
        const password = this.state.txtPassword;
        if(username && password){
            const account = { username: username, password: password };
            this.apiLogin(account);
        } else {
            alert ('Vui lòng nhập tên tài khoản và mật khẩu');
        }
    }

    // apis
    apiLogin(account){
        axios.post('/api/customer/login', account).then((res) => {
            const result = res.data;
            if(result.success === true){
                this.context.setToken(result.token);
                this.context.setCustomer(result.customer);
                this.props.navigate('/home');
            } else {
                alert(result.message);
            }
        });
    }
}

export default withRouter(Login);