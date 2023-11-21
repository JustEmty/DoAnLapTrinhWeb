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
                      <img src={"data:image/jpg;base64," + item.image} alt="" className="img-fluid" style={{ width: '200px', height: '250px' }} />
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
                  <img src={"data:image/jpg;base64," + item.image} alt="" className="img-fluid" style={{ width: '200px', height: '250px' }} />
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
            <main className="container-fluid">
              <div className="p-4 p-md-5 mb-4 rounded text-body-emphasis justify-content-evenly contain-main">
                <div className="header">
                  <div className="sub-intro">
                    <p>"Việc đọc sách rất quan trọng. Nếu bạn biết cách đọc sách, cả thế giới sẽ mở ra cho bạn."</p>
                    <p className="name-sub">- Barack Obama</p>
                  </div>
                  <div className="img-intro">
                    {this.state.hotprods.length > 0 && (
                      <img
                        src={"data:image/jpg;base64," + this.state.hotprods[0].image} alt="" className="img-fluid" style={{ width: '300px', height: '350px' }}
                      />
                    )}
                  </div>
                </div>
                <div className="btn-header">
                  <button onClick={this.handleDiscoverClick}>Khám phá ngay</button>
                </div>
              </div>
            </main>
    
            <h2 ref={this.newProductsRef} className="text-left">Sản phẩm mới</h2>
            <div className="p-4 p-md-5 mb-4 text-white rounded bg-dark">
              <div className="my-3 py-3">
                <div className="text-center">
                  <div className="row justify-content-center g-3">{newprods}</div>
                </div>
              </div>
            </div>
    
            {this.state.hotprods.length > 0 ? (
              <>
                <h2 className="text-left">Sản phẩm bán chạy</h2>
                <div className="p-4 p-md-5 mb-4 text-white rounded bg-dark">
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
