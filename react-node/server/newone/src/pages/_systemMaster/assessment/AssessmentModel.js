import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class AssessmentModel extends React.Component {
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          toggle={() => this.props.toggle(false)}
        >
          <ModalHeader toggle={() => this.props.toggle(false)}>
            {!this.props.editAssesment
              ? ` Create Assessment`
              : "Edit Assessment"}
          </ModalHeader>
          <ModalBody className="bg-white">
            <div className="form-group">
              <input
                className="form-control"
                value={
                  !this.props.editAssesment
                    ? this.props.addassement.assessment_name
                    : this.props.editList.assessment_name
                }
                onChange={(e) => this.props.onChange(e, this.props.editList.id)}
                type="text"
                required
                name="assessment_name"
                placeholder="Assement Name"
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.props.toggle(false)}>
              Close
            </Button>
            {!this.props.editAssesment ? (
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
