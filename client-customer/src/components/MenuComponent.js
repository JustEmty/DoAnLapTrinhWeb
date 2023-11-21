import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';
import logo from '../assets/Logo.jpg';

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
                <nav className="navbar sticky-top navbar-expand-lg nav-menu">
                    <div className="container-fluid">
                        <Link to='/home' className="navbar-brand"><img className='nav-logo' src={logo} alt='logo'/></Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarScroll">
                            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll nav-client-customer">
                                <li className="nav-item">
                                    <Link to='/home' className="nav-link padding-nav" aria-current="page">Trang chủ</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link padding-nav dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Thể loại</Link>
                                    <ul className="dropdown-menu bg-warning" aria-labelledby="navbarScrollingDropdown">
                                        { cates }
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <Link to='/mycart' className="nav-link padding-nav">Giỏ hàng ({this.context.mycart.length})</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link padding-nav" href='#'>Liên hệ</Link>
                                </li>
                            </ul>
                            <form className="d-flex container-search">
                                <input className="form-control me-2 form-search" type="search" placeholder="Tìm kiếm" aria-label="Search" value ={this.state.txtKeyword} onChange={(e) => { this.setState({ txtKeyword: e.target.value }) }} />
                                <button className="btn-search" type="button" value ="SEARCH" onClick={(e) => this.btnSearchClick(e) } >Tìm kiếm</button>
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
