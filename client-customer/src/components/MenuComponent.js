import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';

class Menu extends Component {
    
    static contextType = MyContext; // using this . context to access global state

    constructor(props){
        super(props);
        this.state = {
            categories: [],
            txtKeyword : ''
        };  
    }

    render(){
        const cates = this.state.categories.map((item) => {
            return(
                <li key={ item._id }><Link to={'/product/category/' + item._id} class="nav-link active item-dropdown">{ item.name }</Link></li>
            );
        });

        return (
            <nav class="navbar sticky-top navbar-expand-lg bg-warning nav-menu">
                <div class="container-fluid">
                    <Link to='/' class="navbar-brand">BookStore</Link>
                    <button class="navbar-toggler bg-warning" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarScroll">
                        <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll nav-client-customer">
                            <li class="nav-item">
                                <Link to='/' class="nav-link active" aria-current="page">Trang chủ</Link>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link active dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Thể loại
                                </a>
                                <ul class="dropdown-menu bg-warning" aria-labelledby="navbarScrollingDropdown">
                                    { cates }
                                </ul>
                            </li>
                            <li class="nav-item">
                                <Link to='/mycart' class="nav-link active">Giỏ hàng ({this.context.mycart.length})</Link>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" href='#'>Liên hệ</a>
                            </li>
                        </ul>
                        <form class="d-flex">
                            <input class="form-control me-2 form-search" type="search" placeholder="Tìm kiếm" aria-label="Search" value ={this.state.
                                txtKeyword} onChange={(e) => { this.setState({ txtKeyword: e.target.value }) }} />
                            <button class="btn btn-outline-success" type="submit" value ="SEARCH" onClick={(e) => this.btnSearchClick(e) } >Tìm kiếm</button>
                        </form>
                    </div>
                </div>
            </nav>
        )
    }
    
    componentDidMount(){
        this.apiGetCategories();
    }
    
    // event - handlers
    btnSearchClick(e){
        e.preventDefault();
        this.props.navigate('/product/search/' + this.state.txtKeyword);
    }

    // apis
    apiGetCategories(){
        axios.get('/api/customer/categories').then((res) => {
            const result = res.data;
            this.setState({ categories: result });
        });
    }
}

export default withRouter(Menu);