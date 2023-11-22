import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CartUtil from '../utils/CartUtil';
import axios from 'axios';
import withRouter from '../utils/withRouter';

class Mycart extends Component {

    static contextType = MyContext; // using this . context to access global state

    render(){
        const mycart = this.context.mycart.map((item, index) => {
            return(
                <tr key={ item.product._id } className="datatable">
                    <td>{ index + 1 }</td>
                    <td>{ item.product._id }</td>
                    <td>{ item.product.name }</td>
                    <td>{ item.product.category.name }</td>
                    <td><img src={"data:image/jpg;base64," + item.product.image } width ="70px" height ="70px" alt ="" /></td>
                    <td>{ item.product.price }</td>
                    <td>{ item.quantity }</td>
                    <td>{ item.product.price * item.quantity }</td>
                    <td><button type="button" className="btn btn-warning" onClick={() => this.lnkRemoveClick(item.product._id)}>Remove</button></td>
                </tr> 
            );
        });
        return(
            <div class="row table-container">
                <h2 className="text-center">ITEM LIST</h2>
                <div class="col-8 col-sm-8 col-md-8 tabledata">
                    <table class="table table-hover col-7">
                        <tbody>
                            <tr>
                                <th scope="col">No.</th>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Category</th>
                                <th scope="col">Image</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Action</th>
                            </tr>
                            { mycart }
                            <tr>
                                <td colSpan="6" ></td>
                                <td>Total</td>
                                <td>{ CartUtil.getTotal(this.context.mycart) }</td>
                                <td><button type="button" className="checkout-button" onClick={() => this.lnkCheckoutClick()}>CHECKOUT</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    // event - handlers
    lnkRemoveClick(id){
        const mycart = this.context.mycart;
        const index = mycart.findIndex(x => x.product._id === id);
        if(index !== -1) { // found , remove item
            mycart.splice(index, 1);
            this.context.setMycart(mycart);
        }
    }

    lnkCheckoutClick(){
        if(window.confirm('ARE YOU SURE?')){
            if (this.context.mycart.length > 0){
                const total = CartUtil.getTotal(this.context.mycart);
                const items = this.context.mycart;
                const customer = this.context.customer;

                if(customer){
                    this.apiCheckout(total, items, customer);
                } else {
                    this.props.navigate('/login');
                }
            } else {
                alert('Your cart is empty');
            }
        }
    }

    // apis
    apiCheckout(total, items, customer){
        const body = { total: total, items: items, customer: customer };
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.post('/api/customer/checkout', body, config).then((res) => {
            const result = res.data;
            if(result){
                alert('OK BABY!');
                this.context.setMycart([]);
                this.props.navigate('/home');
            } else {
                alert('SORRY BABY!');
            }
        });
    }
}

export default withRouter(Mycart);