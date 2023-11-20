import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CategoryDetail from './CategoryDetailComponent';

class Category extends Component {
    
    static contextType = MyContext; // using this . context to access global state
    
    constructor(props){
        super(props);
        this.state = {
            categories: [],
            itemSelected : null
        };
    }
    
    render(){
        const cates = this.state.categories.map((item) => {
            return (
                <tr key ={ item._id } className="datatable" onClick={() => this.trItemClick(item)}>
                    <td scope="row">{ item._id }</td>
                    <td>{ item.name }</td>
                </tr>
            );
        });
        return (
            <div class="row table-container">
                <h2 className="text-center">CATEGORY LIST</h2>
                <div class="col-8 col-sm-8 col-md-8 tabledata">
                    <table class="table table-hover col-7">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            { cates }
                        </tbody>
                    </table>
                </div>
                <div class="col-6 col-md-4 tabledata-detail">
                    <CategoryDetail item={ this.state.itemSelected } updateCategories={ this.updateCategories } />
                </div>
            </div>
        );    
    }

    updateCategories = (categories) => { // arrow-function
        this.setState({ categories: categories });
    }
 
    componentDidMount(){
        this.apiGetCategories();
    }

    //event - handlers
    trItemClick(item){
        this.setState({ itemSelected: item });
    }

    //apis
    apiGetCategories(){
        const config = { headers : { 'x-access-token': this.context.token } };
        axios.get('/api/admin/categories', config).then((res) => {
            const result = res.data;
            this.setState({ categories: result });
        });
    }
}

export default Category;