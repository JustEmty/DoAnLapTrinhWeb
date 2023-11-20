import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../home.css"
class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
        newprods: [],
        hotprods: []
        };
    }

    render () {
        const newprods = this.state.newprods.map((item) => {
            return (
              <div key={item._id} className="col-md-3">
                <div className="custom-card">
                  <div className="card p-3">
                    <div className="text-center">
                      <Link to={'/product/' + item._id}>
                        <img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" />
                      </Link>
                    </div>
                    <div className="product-details">
                      <span className="font-weight-bold d-block">Price: {item.price}</span>
                      <span>{item.name}</span>
                    </div>
                    <Link to={'/product/' + item._id}>
                      <button type="button" className="btn btn-dark">View Products</button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          });
          
        const hotprods = this.state.hotprods.map((item) => {
            return(
                <div key={item._id} className="col-md-3">
              <div className="card p-3">
                <div className="text-center">
                  <Link to={'/product/' + item._id}>
                    <img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" />
                  </Link>
                </div>
                <div className="product-details">
                  <span className="font-weight-bold d-block">Price: {item.price}</span>
                  <span>{item.name}</span>
                </div>
                    <Link to={'/product/' + item._id}>
                        <button type="button" class="btn btn-dark">View Products</button>
                    </Link>
              </div>
            </div>
            );
        });
        return(
            <div>
            <h2 className="text-left">LIST PRODUCTS</h2>
            <div class="p-4 p-md-5 mb-4 text-white rounded bg-dark">
              <div class="my-3 py-3">
                <div className="text-center">
                  <div className="row justify-content-center g-3">
                    {newprods}
                  </div>
                </div>
              </div>
            </div>
            
            <br></br>
            <h2 className="text-left">LIST PRODUCTS</h2>
                {this.state.hotprods.length> 0 ?              
                    <div class="p-4 p-md-5 mb-4 text-white rounded bg-dark">
                        <div class="my-3 py-3">
                            <div className="text-center">                                
                                <div className="row justify-content-center g-1">
                                    {hotprods}
                                </div>
                            </div>
                        </div>
                    </div>

                    <main class="container-fluid ">
                        <div class="p-4 p-md-5 mb-4 rounded text-body-emphasis justify-content-evenly contain-main">
                            {hotprods}
                        </div>
                    </main>
                </div>
                : <div />}
            </div>  
        );
    }

    componentDidMount(){
        this.apiGetNewProducts();
        this.apiGetHotProducts();
    }

    // apis
    apiGetNewProducts(){
        axios.get('/api/customer/products/new').then((res) => {
            const result = res.data;
            this.setState({ newprods: result });
        });
    }

    apiGetHotProducts(){
        axios.get('/api/customer/products/hot').then((res) => {
            const result = res.data;
            this.setState({ hotprods: result });
        });
    }
}

export default Home;
