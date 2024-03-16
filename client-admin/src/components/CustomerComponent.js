import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import {Helmet} from "react-helmet";
class Customer extends Component {

    static contextType = MyContext ; // using this . context to access global state

    constructor(props){
        super(props);
        this.state = {
            customers: [],
            orders: [],
            order: null
        };
    }
 
    render(){
        const customers = this.state.customers.map((item) => {
            return(
                <tr key={ item._id } className="datatable" onClick={() => this.trCustomerClick(item) } >
                    <td>{ item._id }</td>
                    <td>{ item.username }</td>
                    <td>{ item.password }</td>
                    <td>{ item.name }</td>
                    <td>{ item.phone }</td>
                    <td>{ item.email }</td>
                    <td>{ item.active }</td>
                    <td>
                        { item.active === 0 ?
                            <span className="link" onClick={() => this.lnkEmailClick(item)}>EMAIL</span>
                            :
                            <span className="link" onClick={() => this.lnkDeactiveClick(item)}>HỦY KÍCH HOẠT</span>}
                    </td>
                </tr>
            );
        });
        const orders = this.state.orders.map((item) => {
            return(
                <tr key={ item._id } className="datatable" onClick={() => this.trOrderClick(item) } >
                    <td>{ item._id }</td>
                    <td>{ new Date(item.cdate).toLocaleString() }</td>
                    <td>{ item.customer.name }</td>
                    <td>{ item.customer.phone }</td>
                    <td>{ item.total }</td>
                    <td>{ item.status }</td>
                </tr>
            );
        });
        if(this.state.order){
            var items = this.state.order.items.map((item, index) => {
                return(
                    <tr key={ item.product._id } className="datatable">
                        <td>{ index + 1 }</td>
                        <td>{ item.product._id }</td>
                        <td>{ item.product.name }</td>
                        <td><img src={"data:image/jpg;base64," + item.product.image} width="70px" height="70px" alt="" /></td>
                        <td>{ item.product.price }</td>
                        <td>{ item.quantity }</td>
                        <td>{ item.product.price * item.quantity }</td>
                    </tr>
                );
            });
        }
        return (
            <div class ="table-container">
                <div className="align-center">
                    <Helmet>
                        <meta charSet="utf-8" />
                        <title>Quản Lý Khách Hàng</title>
                    </Helmet>
                    <h2 className="text-center">DANH SÁCH KHÁCH HÀNG</h2>
                    <div className = "col-8 col-sm-8 col-md-8 tabledata datatable-order">
                        <table className="table table-hover col-7">
                            <thead>
                                <tr className="datatable">
                                    <th scope="col">ID</th>
                                    <th scope="col">Tên người dùng</th>
                                    <th scope="col">Mật khẩu</th>
                                    <th scope="col">Tên</th>
                                    <th scope="col">Điện thoại</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Kích hoạt</th>
                                    <th scope="col">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                { customers }
                            </tbody>
                        </table>
                    </div>
                </div>
                { this.state.orders.length > 0 ?
                    <div className="align-center">
                        <h2 className="text-center">Danh Sách Đơn Đặt Hàng</h2>
                        <div className = "col-8 col-sm-8 col-md-8 tabledata datatable-order">
                        <table className="table table-hover col-7">
                            <thead>
                                <tr className ="datatable">
                                    <th scope="col">ID</th>
                                    <th scope="col">Ngày khởi tạo</th>
                                    <th scope="col">Tên khách hàng</th>
                                    <th scope="col">SĐT khách hàng</th>
                                    <th scope="col">Tổng</th>
                                    <th scope="col">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                { orders }
                            </tbody>
                        </table>
                      </div>
                    </div>
                : <div />}
                { this.state.order ?
                    <div className="align-center">
                        <h2 className="text-center">Chi Tiết Đơn Đặt Hàng</h2>
                        <div className = "col-8 col-sm-8 col-md-8 tabledata datatable-order">
                            <table className="table table-hover col-7">
                                <thead>
                                    <tr className="datatable">
                                        <th scope="col">No.</th>
                                        <th scope="col">Prod.ID</th>
                                        <th scope="col">Tên sản phẩm</th>
                                        <th scope="col">Hình ảnh</th>
                                        <th scope="col">Giá</th>
                                        <th scope="col">Số lượng</th>
                                        <th scope="col">Tổng</th>
                                    </tr>
                                </thead>
                                <tbody>
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
        this.apiGetCustomers();
    }

    // event - handlers
    trCustomerClick(item){
        this.setState({ orders: [], order: null });
        this.apiGetOrdersByCustID(item._id);
    }

    trOrderClick(item){
        this.setState({ order: item });
    }

    lnkDeactiveClick(item){
        this.apiPutCustomerDeactive(item._id, item.token);
    }

    lnkEmailClick(item){
        this.apiGetCustomerSendmail(item._id);
    }

    // apis
    apiGetCustomers(){
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.get('/api/admin/customers', config).then((res) => {
            const result = res.data;
            this.setState({ customers: result });
        });
    }

    apiGetOrdersByCustID(cid){
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.get('/api/admin/orders/customer/' + cid, config).then((res) => {
            const result = res.data;
            this.setState({ orders: result });
        });
    }

    apiPutCustomerDeactive(id, token){
        const body = { token: token };
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.put('/api/admin/customers/deactive/' + id, body, config).then((res) => {
            const result = res.data;
            if(result){
                this.apiGetCustomers();
            }else{
                alert('Hủy kích hoạt tài khoản thất bại.');
            }
        });
    }

    apiGetCustomerSendmail(id){
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.get('/api/admin/customers/sendmail/' + id, config).then((res) => {
            const result = res.data;
            alert(result.message);
        });
    }
}

export default Customer;
