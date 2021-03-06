
  
import React, { Component } from 'react';
import { Button, Icon, Modal, Form } from 'semantic-ui-react';
import { withRouter } from "react-router-dom";



export default class EditStore extends Component {
    static displayName = EditStore.name; 

  state = { name: this.props.store.name, address: this.props.store.address, submittedName: '', submittedAddress: '', modalOpen: false, loading: false }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e, { name, value }) =>
    this.setState({ [name]: value })

  handleSubmit = (e) => {
    const that = this;
    const { name, address } = this.state;
    const storeId = this.props.store.storeId;
    
    this.setState({ submittedName: name, submittedAddress: address });
    this.setState({ loading: true });

    const result = fetch('/Stores/PutStore/'+storeId, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "storeId": storeId,
        "name": name,
        "address": address
    

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
    const { name, address, submittedName, submittedAddress } = this.state
    return (
      <Modal
        trigger={<Button onClick={this.handleOpen} className="ui yellow button"><i className="edit icon"></i>Edit</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        style={{width:'30%',height:'auto',top:'auto',bottom:'auto',left:'auto',right:'auto'}}>
        <Modal.Header>Edit store</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>

            <Form.Field>
              <Form.Input label='NAME' value={name} onChange={this.handleChange} name='name' />
            </Form.Field>
            <Form.Field>
              <Form.Input label='ADDRESS' value={address} onChange={this.handleChange} name='address' />
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



