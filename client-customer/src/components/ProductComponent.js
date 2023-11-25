import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';

class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }

    render(){
        const prods = this.state.products.map((item) => {
            return (
              <div key={item._id} className="col-md-3">
                <div className="custom-card">
                  <div className="card p-3">
                    <div className="text-center">
                      <Link to={'/product/' + item._id}>
                      <img src={"data:image/jpg;base64," + item.image} alt="" className="img-fluid" style={{ width: '200px', height: '250px' }} />
                      </Link>
                    </div>
                    <div className="product-details">
                      <span className="font-weight-bold d-block">Giá: {item.price}</span>
                      <span>{item.name}</span>
                    </div>
                    <Link to={'/product/' + item._id}>
                      <button type="button" className="btn btn-dark">Chi tiết sản phẩm</button>
                    </Link>
                  </div>
                </div>
              </div>

              )}
            );
          
          return (
            <div className='new-product-container'>
              <h2 ref={this.newProductsRef} className="header-product-name">Sản Phẩm</h2>
              <div className="p-4 p-md-5 mb-4 text-white product-container-1">
                <div className="my-3 py-3">
                  <div className="text-center">
                    <div className="row justify-content-center g-3">{prods}</div>
                  </div>
                </div>
              </div>
            </div>
          );
              
    }

    componentDidMount(){ // first : / product /...
        const params = this.props.params;
        if(params.cid){
            this.apiGetProductsByCatID(params.cid);
        }else if(params.keyword){
            this.apiGetProductsByKeyword(params.keyword);
        }
    }

    componentDidUpdate(prevProps){ // changed : / product /...
        const params = this.props.params;
        if(params.cid && params.cid !== prevProps.params.cid){
            this.apiGetProductsByCatID(params.cid);
        }else if(params.keyword && params.keyword !== prevProps.params.keyword){
            this.apiGetProductsByKeyword(params.keyword);
        }    
    }

    // apis
    apiGetProductsByCatID(cid){
        axios.get('/api/customer/products/category/' + cid).then((res) => {
            const result = res.data;
            this.setState({ products: result });
        });
    }

    apiGetProductsByKeyword(keyword){
        axios.get('/api/customer/products/search/' + keyword).then((res) => {
            const result = res.data;
            this.setState({ products: result });
        });
    }
}

export default withRouter(Product);