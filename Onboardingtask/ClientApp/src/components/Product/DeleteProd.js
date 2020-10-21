
  
import React, { Component } from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';
import { withRouter } from "react-router-dom";



export default class DeleteProd extends Component {
    static displayName = DeleteProd.name; 

  state = { modalOpen: false, loading: false }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    const that = this;
    const productId = this.props.productId;
    this.setState({ loading: true });
    

    const result = fetch('https://localhost:44384/Products/DeleteProduct/' + productId, {
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
        <Modal.Header>Delete product</Modal.Header>
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




