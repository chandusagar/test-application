import React from "react";
import Widget from "../../../components/Widget/Widget";
import { connect } from "react-redux";
import { account } from "../../../actions/systemMaster/account";
import { assessment } from "../../../actions/systemMaster/assessement";
import {
  Row,
  Col,
  Button,
  ButtonToolbar,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import Select from "react-select";
import s from "../Grid.module.scss";
import AssessmentModel from "./AssessmentModel";

class Assessment extends React.Component {
  state = {
    addassement: {
      id: 0,
      assessment_name: "",
      status: false,
    },
    assessmentList: [],
    isOpen: false,
    editAssesment: false,
    editList: {},
  };

  constructor() {
    super();
    this.apiFormatter = this.apiFormatter.bind(this);
    this.apiFormatterAction = this.apiFormatterAction.bind(this);
  }

  componentDidMount() {
    const assessmentList = [
      { id: 1, assessment_name: "Test_Assessment", status: false },
    ];
    this.setState({ assessmentList });
    this.props.dispatch(assessment.list(assessmentList));
  }

  toggle(id) {
    this.setState({ isOpen: id });
  }

  apiFormatter(cell, row) {
    return (
      <ButtonToolbar>
        <BootstrapSwitchButton
          checked={row.status}
          onstyle="success"
          offstyle="dark"
          onlabel=""
          offlabel=""
          size="xs"
          onChange={(checked) => {
            this.changeSwitch(checked, row);
          }}
        />
      </ButtonToolbar>
    );
  }

  changeSwitch = (checked, row) => {
    const list = this.state.assessmentList;
    for (let i in list) {
      if (list[i].id === row.id) {
        list[i].status = checked;
      }
    }
    this.setState({ assessmentList: list });
    this.props.dispatch(assessment.list(this.state.assessmentList));
  };

  apiFormatterAction(cell, row) {
    return (
      <ButtonToolbar>
        <Button
          className={(s.controBtn, "ml-2")}
          color="info"
          size="xs"
          onClick={() => {
            this.editToggle(row);
          }}
        >
          Edit
        </Button>
        <Button
          className={(s.controBtn, "ml-2")}
          color="danger"
          size="xs"
          onClick={() => this.deleteAssessment(row)}
        >
          Delete
        </Button>
      </ButtonToolbar>
    );
  }

  editToggle(row) {
    this.setState({ isOpen: true, editAssesment: true, editList: row });
  }

  deleteAssessment = (row) => {
    const assessmentList = this.state.assessmentList;
    for (let i in assessmentList) {
      if (assessmentList[i].id === row.id) {
        assessmentList.splice(i, 1);
      }
    }
    this.setState({ assessmentList });
    this.props.dispatch(assessment.list(this.state.assessmentList));
  };

  onChange = (e, id) => {
    const { name, value } = e.target;
    const addassement = this.state.addassement;
    const editList = Object.assign({}, this.state.editList);
    if (id) {
      editList[name] = value;
      this.setState({ editList });
    } else {
      addassement[name] = value;
      this.setState({ addassement });
    }
  };

  onSave = (e) => {
    e.preventDefault();
    const Obj = Object.assign({}, this.state.addassement);
    const assessmentList = this.state.assessmentList;
    assessmentList.push(Obj);
    assessmentList.map((x, i) => {
      if (x.id == 0) {
        return (x.id = i + 1);
      }
    });
    this.setState({ assessmentList });
    this.props.dispatch(assessment.list(this.state.assessmentList));
    this.toggle(false);
  };

  onUpdate = (e, id) => {
    const Obj = Object.assign({}, this.state.editList);
    const assessmentList = this.state.assessmentList;
    assessmentList[id - 1] = Obj;
    this.setState({ editAssesment: false, assessmentList });
    this.props.dispatch(assessment.list(this.state.assessmentList));
    this.toggle(false);
  };

  selectAccount = (e) => {
    this.setState({ account_Name: e });
  };

  render() {
    const { assessments } = this.props.assessment;
    const { accounts } = this.props.manageAccount;
    return (
      <div>
        <div className="page-top-line">
          <h3 className="page-title">
            Manage - <span className="fw-semi-bold">Assessment</span>
          </h3>
        </div>
        <Widget title="List of Assessment">
          <Button color="success" onClick={() => this.toggle(true)}>
            Add Assessment
          </Button>
          <Row>
            <Col xs={12} sm={6} md={3}>
              <div style={{ margin: "15px 0px" }}>
                <Select
                  options={accounts}
                  placeholder="Select Account"
                  onChange={(e) => this.selectAccount(e)}
                  value={this.state.account_name}
                  getOptionLabel={(option) => option.account_name}
                  getOptionValue={(option) => option}
                  style={{ width: "140px", padding: "20px" }}
                />
              </div>
            </Col>
          </Row>

          <BootstrapTable
            data={assessments}
            version="4"
            pagination
            tableContainerClass={`table-striped ${s.bootstrapTable}`}
          >
            <TableHeaderColumn
              dataField="id"
              isKey={true}
              className="width-50"
              columnClassName="width-50"
            >
              <span className="fs-sm"> Id</span>
            </TableHeaderColumn>

            <TableHeaderColumn dataField="assessment_name">
              <span className="fs-sm">Assessment</span>
            </TableHeaderColumn>

            <TableHeaderColumn dataFormat={this.apiFormatter}>
              <span className="fs-sm">Status</span>
            </TableHeaderColumn>
            <TableHeaderColumn dataFormat={this.apiFormatterAction}>
              <span className="fs-sm">Action</span>
            </TableHeaderColumn>
          </BootstrapTable>
        </Widget>

        <AssessmentModel
          isOpen={this.state.isOpen}
          toggle={(e) => this.toggle(e)}
          onChange={(e, id) => this.onChange(e, id)}
          addassement={this.state.addassement}
          onSave={(e) => this.onSave(e)}
          editAssesment={this.state.editAssesment}
          onUpdate={(e, id) => this.onUpdate(e, id)}
          editList={this.state.editList}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    manageAccount: state.manageAccount,
    assessment: state.assessment,
  };
}

export default connect(mapStateToProps)(Assessment);
