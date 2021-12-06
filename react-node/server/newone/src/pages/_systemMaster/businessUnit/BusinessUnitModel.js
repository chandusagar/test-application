import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Select from "react-select";

class AssessmentModel extends React.Component {
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          toggle={() => this.props.toggle(false)}
        >
          <ModalHeader toggle={() => this.props.toggle(false)}>
            {!this.props.editBusinessUnit
              ? ` Add BusinessUnit`
              : "Edit BusinessUnit"}
          </ModalHeader>
          <ModalBody className="bg-white">
            <div className="form-group">
              <input
                className="form-control"
                value={
                  !this.props.editBusinessUnit
                    ? this.props.businessUnit.business_unit
                    : this.props.editList.business_unit
                }
                onChange={(e) => this.props.onChange(e, this.props.editList.id)}
                type="text"
                required
                name="business_unit"
                placeholder="Business Unit"
              />
            </div>
            <div style={{ margin: "15px 0px" }}>
              <Select
                options={this.props.accounts}
                placeholder="Select Account"
                onChange={(e) => this.props.selectAccount(e)}
                value={this.props.account_name}
                getOptionLabel={(option) => option.account_name}
                getOptionValue={(option) => option}
                style={{ width: "140px", padding: "20px" }}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.props.toggle(false)}>
              Close
            </Button>
            {!this.props.editBusinessUnit ? (
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

export default AssessmentModel;
