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
        this.newProductsRef = React.createRef(); // Tạo một ref cho phần "Sản phẩm mới"
    }

    handleDiscoverClick = () => {
      // Cuộn xuống phần "Sản phẩm mới"
      if (this.newProductsRef.current) {
        this.newProductsRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    };

    render () {
        const newprods = this.state.newprods.map((item) => {
            return (
              <div key={item._id} className="col-md-3">
                <div className="custom-card">
                  <div className="card p-3">
                    <div className="text-center">
                      <Link to={'/product/' + item._id}>
                        <img src={"data:image/jpg;base64," + item.image} width="200px" height="250px" alt="" />
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
                        <img src={"data:image/jpg;base64," + item.image} width="200px" height="250px" alt="" />
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
        return (
          <div>
            <div className='hero-container'>
              <div className="container col-xxl-8 px-4 py-5">
                <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                  <div className="col-10 col-sm-8 col-lg-6">
                    {this.state.hotprods.length > 0 && (
                      <img src={"data:image/jpg;base64," + this.state.hotprods[0].image} className='item-picture-hot' width="300px" height="350px" loading="lazy" alt="hot-product-image"/>
                    )}
                  </div>
                  <div className="col-lg-6">
                    <h1 className="display-5 lh-1 mb-3">"Việc đọc sách rất quan trọng. Nếu bạn biết cách đọc sách, cả thế giới sẽ mở ra cho bạn."</h1>
                    <p className="lead">- Barack Obama</p>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                      <button type="button" className="btn btn-lg px-4 me-md-2" onClick={this.handleDiscoverClick}>Khám phá ngay</button>
                    </div>
                  </div>
                </div>
              </div>  
            </div>
            
            <div className='new-product-container'>
              <h2 ref={this.newProductsRef} className="header-product-name">Sản phẩm mới</h2>
              <div className="p-4 p-md-5 mb-4 text-white product-container-1">
                <div className="my-3 py-3">
                  <div className="text-center">
                    <div className="row justify-content-center g-3">{newprods}</div>
                  </div>
                </div>
              </div>
            </div>
    
            {this.state.hotprods.length > 0 ? (
              <>
                <h2 className="header-product-name">Sản phẩm bán chạy</h2>
                <div className="p-4 p-md-5 mb-4 text-white product-container-2">
                  <div className="my-3 py-3">
                    <div className="text-center">
                      <div className="row justify-content-center g-1">{hotprods}</div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
    <div />
  )}
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
