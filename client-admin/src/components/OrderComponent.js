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
                        <div><span className="link action" onClick={() => this.lnkApproveClick(item._id)}>Chấp Nhận</span> || <span className="link action" onClick={() => this.lnkCancelClick(item._id)}>Hủy</span></div>
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
                    <h2 className="text-center">DANH SÁCH CÁC ĐƠN ĐẶT HÀNG</h2>
                    <div className = "col-8 col-sm-8 col-md-8 tabledata datatable-order">
                        <table className="table table-hover col-7">
                            <thead>
                                <tr className="datatable">
                                    <th scope="col">ID</th>
                                    <th scope="col">Ngày khởi tạo</th>
                                    <th scope="col">Tên khách hàng</th>
                                    <th scope="col">SĐT khách hàng</th>
                                    <th scope="col">Tổng</th>
                                    <th scope="col">Trạng thái</th>
                                    <th scope="col">Thao tác</th>
                                </tr>                           
                            </thead>
                            <tbody>
                                { orders }
                            </tbody>
                        </table>

                    </div>
                </div>
                { this.state.order ?
                    <div className="align-center">
                        <h2 className="text-center">Chi Tiết Đơn Đặt Hàng</h2>
                        <div className="col-8 col-sm-8 col-md-8 tabledata datatable-order">
                        <table className="table table-hover col-7">
                            <thead>
                                <tr className="datatable">
                                    <th scope="col">No.</th>
                                    <th scope="col">ID sản phẩm</th>
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
        this.apiGetOrders();
    }

    // event - handlers
    trItemClick(item){
        this.setState({ order: item });
    }

    lnkApproveClick(id){
        this.apiPutOrderStatus(id, 'Đã Chấp Nhận');
    }
    
    lnkCancelClick(id){
        this.apiPutOrderStatus(id, 'Đã Hủy');
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
                alert('Cập nhật trạng thái đơn hàng thành công.');
                this.apiGetOrders();
            }else{
                alert('Cập nhật trạng thái đơn hàng thất bại.');
            }
        });
    }
}

export default Order;