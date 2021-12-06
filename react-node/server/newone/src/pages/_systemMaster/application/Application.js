import React from "react";
import Widget from "../../../components/Widget/Widget";
import { connect } from "react-redux";
import { application } from "../../../actions/systemMaster/application";

import { Button, ButtonToolbar } from "reactstrap";

import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

import s from "../Grid.module.scss";
import ApplicationModel from "./ApplicationModel";

class Application extends React.Component {
  state = {
    addApplication: {
      id: 0,
      application_Name: "",
      status: false,
      accounts: {},
      businessUnit: {},
    },
    applicationList: [],
    isOpen: false,
    editApplication: false,
    editList: {},
  };

  constructor() {
    super();
    this.apiFormatter = this.apiFormatter.bind(this);
    this.apiFormatterAction = this.apiFormatterAction.bind(this);
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
    const list = this.state.applicationList;
    for (let i in list) {
      if (list[i].id === row.id) {
        list[i].status = checked;
      }
    }
    this.setState({ applicationList: list });
    this.props.dispatch(application.list(this.state.applicationList));
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
          onClick={() => this.deleteApplication(row)}
        >
          Delete
        </Button>
      </ButtonToolbar>
    );
  }

  editToggle(row) {
    this.setState({ isOpen: true, editApplication: true, editList: row });
  }

  deleteApplication = (row) => {
    const applicationList = this.state.applicationList;
    for (let i in applicationList) {
      if (applicationList[i].id === row.id) {
        applicationList.splice(i, 1);
      }
    }
    this.setState({ applicationList });
    this.props.dispatch(application.list(this.state.applicationList));
  };

  onChange = async (e, id) => {
    const { name, value } = e.target;
    const addApplication = this.state.addApplication;
    const editList = Object.assign({}, this.state.editList);
    if (id) {
      editList[name] = value;
      this.setState({ editList });
    } else {
      addApplication[name] = value;
      this.setState({ addApplication });
    }
  };

  onSave = async (e) => {
    e.preventDefault();
    const Obj = Object.assign({}, this.state.addApplication);
    const applicationList = this.state.applicationList;
    applicationList.push(Obj);
    applicationList.map((x, i) => {
      if (x.id == 0) {
        return (x.id = i + 1);
      }
    });
    this.setState({ applicationList });
    this.props.dispatch(application.list(this.state.applicationList));
    this.toggle(false);
  };

  onUpdate = async (e, id) => {
    const Obj = Object.assign({}, this.state.editList);
    const applicationList = this.state.applicationList;
    applicationList[id - 1] = Obj;
    this.setState({ editApplication: false, applicationList, editList: {} });
    this.props.dispatch(application.list(this.state.applicationList));
    this.toggle(false);
  };

  selectAccount(e) {
    const addApplication = this.state.addApplication;
    addApplication.accounts = e;
    this.setState({ addApplication });
    console.log(addApplication);
  }

  selectBusinessUnit(e) {
    const addApplication = this.state.addApplication;
    addApplication.businessUnit = e;
    this.setState({ addApplication });
  }

  render() {
    const { accounts } = this.props.manageAccount;
    const { businessunits } = this.props.businessUnit;

    return (
      <div>
        <div className="page-top-line">
          <h3 className="page-title">
            Manage- <span className="fw-semi-bold"> Application</span>
          </h3>
        </div>
        <Widget title="List of Application">
          <Button color="success" onClick={() => this.toggle(true)}>
            Add Application
          </Button>
          <BootstrapTable
            data={this.props.application.applications}
            version="4"
            pagination
            search
            tableContainerClass={`table-striped ${s.bootstrapTable}`}
          >
            <TableHeaderColumn isKey={true} dataField="application_Name">
              <span className="fs-sm">Application</span>
            </TableHeaderColumn>

            <TableHeaderColumn dataFormat={this.apiFormatter}>
              <span className="fs-sm">Status</span>
            </TableHeaderColumn>
            <TableHeaderColumn dataFormat={this.apiFormatterAction}>
              <span className="fs-sm">Action</span>
            </TableHeaderColumn>
          </BootstrapTable>
        </Widget>

        <ApplicationModel
          isOpen={this.state.isOpen}
          toggle={(e) => this.toggle(e)}
          onChange={(e, id) => this.onChange(e, id)}
          addApplication={this.state.addApplication}
          onSave={(e) => this.onSave(e)}
          editApplication={this.state.editApplication}
          onUpdate={(e, id) => this.onUpdate(e, id)}
          editList={this.state.editList}
          accounts={accounts}
          selectAccount={(e) => this.selectAccount(e)}
          businessunits={businessunits}
          selectBusinessUnit={(e) => this.selectBusinessUnit(e)}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    manageAccount: state.manageAccount,
    assessment: state.assessment,
    businessUnit: state.businessUnit,
    application: state.application,
  };
}

export default connect(mapStateToProps)(Application);
