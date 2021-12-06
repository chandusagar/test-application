import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class AccountModel extends React.Component {
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          toggle={() => this.props.toggle(false)}
        >
          <ModalHeader toggle={() => this.props.toggle(false)}>
            {!this.props.editAccount ? ` Create Account` : "Edit Account"}
          </ModalHeader>
          <ModalBody className="bg-white">
            <div className="form-group">
              <input
                className="form-control"
                value={
                  !this.props.editAccount
                    ? this.props.addaccount.account_name
                    : this.props.editList.account_name
                }
                onChange={(e) => this.props.onChange(e, this.props.editList.id)}
                type="text"
                required
                name="account_name"
                placeholder="Account Name"
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.props.toggle(false)}>
              Close
            </Button>
            {!this.props.editAccount ? (
              <Button color="primary" onClick={(e) => this.props.onSave(e)}>
                Add
              </Button>
            ) : (
              <Button
                color="primary"
                onClick={(e) => this.props.onUpdate(e, this.props.editList.id)}
              >
                Update
              </Button>
            )}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AccountModel;
