
  
import React, { Component } from 'react';
import { Button, Icon, Modal, Form } from 'semantic-ui-react';
import { withRouter } from "react-router-dom";


export default class NewProd extends Component {
    static displayName = NewProd.name; 

  state = { name: '', price: '',  modalOpen: false, loading: false }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e, { name, value }) =>
    this.setState({ [name]: value })

  handleSubmit = (e) => {
    const that = this;
    const { name, price } = this.state
    
    this.setState({ loading: true })

    const result = fetch('/Products/PostProduct', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "Name": name,
        "Price": price
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
    const { name, price} = this.state
    return (
      <Modal
        trigger={<Button onClick={this.handleOpen} className='ui primary button'>New Product</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        style={{width:'30%',height:'auto',top:'auto',bottom:'auto',left:'auto',right:'auto'}}>
        <Modal.Header>Create Product</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>

            <Form.Field>
              <Form.Input label='NAME' value={name} onChange={this.handleChange} name='name' />
            </Form.Field>
            <Form.Field>
              <Form.Input label='PRICE' value={price} onChange={this.handleChange} name='price' />
            </Form.Field>

            <Button color='green' size='large' type='submit' floated='right'
              icon labelPosition='right' loading={this.state.loading}>create
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



