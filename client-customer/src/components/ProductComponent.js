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
              <div key={item._id} className="inline">
              <figure>
                <Link to={'/product/' + item._id} className='item-picture'>
                  <img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" />
                </Link>
                <figcaption className="text-center">
                  {item.name}
                </figcaption>
              </figure>
              <div className="product-details">
                <span className="font-weight-bold d-block">Price: {item.price}</span>
                <Link to={'/product/' + item._id}>
                  <button type="button" className="btn btn-dark">View Products</button>
                </Link>
              </div>
            </div>
              )}
            );
          
          return (
            <div class="p-4 p-md-5 mb-4 text-white rounded bg-dark">
              <div class="my-3 py-3">
                <div className="text-center">
                <h2 className="text-center text-mt">LIST PRODUCTS</h2>
                  <div className="row justify-content-center g-3">
                  {prods}
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