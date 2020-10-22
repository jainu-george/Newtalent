import React, { Component } from 'react';
import { Button, Icon, Modal, Form, Input } from 'semantic-ui-react';
import { withRouter } from "react-router-dom";



export default class EditSale extends Component {
    static displayName = EditSale.name; 
  dateTemp = new Date(this.props.sale.dateSold);
  monthTemp = (this.dateTemp.getMonth() + 1) < 10 ? '0'+ (this.dateTemp.getMonth() + 1) : (this.dateTemp.getMonth() + 1);
  day = this.dateTemp.getDate() < 10 ? "0" + this.dateTemp.getDate() : this.dateTemp.getDate();
  date =  this.dateTemp.getFullYear() + '-' + this.monthTemp + '-' + this.day;
  customerSelect2 = [];
  productSelect2 = [];
  storeSelect2 = [];


  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    dateSold: this.date,
    customerId: this.props.sale.customerId,
    productId: this.props.sale.productId,
    storeId: this.props.sale.storeId,
    modalOpen: false,
    loading: false
  }

  async componentDidMount() {
    const result = await fetch('/Customers/GetCustomer');
    var customerSelect = await result.json();
    this.customerSelect2 = customerSelect.map((customer) => {
      return { "text": customer.name, "value": customer.customerId }
    });

    const result2 = await fetch('/Products/GetProduct');
    var productSelect = await result2.json();
    this.productSelect2 = productSelect.map((prod) => {
      return { "text": prod.name, "value": prod.productId }
    });

    const result3 = await fetch('/Stores/GetStore');
    var storeSelect = await result3.json();
    this.storeSelect2 = storeSelect.map((store) => {
      return { "text": store.name, "value": store.storeId }
    });
  }

  handleChange = (e, { name, value }) =>
    this.setState({ [name]: value })

  handleSubmit = (e) => {
    const that = this;
    const { dateSold, customerId, productId, storeId } = this.state;
    const salesId = this.props.sale.salesId;
    this.setState({ loading: true });

    const result = fetch('/Sales/PutSales/' + salesId, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "salesId": salesId,
        "productId": productId,
        "customerId": customerId,
        "storeId": storeId,
        "dateSold": dateSold
      })
    }).then(function (data) {
      console.log("Request succeeded with  response", data);
     

      that.props.rerender();
      that.setState({ loading: false, modalOpen: false })
    })
      .catch(function (error) {
        console.log("Request failed", error);
        that.setState({ modalOpen: false })
      });;
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  render() {
    const { dateSold, customerId, productId, storeId } = this.state;

    return (
      <Modal
        trigger={<Button onClick={this.handleOpen} className="ui yellow button"><i className="edit icon"></i>Edit</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        style={{width:'30%',height:'auto',top:'auto',bottom:'auto',left:'auto',right:'auto'}}>
        <Modal.Header>Edit sale</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>

            <Form.Field>
              <Form.Input
                type="date"
                label='Date sold'
                defaultValue={dateSold}
                onChange={this.handleChange}
                name='dateSold' />
                {/* <Input type="date" value={dateSold}></Input> */}
            </Form.Field>

            <Form.Field>
              <Form.Dropdown
                label='Customer'
                value={customerId}
                selection
                options={this.customerSelect2}
                onChange={this.handleChange}
                name='customerId' />
            </Form.Field>

            <Form.Field>
              <Form.Dropdown
                label='Product'
                value={productId}
                selection
                options={this.productSelect2}
                onChange={this.handleChange}
                name='productId' />
            </Form.Field>

            <Form.Field>
              <Form.Dropdown
                label='Store'
                value={storeId}
                selection
                options={this.storeSelect2}
                onChange={this.handleChange}
                name='storeId' />
            </Form.Field>

            <Button color='green' size='large' type='submit' floated='right'
              icon labelPosition='right' loading={this.state.loading}>edit
              <Icon name='check' />
            </Button>

            <Button color='black' size='large' type='button' floated='right'
              onClick={this.handleClose}>cancel
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

