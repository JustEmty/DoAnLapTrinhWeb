import axios from 'axios';
import React, { Component } from 'react';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';
import "../ProductDetail.css"
class ProductDetail extends Component {

    static contextType = MyContext; // using this . context to access global state

    constructor(props){
        super(props);
        this.state = {
            product: null,
            txtQuantity: 1
        };
    }

    render () {
        const prod = this.state.product;
        if(prod != null){
            return(
                <section style={{ backgroundColor: '#EAEDFF' }}>
                    <div className="container py-5">
                    <div className="row justify-content-center mb-3">
                      <div className="col-md-12 col-xl-10">
                        <div className="card shadow-0 border rounded-3">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                                <div className="bg-image hover-zoom ripple rounded ripple-surface">
                                <img src={"data:image/jpg;base64," + prod.image} className="w-100" alt="" width="100px" height="250px" />
                                  <a href="#!">
                                    <div className="hover-overlay">
                                      <div className="mask" style={{ backgroundColor: 'rgba(253, 253, 253, 0.15)' }}></div>
                                    </div>
                                  </a>
                                    </div>
                                        </div>
                                            <div className="col-md-6 col-lg-6 col-xl-6">
                                                <tr>
                                                    <td align="right">ID:</td>
                                                    <td>{ prod._id }</td>
                                                </tr>
                                                <tr>
                                                    <td align="right">Tên sản phẩm:</td>
                                                    <td>{ prod.name }</td>
                                                </tr>
                                                <tr>
                                                    <td align="right">Giá:</td>
                                                    <td>{ prod.price }</td>
                                                </tr>
                                                <tr>
                                                    <td align="right">Thể loại:</td>
                                                    <td>{ prod.category.name }</td>
                                                </tr>
                                                <tr>
                                                    <td align="right">Số lượng:</td>
                                                    <td><input type="number" min="1" max="99" value={ this.state.txtQuantity } onChange={(e) => { this.setState({ txtQuantity: e.target.value }) }} /></td>
                                                </tr>
                                            </div>
                                            <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                                                <div className="d-flex flex-row align-items-center mb-1">
                                                    <h4 className="mb-1 me-1">Tổng tiền: {prod.price*this.state.txtQuantity}</h4>
                                                    <span className="text-danger"><s>{/* Add your original price here */}</s></span>
                                                </div>
                                                <div className="d-flex flex-column mt-4">
                                                  <button className="btn btn-primary btn-sm" type="button" onClick={(e) => this.btnAdd2CartClick(e)}>Thêm giỏ hàng</button>
                                                  {/* Add your "Add to wishlist" button here */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            );
        }
        return(<div />);
    }

    componentDidMount(){
        const params = this.props.params;
        this.apiGetProduct(params.id);
    }

    // event - handlers
    btnAdd2CartClick(e){
        e.preventDefault();
        const product = this.state.product;
        const quantity = parseInt(this.state.txtQuantity);
        if(quantity){
            const mycart = this.context.mycart;
            const index = mycart.findIndex(x => x.product._id === product._id); // check if the _id exists in mycart
            if(index === -1) { // not found , push newItem
                const newItem = { product: product, quantity: quantity };
                mycart.push(newItem);
            } else { // increasing the quantity
                mycart[index].quantity += quantity;
            }
            this.context.setMycart(mycart);
            alert('Thêm giỏ hàng thành công');
        } else {
            alert('Vui lòng nhập số lượng');
        }
    }

    // apis
    apiGetProduct(id){
        axios.get('/api/customer/products/' + id).then((res) => {
            const result = res.data;
            this.setState({ product: result });
        });
    }
}

export default withRouter(ProductDetail);