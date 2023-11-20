import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import logo from '../assets/Logo.jpg';

class  Login extends Component{
    static contextType = MyContext; // using this.context to access global state
    
    constructor(props){
        super(props);
        this.state = {
            txtUsername: '',
            txtPassword: ''
        };
    }
    
    render(){
        if(this.context.token === ''){
            return(
                <div className='login-container'>
                    <form className='form-signin'>
                        <div className='logo-container'>
                            <img className='logo' src={logo} alt='logo' />
                        </div>
                        <h1 class="h3 mb-3 fw-normal text-center">Admin Login</h1>
                        <div class="form-floating mt-2">
                            <input type="text" class="form-control" id="floatingUsername" placeholder="username" value={ this.state.txtUsername } onChange={(e) => { this.setState({ txtUsername: e.target.value}) }} />
                            <label for="floatingUsername">Username</label>
                        </div>
                        <div class="form-floating mt-2">
                            <input type="password" class="form-control" id="floatingPassword" placeholder="Password" value={ this.state.txtPassword } onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} />
                            <label for="floatingPassword">Password</label>
                        </div>
                        <button class="w-100 btn btn-lg btn-primary mt-4 signin-button" type="submit" onClick={(e) => this.btnLoginClick(e)}>Sign in</button>
                    </form>
                </div>
            );
        }
        return (<div />);
    }

    //event-handlers
    btnLoginClick(e){
        e.preventDefault();
        const username = this.state.txtUsername;
        const password = this.state.txtPassword;
        if(username && password){
            const account = { username: username, password: password };
            this.apiLogin(account);
        }else{
            alert('Please input username and password');
        }
    }

    //apis
    apiLogin(account){
        axios.post('/api/admin/Login', account).then((res) => {
            const result = res.data;
            if(result.success === true){
                this.context.setToken(result.token);
                this.context.setUsername(account.username);
            }else{
                alert(result.message);
            }
        });
    }
}

export default Login;