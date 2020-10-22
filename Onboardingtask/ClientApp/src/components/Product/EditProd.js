
  
import React, { Component } from 'react';
import { Button, Icon, Modal, Form } from 'semantic-ui-react';
import { withRouter } from "react-router-dom";



export default class EditProd extends Component {
    static displayName = EditProd.name; 

  state = { name: this.props.product.name, price: this.props.product.price, submittedName: '', submittedPrice: '', modalOpen: false, loading: false }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e, { name, value }) =>
    this.setState({ [name]: value })

  handleSubmit = (e) => {
    const that = this;
    const { name, price } = this.state;
    const productId = this.props.product.productId;
    
    this.setState({ submittedName: name, submittedPrice: price });
    this.setState({ loading: true });

    const result = fetch('/Products/PutProduct/'+productId, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "productId": productId,
        "name": name,
        "price": price
    

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
    const { name, price, submittedName, submittedPrice } = this.state
    return (
      <Modal
        trigger={<Button onClick={this.handleOpen} className="ui yellow button"><i className="edit icon"></i>Edit</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        style={{width:'30%',height:'auto',top:'auto',bottom:'auto',left:'auto',right:'auto'}}>
        <Modal.Header>Edit product</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>

            <Form.Field>
              <Form.Input label='NAME' value={name} onChange={this.handleChange} name='name' />
            </Form.Field>
            <Form.Field>
              <Form.Input label='PRICE' value={price} onChange={this.handleChange} name='price' />
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



