import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class ProductDetail extends Component{

    static contextType = MyContext ; // using this . context to access global state

    constructor(props){
        super(props);
        this.state = {
            categories: [],
            txtID: '',
            txtName: '',
            txtPrice: 0,
            cmbCategory: '',
            imgProduct: '',
        };
    }

    render(){
        const cates = this.state.categories.map((cate) => {
            if(this.props.item != null){
                return(<option className="categories" key={ cate._id } value={ cate._id } selected={ cate._id === this.props.item.category._id } >{ cate.name }</option>);
            } else {
                return(<option key={ cate._id } value={ cate._id } >{ cate.name } </option>);
            }
        });
        return (
            <div className ="float-right">
                <h2 className="text-center">Chi Tiết Sản Phẩm</h2>
                <form className='form-container'>
                    <div class="mb-3 row">
                        <label for="staticID" class="col-sm-2 col-form-label">ID</label>
                        <div class="col-sm-10">
                            <input type="text" readonly='true' class="form-control-plaintext" id="staticID" value={ this.state.txtID } onChange={(e) => { this.setState({ txtID: e.target.value }) }}/>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="inputName" class="col-sm-2 col-form-label">Sản phẩm</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputName" value={ this.state.txtName } onChange={(e) => { this.setState({ txtName: e.target.value }) }} />
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="inputName" class="col-sm-2 col-form-label">Giá</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputCost" value={ this.state.txtPrice } onChange={(e) => { this.setState({ txtPrice: e.target.value }) }} />
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="inputName" class="col-sm-2 col-form-label">Hình ảnh</label>
                        <div class="col-sm-10">
                            <input type="file" name="fileImage" accept="image/jpeg,image/png,image/gif" onChange={(e) => this.previewImage(e) } />
                        </div>
                    </div>
                    <select class="form-select" aria-label="Default select example" onChange={(e) => { this.setState({ cmbCategory: e.target.value }) }}>
                        <option selected>Thể loại</option>
                        { cates }
                    </select>
                    <div class="mb-3 row mt-3">
                        <label for="inputName" class="col-sm-2 col-form-label">Xem trước</label>
                        <div class="col-sm-10">
                            <img src={ this.state.imgProduct } width="300px" height="300px" alt="" />
                        </div>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <button type="submit" id="btn_add" class="btn btn-primary m-2 table-button" onClick={(e) => this.btnAddClick(e)}>Thêm Mới</button>
                        <button type="submit" id="btn_update" class="btn btn-primary m-2 table-button" onClick={(e) => this.btnUpdateClick(e)}>Cập Nhật</button>
                        <button type="submit" id="btn_delete" class="btn btn-primary m-2 table-button" onClick={(e) => this.btnDeleteClick(e)}>Xóa</button>
                    </div>
                </form>
            </div>
        ) ;
    }

    componentDidMount(){
        this.apiGetCategories();
    }

    componentDidUpdate(prevProps){
        if(this.props.item !== prevProps.item){
            this.setState({
                txtID: this.props.item._id,
                txtName: this.props.item.name,
                txtPrice: this.props.item.price,
                cmbCategory: this.props.item.category._id,
                imgProduct: 'data:image/jpg;base64,' + this.props.item.image
            }) ;
        }
    }

    // event-handlers
    previewImage(e){
        const file = e.target.files[0];
        if(file){
            const reader = new FileReader();
            reader.onload = (evt) => {
                this.setState({ imgProduct: evt.target.result });
            }
            reader.readAsDataURL(file);
        }
    }

    btnAddClick(e){
        e.preventDefault();
        const name = this.state.txtName;
        const price = parseInt(this.state.txtPrice);
        const category = this.state.cmbCategory;
        const image = this.state.imgProduct.replace(/^data:image\/[a-z]+;base64,/, ''); // remove "data:image /...;base64 ,"
        if(name && price && category && image){
            const prod = { name: name, price: price, category: category, image: image };
            this.apiPostProduct(prod);
        } else {
            alert('Vui lòng nhập đủ các trường dữ liệu: tên, giá, thể loại và hình ảnh!');
        }
    }
        
    btnUpdateClick(e){
        e.preventDefault();
        const id = this.state.txtID;
        const name = this.state.txtName;
        const price = parseInt(this.state.txtPrice);
        const category = this.state.cmbCategory;
        const image = this.state.imgProduct.replace(/^data:image\/[a-z]+;base64,/, ''); // remove "data : image /...; base64 ,"
        
        if(id && name && price && category && image){
            const prod = { name: name, price: price, category: category, image: image };
            this.apiPutProduct(id, prod);
        } else {
            alert('Vui lòng nhập đủ các trường dữ liệu: id, tên, giá, thể loại và hình ảnh!');
        }
    }

    btnDeleteClick(e){
        e.preventDefault();
        if(window.confirm('Bạn có chắc muốn xóa sản phẩm này')){
            const id = this.state.txtID;
            if(id){
                this.apiDeleteProduct(id);
            } else {
                alert('Vui lòng nhập id!');
            }
        }
    }

    // apis
    apiGetCategories(){
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.get('/api/admin/categories', config).then((res) => {
            const result = res.data;
            this.setState({ categories: result });
        });
    }

    apiPostProduct(prod){
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.post('/api/admin/products', prod, config).then((res) => {
            const result = res.data;
            if(result){
                alert('Thêm Thành Công');
                this.apiGetProducts();
            }else{
                alert('Thêm Không Thành Công. Vui lòng kiểm tra lại thông tin');
            }
        });
    }
    
    apiGetProducts(){
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.get('/api/admin/products?page=' + this.props.curPage, config).then((res) => {
            const result = res.data;
            this.props.updateProducts(result.products, result.noPages);

            if(result.products.length !== 0){
                this.props.updateProducts(result.products, result.noPages);
            } else {
                axios.get('/api/admin/products?page=' + (this.props.curPage - 1), config).then((res) => {
                    const result = res.data;
                    this.props.updateProducts(result.products, result.noPages);
                }) ;
            }
        });
    }
    
    apiPutProduct(id, prod){
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.put('/api/admin/products/' + id, prod, config).then((res) => {
            const result = res.data;

            if(result){
                alert('Cập Nhật Thành Công');
                this.apiGetProducts();
            }else{
                alert('Cập Nhật Không Thành Công. Vui lòng kiểm tra lại thông tin');
            }
        });
    }

    apiDeleteProduct(id){
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.delete('/api/admin/products/' + id, config).then((res) => {
            const result = res.data;
            if(result){
                alert('Xóa Thành Công!');
                this.apiGetProducts();
            } else {
                alert('Xóa Không Thành Công. Vui lòng kiểm tra lại thông tin');
            }
        });
    }
}

export default ProductDetail;