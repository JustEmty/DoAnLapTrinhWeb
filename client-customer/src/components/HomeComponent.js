import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
            return(
                <div key={ item._id } className="inline">
                    <figure>
                        <Link to={'/product/' + item._id} className='item-picture-new'><img src={"data:image/jpg;base64," + item.image } width="300px" height="300px" alt="" /></Link>
                        <figcaption className="text-name-new">{ item.name }<br/>Price: { item.price }</figcaption>
                    </figure>
                </div>
            );
        });
        const hotprods = this.state.hotprods.map((item) => {
            return(
                <div key={ item._id } className="inline">
                    <figure>
                    <Link to={'/product/' + item._id} className='item-picture-hot'><img src={"data:image/jpg;base64," + item.image } width="300px" height="300px" alt="" /></Link>
                    <figcaption className="text-name-hot">{ item.name }<br/>Price: { item.price }</figcaption>
                    </figure>
                </div>
            );
        });
        return(
            <div>
                <main class="container">
                    <div class="p-4 p-md-5 mb-4 rounded text-body-emphasis contain-main">
                        <div class="row mb-2 row-main">
                            <div class="col-md-6 column-first">
                                <p className='heading-1'>"Việc đọc rất quan trọng. Nếu bạn biết cách đọc, cả thế giới sẽ mở ra cho bạn"</p>
                                <p className='obama'>- Barack Obama</p>
                            </div>

                            <div class="col-md-6">
                                <img src="./assets/image/pic-1.jpg" class="img-thumbnail" alt="..."/>
                            </div>
                            
                            <div class="d-flex justify-content-evenly">
                                <button type="button" class="discover-button">Khám phá ngay</button>
                            </div> 
                        </div>
                    </div>
                </main>

                
                <div className="align-center">
                    <h2 className="text-center">Sản phẩm mới</h2>
                </div>

                <main class="container-fluid ">
                    <div class="p-4 p-md-5 mb-4 rounded text-body-emphasis justify-content-evenly contain-main-new">
                        {newprods}
                    </div>
                </main>

                {this.state.hotprods.length> 0 ?
                <div>
                    <div className="align-center">
                        <h2 className="text-center">Sản phẩm bán chạy</h2>
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
