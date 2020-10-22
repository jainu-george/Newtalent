import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Pagination, Dropdown } from "semantic-ui-react";
import NewSale from "./NewSale";
import EditSale from "./Editdsale";
import DeleteSale from "./DeleteSale";

export class Sale extends Component {
  static displayName = Sale.name;

  state = {
    sales: [],
    page: 1,
    itemsPerPage: 10,
  };

  itemsPerPageOptions = [
    { text: "5", value: 5 },
    { text: "10", value: 10 },
    { text: "20", value: 20 },
  ];

  rerender = () => {
    this.componentDidMount();
  };

  async componentDidMount() {
    const result = await fetch("/Sales/GetSales");
    const sales = await result.json();
    this.setState({ sales });
  }

  setPageNum = (event, { activePage }) => {
    this.setState({ page: Math.ceil(activePage) });
  };

  handleChangeItemsPerPage = (e, { value }) => {
    this.setState({ itemsPerPage: value, page: 1 });
    this.rerender();
  };

  render() {
    const { page, itemsPerPage } = this.state;
    const totalPages = this.state.sales.length / itemsPerPage;
    const items = this.state.sales.slice(
      (page - 1) * itemsPerPage,
      (page - 1) * itemsPerPage + itemsPerPage
    );
    var month = new Array();
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";
    return (
      <div className="listView" style={{ marginBottom: "44px" }}>
        <NewSale rerender={this.rerender}></NewSale>
        <table className="ui celled table">
          <thead className="">
            <tr className="">
              <th className="">Customer</th>
              <th className="">Product</th>
              <th className="">Store</th>
              <th className="">Date Sold</th>
              <th className="">Actions</th>
              <th className="">Actions</th>
            </tr>
          </thead>
          <tbody className="">
            {items.map((sale) => {
              const dateTemp = new Date(sale.dateSold);
              const n = month[dateTemp.getMonth()];
              // const date = (dateTemp.getMonth() + 1) + '/' + dateTemp.getDate() + '/' + dateTemp.getFullYear();
              const date =
                dateTemp.getDate() + " " + n + " " + dateTemp.getFullYear();
              return (
                <tr key={sale.salesId} className="">
                  <td className="">{sale.customer.name}</td>
                  <td className="">{sale.product.name}</td>
                  <td className="">{sale.store.name}</td>
                  <td className="">{date}</td>
                  <td className="">
                    <EditSale
                      rerender={this.rerender}
                      sale={{
                        salesId: sale.salesId,
                        dateSold: sale.dateSold,
                        customerId: sale.customerId,
                        productId: sale.productId,
                        storeId: sale.storeId,
                      }}
                    ></EditSale>
                  </td>
                  <td className="">
                    <DeleteSale
                      rerender={this.rerender}
                      salesId={sale.salesId}
                    ></DeleteSale>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Dropdown
          placeholder=""
          name="itemsPerPage"
          onChange={this.handleChangeItemsPerPage}
          selection
          options={this.itemsPerPageOptions}
          value={itemsPerPage}
          style={{ minWidth: "65px" }}
        />
        <Pagination
          activePage={page}
          totalPages={totalPages}
          siblingRange={1}
          onPageChange={this.setPageNum}
          floated="right"
        />
      </div>
    );
  }
}
