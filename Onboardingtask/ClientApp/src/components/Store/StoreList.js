
  
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Pagination, Dropdown } from "semantic-ui-react";
import NewStore from './NewStore';
import EditStore from './EditStore';
import DeleteStore from './DeleteStore';


export class StoreList extends Component {
    static displayName = StoreList.name; 

    state = {
        stores: [],
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
        const result = await fetch('https://localhost:44384/Stores/GetStore');
        const stores = await result.json();
        this.setState({ stores });
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
        const totalPages = this.state.stores.length / itemsPerPage;
        const items = this.state.stores.slice(
            (page - 1) * itemsPerPage,
            (page - 1) * itemsPerPage + itemsPerPage
        );
        return (
            <div className="listView" style={{"marginBottom":"44px" }}>
                <NewStore rerender={this.rerender}></NewStore>
                <table className="ui celled table">
                    <thead className="">
                        <tr className="">
                            <th className="">Name</th>
                            <th className="">Address</th>
                            <th className="">Actions</th>
                            <th className="">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {
                            items.map(store =>
                                <tr key={store.storeId} className="">
                                    <td className="">{store.name}</td>
                                    <td className="">{store.address}</td>
                                    <td className="">
                                        <EditStore rerender={this.rerender} store={{ storeId: store.storeId, name: store.name, address: store.address }}></EditStore>
                                    </td>
                                    <td className="">
                                        <DeleteStore rerender={this.rerender} storeId={store.storeId}></DeleteStore>
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



