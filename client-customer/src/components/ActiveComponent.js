import axios from 'axios';
import React, { Component } from 'react';

class Active extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            txtID: '',
            txtToken: ''
        };
    }
 
    render(){
        return(
            <div className='active-container'>
                <form className='form-active'>
                    <h1 class="h3 mb-3 fw-normal text-center">Xác thực tài khoản</h1>
                    <div class="form-floating mt-2">
                        <input type="text" class="form-control" id="floatingID" placeholder="ID" value={ this.state.txtID } onChange={(e) => { this.setState ({ txtID: e.target.value }) }} />
                        <label for="floatingID">ID</label>
                    </div>
                    <div class="form-floating mt-2">
                        <input type="text" class="form-control" id="floatingToken" placeholder="Token" value={ this.state.txtToken } onChange={(e) => { this.setState ({ txtToken: e.target.value }) }} />
                        <label for="floatingToken">Token</label>
                    </div>
                    <button class="w-100 btn btn-lg btn-warning mt-4" type="submit" onClick={(e) => this.btnActiveClick(e) }>Xác thực</button>
                </form>
            </div>
        );
    }

    // event - handlers
    btnActiveClick(e){
        e.preventDefault();
        const id = this.state.txtID;
        const token = this.state.txtToken;
        if(id && token){
            this.apiActive(id, token);
        } else {
            alert('Please input id and token');
        }
    }

    // apis
    apiActive(id, token){
        const body = { id: id, token: token };
        axios.post('/api/customer/active', body).then((res) => {
            const result = res.data;
            if(result){
                alert('OK BABY!');
            } else {
                alert('SORRY BABY!');
            }
        });
    }
}

export default Active ;