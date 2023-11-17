import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';

class Menu extends Component {
    
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
                <li key={ item._id }><Link to={'/product/category/' + item._id} class="nav-link px-2 text-dark-blue" >{ item.name }</Link></li>
            );
        });

        return (
            <header class="p-3 menu-header">
                <div class="container">
                    <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><Link to='/' class="nav-link px-2 text-dark-blue">Home</Link></li>
                            { cates }
                        </ul>

                        <form class="d-flex">
                            <input class="form-control me-2" type="search" placeholder="Tìm kiếm" aria-label="Search" value=
                                { this.state.txtKeyword } onChange={(e) => { this.setState({ txtKeyword: e.target.value }) }} />
                            <button class="btn btn-outline-success btn-search" type="submit" onClick={(e) => this.btnSearchClick(e)}>Tìm Kiếm</button>
                        </form>
                    </div>
                </div>
            </header>
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