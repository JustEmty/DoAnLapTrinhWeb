import axios from 'axios';
import React, { Component } from 'react';

class Signup extends Component {

    constructor(props){
        super(props);
        this.state = {
            txtUsername: '',
            txtPassword: '',
            txtName: '',
            txtPhone: '',
            txtEmail: ''
        };
    }

    render(){
        return(
            // <div className="align-center">
            //     <h2 className="text-center">SIGN-UP</h2>
            //     <form>
            //         <table className="align-center">
            //             <tbody>
            //                 <tr>
            //                     <td>Username</td>
            //                     <td><input type="text" value={ this.state.txtUsername } onChange={(e) => { this.setState ({ txtUsername: e.target.value }) }} /></td>
            //                 </tr>
            //                 <tr>
            //                     <td>Password</td>
            //                     <td><input type="password" value={ this.state.txtPassword } onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} /></td>
            //                 </tr>
            //                 <tr>
            //                     <td>Name</td>
            //                     <td><input type="text" value={ this.state.txtName } onChange={(e) => { this.setState({ txtName: e.target.value }) }} /></td>
            //                 </tr>
            //                 <tr>
            //                     <td>Phone</td>
            //                     <td><input type="tel" value={ this.state.txtPhone } onChange={(e) => { this.setState({ txtPhone: e.target.value }) }} /></td>
            //                 </tr>
            //                 <tr>
            //                     <td>Email</td>
            //                     <td><input type="email" value={ this.state.txtEmail } onChange={(e) => { this.setState({ txtEmail: e.target.value }) }} /></td>
            //                 </tr>
            //                 <tr>
            //                     <td></td>
            //                     <td><input type="submit" value="SIGN-UP" onClick={(e) => this.btnSignupClick(e) } /></td>
            //                 </tr>
            //             </tbody>
            //         </table>
            //     </form>
            // </div>
            <div className='signup-container'>
                <form className='form-signup'>
                    <h1 class="h3 mb-3 fw-normal text-center">Đăng ký</h1>
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
                    <button class="w-100 btn btn-lg btn-warning mt-4" type="submit" onClick={(e) => this.btnSignupClick(e) }>Đăng ký</button>
                </form>
            </div>
        );
    }

    // event - handlers
    btnSignupClick(e){
        e.preventDefault();
        const username = this.state.txtUsername;
        const password = this.state.txtPassword;
        const name = this.state.txtName;
        const phone = this.state.txtPhone;
        const email = this.state.txtEmail;

        if(username && password && name && phone && email){
            const account = { username: username, password: password, name: name, phone: phone, email: email };
            this.apiSignup(account);
        } else {
            alert('Please input username and password and name and phone and email');
        }
    }

    // apis
    apiSignup(account){
        axios.post('/api/customer/signup', account).then((res) => {
            const result = res.data;
            alert(result.message);
        });
    }
}

export default Signup;