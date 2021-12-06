import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Select from "react-select";

class ApplicationModel extends React.Component {
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          toggle={() => this.props.toggle(false)}
        >
          <ModalHeader toggle={() => this.props.toggle(false)}>
            {!this.props.editApplication
              ? ` Add Application`
              : "Edit Application"}
          </ModalHeader>
          <ModalBody className="bg-white">
            <div className="form-group">
              <input
                className="form-control"
                value={
                  !this.props.editApplication
                    ? this.props.addApplication.application_Name
                    : this.props.editList.application_Name
                }
                onChange={(e) => this.props.onChange(e, this.props.editList.id)}
                type="text"
                required
                name="application_Name"
                placeholder="Application Name"
              />
            </div>
            <div style={{ margin: "15px 0px" }}>
              <Select
                options={this.props.accounts}
                placeholder="Select Account"
                onChange={(e) => this.props.selectAccount(e)}
                value={this.props.addApplication.accounts}
                getOptionLabel={(option) => option.account_name}
                getOptionValue={(option) => option}
                style={{ width: "140px", padding: "20px" }}
              />
            </div>
            <div style={{ margin: "15px 0px" }}>
              <Select
                options={this.props.businessunits}
                placeholder="Select Business Unit"
                name="business_unit"
                onChange={(e) => this.props.selectBusinessUnit(e)}
                value={this.props.addApplication.businessUnit}
                getOptionLabel={(option) => option.business_unit}
                getOptionValue={(option) => option}
                style={{ width: "140px", padding: "20px" }}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.props.toggle(false)}>
              Close
            </Button>
            {!this.props.editApplication ? (
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

export default ApplicationModel;
