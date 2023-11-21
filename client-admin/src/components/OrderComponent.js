import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class Order extends Component {

    static contextType = MyContext ; // using this . context to access global state

    constructor(props){
        super(props);
        this.state = {
            orders: [],
            order: null
        };
    }
 
    render () {
        const orders = this.state.orders.map((item) => {
            return (
                <tr key={ item._id } className="datatable" onClick={() => this.trItemClick(item)} >
                    <td>{ item._id }</td>
                    <td>{ new Date (item.cdate).toLocaleString() }</td>
                    <td>{ item.customer.name }</td>
                    <td>{ item.customer.phone }</td>
                    <td>{ item.total }</td>
                    <td>{ item.status }</td>
                    <td>
                        { item.status === 'PENDING' ?
                        <div><span className="link" onClick={() => this.lnkApproveClick(item._id)}>APPROVE</span> || <span className="link" onClick={() => this.lnkCancelClick(item._id)}>CANCEL</span></div>
                       : <div />}
                    </td>
                </tr>
            );
        });
        if(this.state.order){
            var items = this.state.order.items.map((item, index) => {
                return (
                    <tr key={ item.product._id } className="datatable">
                        <td>{ index + 1} </td>
                        <td>{ item.product._id }</td>
                        <td>{ item.product.name }</td>
                        <td><img src={"data:image/jpg;base64," + item.product.image } width="70px" height="70px" alt ="" /></td>
                        <td>{ item.product.price }</td>
                        <td>{ item.quantity }</td>
                        <td>{ item.product.price * item.quantity }</td>
                    </tr>
                );
            });
        }
        return(
            <div class ="table-container">
                <div className="align-center">
                    <h2 className="text-center">ORDER LIST</h2>
                    <div className = "col-8 col-sm-8 col-md-8 tabledata datatable-order">
                        <table className="table table-hover col-7">
                            <tbody>
                                <tr className="datatable">
                                    <th scope="col">ID</th>
                                    <th scope="col">Creation date</th>
                                    <th scope="col">Cust.name</th>
                                    <th scope="col">Cust.phone</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Action</th>
                                </tr>
                                { orders }
                            </tbody>
                        </table>

                    </div>
                </div>
                { this.state.order ?
                    <div className="align-center">
                        <h2 className="text-center">ORDER DETAIL</h2>
                        <div className="col-8 col-sm-8 col-md-8 tabledata datatable-order">
                        <table className="table table-hover col-7">
                            <tbody>
                                <tr className="datatable">
                                    <th scope="col">No.</th>
                                    <th scope="col">Prod.ID</th>
                                    <th scope="col">Prod.name</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Amount</th>
                                </tr>
                                { items }
                            </tbody>
                        </table>

                        </div>
                    </div>
                : <div />}
            </div>
        );
    }

    componentDidMount(){
        this.apiGetOrders();
    }

    // event - handlers
    trItemClick(item){
        this.setState({ order: item });
    }

    lnkApproveClick(id){
        this.apiPutOrderStatus(id, 'APPROVED');
    }
    
    lnkCancelClick(id){
        this.apiPutOrderStatus(id, 'CANCELED');
    }

    // apis
    apiGetOrders(){
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.get('/api/admin/orders', config).then((res) => {
            const result = res.data;
            this.setState({ orders: result });
        });
    }

    apiPutOrderStatus(id, status){
        const body = { status: status };
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.put('/api/admin/orders/status/' + id, body, config).then((res) => {
            const result = res.data;
            if(result){
                this.apiGetOrders();
            }else{
                alert('SORRY BABY!');
            }
        });
    }
}

export default Order;