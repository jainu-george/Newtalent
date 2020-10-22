
  
import React, { Component } from 'react';

import { Pagination, Dropdown } from "semantic-ui-react";
import NewCustModal from './NewCustModal';
import EditCustModal from './EditCustModal';
import DeleteCustModal from './DeleteCustModal';


export class CustomerList extends Component {
    static displayName = CustomerList.name; 

    state = {
        customers: [],
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
        const result = await fetch('/Customers/GetCustomer');
        const customers = await result.json();
        this.setState({ customers });
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
        const totalPages = this.state.customers.length / itemsPerPage;
        const items = this.state.customers.slice(
            (page - 1) * itemsPerPage,
            (page - 1) * itemsPerPage + itemsPerPage
        );
        return (
            <div className="listView" style={{"marginBottom":"44px" }}>
                <NewCustModal rerender={this.rerender}></NewCustModal>
                <table  className="ui celled table">
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
                            items.map(customer =>
                                <tr key={customer.customerId} className="">
                                    <td className="">{customer.name}</td>
                                    <td className="">{customer.address}</td>
                                    <td className="">
                                        <EditCustModal rerender={this.rerender} customer={{ customerId: customer.customerId, name: customer.name, address: customer.address }}></EditCustModal>
                                    </td>
                                    <td className="">
                                        <DeleteCustModal rerender={this.rerender} customerId={customer.customerId}></DeleteCustModal>
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



