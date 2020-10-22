
  
import React, { Component } from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';




export default class DeleteCustModal extends Component {
    static displayName = DeleteCustModal.name; 

  state = { modalOpen: false, loading: false }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    const that = this;
    const customerId = this.props.customerId;
    this.setState({ loading: true });
    

    const result = fetch('/Customers/DeleteCustomer/' + customerId, {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: ''
    }).then(function (data) {
      if (data.ok) {
        console.log("Request succeeded with  response", data);

        that.props.rerender();
        that.setState({ loading: false, modalOpen: false })
      }

      if (data.status == 400) {
        alert("Unable to delete because of foreign key dependency.");
        var error = new Error("Unable to delete because of foreign key dependency.")
        error.response = data;
        throw error;
      }
    })
      .catch(function (error) {
        console.log("Request failed", error);
        that.setState({ modalOpen: false })
      });;
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  render() {
    return (
      <Modal
        trigger={<Button onClick={this.handleOpen} className="ui red button"><i className="trash alternate outline icon"></i>Delete</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        style={{width:'30%',height:'auto',top:'auto',bottom:'auto',left:'auto',right:'auto'}}>
        <Modal.Header>Delete customer</Modal.Header>
        <Modal.Content>
          <h3>Are you sure?</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleSubmit} color='red' size='large' type='submit' floated='right'
            icon labelPosition='right' loading={this.state.loading}>delete
              <Icon name='close' />
          </Button>

          <Button color='black' size='large' type='button' floated='right'
            onClick={this.handleClose}>cancel
            </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}




