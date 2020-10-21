
  
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Pagination, Dropdown } from "semantic-ui-react";
import NewProd from './NewProd';
import EditProd from './EditProd';
import DeleteProd from './DeleteProd';


export class Product extends Component {
    static displayName = Product.name; 

    state = {
        products: [],
        page: 1,
        itemsPerPage: 10,
    };

    itemsPerPageOptions = [
        { text: '5', value: 5 },
        { text: '10', value: 10 },
        { text: '20', value: 20 }
    ]

    rerender = () => {
        this.componentDidMount()
    };

    async componentDidMount() {
        const result = await fetch('https://localhost:44384/Products/GetProduct');
        const products = await result.json();
        this.setState({ products });
    }

    setPageNum = (event, { activePage }) => {
        this.setState({ page: Math.ceil(activePage) });
    };

    handleChangeItemsPerPage = (e, { value }) => {
        this.setState({ itemsPerPage: value, page: 1 });
        this.rerender();
    }

    render() {
        const { page, itemsPerPage } = this.state;
        const totalPages = this.state.products.length / itemsPerPage;
        const items = this.state.products.slice(
            (page - 1) * itemsPerPage,
            (page - 1) * itemsPerPage + itemsPerPage
        );
        return (
            <div className="listView" style={{"marginBottom":"44px" }}>
                <NewProd rerender={this.rerender}></NewProd>
                <table className="ui celled table">
                    <thead className="">
                        <tr className="">
                            <th className="">Name</th>
                            <th className="">Price</th>
                            <th className="">Actions</th>
                            <th className="">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {
                            items.map(product =>
                                <tr key={product.productId} className="">
                                    <td className="">{product.name}</td>
                                    <td className="">{product.price}</td>
                                    <td className="">
                                        <EditProd rerender={this.rerender} product={{ productId: product.productId, name: product.name, price: product.price }}></EditProd>
                                    </td>
                                    <td className="">
                                        <DeleteProd rerender={this.rerender} productId={product.productId}></DeleteProd>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <Dropdown
                    placeholder=''
                    name="itemsPerPage"
                    onChange={this.handleChangeItemsPerPage}
                    selection
                    options={this.itemsPerPageOptions}
                    value={itemsPerPage}
                    style={{"minWidth":"65px"}}
                />
                <Pagination
                    activePage={page}
                    totalPages={totalPages}
                    siblingRange={1}
                    onPageChange={this.setPageNum}
                    floated='right'
                />
            </div>
        );
    }
};



