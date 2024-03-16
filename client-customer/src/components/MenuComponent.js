import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';
import logo from '../assets/Logo.jpg';
import "../MenuComponent.css";
import {Helmet} from "react-helmet";
class Menu extends Component {
    
    static contextType = MyContext; // using this . context to access global state

    constructor(props){
        super(props);
        this.state = {
            categories: [],
            txtKeyword: '',
            selectedCategoryTitle: '' // Thêm state để lưu trữ tiêu đề của thể loại được chọn
        };  
    }

    handleDropdownItemClick = (categoryName) => {
        this.setState({ selectedCategoryTitle: categoryName });
    }

    render(){
        const cates = this.state.categories.map((item) => (
            <li key={item._id}>
                <Link 
                    to={'/product/category/' + item._id} 
                    className="nav-link active item-dropdown"
                    onClick={() => this.handleDropdownItemClick(item.name)} // Gọi hàm handleDropdownItemClick khi một phần tử được nhấn
                >
                    {item.name}
                </Link>
            </li>
        ));

        return (
            <nav className="navbar sticky-top navbar-expand-lg nav-menu">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Thể loại - {this.state.selectedCategoryTitle}</title> {/* Sử dụng selectedCategoryTitle trong tiêu đề */}
                </Helmet>
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
                            <li className="nav-item dropdown" onMouseOver={() => this.handleDropdownHover(true)} onMouseLeave={() => this.handleDropdownHover(false)}>
                                <Link className="nav-link padding-nav dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Thể loại</Link>
                                <ul className={`dropdown-menu bg-warning ${this.state.isDropdownHovered ? 'show' : ''}`} aria-labelledby="navbarScrollingDropdown">
                                    {cates}
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
                            <input className="form-control me-2 form-search" type="search" placeholder="Tìm kiếm" aria-label="Search" value={this.state.txtKeyword} onChange={(e) => {this.setState({ txtKeyword: e.target.value });}}/>
                            <button className="btn-search" type="submit" onClick={(e) => this.handleSearchClick(e)}>Tìm kiếm</button>
                        </form>
                    </div>
                </div>
            </nav>
        )
    }

    handleSearchClick(e) {
        e.preventDefault();
        if (this.state.txtKeyword.trim() === '') {
          // Hiển thị thông báo khi trường tìm kiếm trống
          alert('Vui lòng nhập từ khóa tìm kiếm!');
        } else {
          this.props.navigate('/product/search/' + this.state.txtKeyword);
        }
      }
    componentDidMount(){
        this.apiGetCategories();
    }
    
    // event - handlers
    btnSearchClick(e){
        e.preventDefault();
        this.props.navigate('/product/search/' + this.state.txtKeyword);
    }
    handleDropdownHover(isHovered) {
        this.setState({ isDropdownHovered: isHovered });
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
