import React from "react";
import Widget from "../../../components/Widget/Widget";
import { connect } from "react-redux";
import { businessunit } from "../../../actions/systemMaster/businessUnit";

import { Button, ButtonToolbar } from "reactstrap";

import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import s from "../Grid.module.scss";
import BusinessUnitModel from "./BusinessUnitModel";
import Row from "reactstrap/lib/Row";

class BussinessUnits extends React.Component {
  state = {
    businessUnit: {
      id: 0,
      assessment_name: "",
      status: false,
      accounts: {},
    },
    businessUnitList: [],
    isOpen: false,
    editBusinessUnit: false,
    editList: {},
  };

  constructor() {
    super();
    this.apiFormatter = this.apiFormatter.bind(this);
    this.apiFormatterAction = this.apiFormatterAction.bind(this);
  }

  componentDidMount() {
    const businessUnitList = [
      { id: 1, business_unit: "businessUnit_1", status: false },
    ];
    this.setState({ businessUnitList });
    this.props.dispatch(businessunit.list(businessUnitList));
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
    const list = this.state.businessUnitList;
    for (let i in list) {
      if (list[i].id === row.id) {
        list[i].status = checked;
      }
    }
    this.setState({ businessUnitList: list });
    this.props.dispatch(businessunit.list(this.state.businessUnitList));
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
          onClick={() => this.deletebusinessUnit(row)}
        >
          Delete
        </Button>
      </ButtonToolbar>
    );
  }
  editToggle(row) {
    this.setState({ isOpen: true, editBusinessUnit: true, editList: row });
  }

  deletebusinessUnit = (row) => {
    const businessUnitList = this.state.businessUnitList;
    for (let i in businessUnitList) {
      if (businessUnitList[i].id === row.id) {
        businessUnitList.splice(i, 1);
      }
    }
    this.setState({ businessUnitList });
    this.props.dispatch(businessunit.list(this.state.businessUnitList));
  };

  onChange = (e, id) => {
    const { name, value } = e.target;
    const businessUnit = this.state.businessUnit;
    const editList = Object.assign({}, this.state.editList);
    if (id) {
      editList[name] = value;
      this.setState({ editList });
    } else {
      businessUnit[name] = value;
      this.setState({ businessUnit });
    }
  };

  onSave = (e) => {
    e.preventDefault();
    const Obj = Object.assign({}, this.state.businessUnit);
    const businessUnitList = this.state.businessUnitList;
    businessUnitList.push(Obj);
    businessUnitList.map((x, i) => {
      if (x.id == 0) {
        return (x.id = i + 1);
      }
    });
    this.setState({ businessUnitList });
    this.props.dispatch(businessunit.list(this.state.businessUnitList));
    this.toggle(false);
  };

  onUpdate = (e, id) => {
    const Obj = Object.assign({}, this.state.editList);
    const businessUnitList = this.state.businessUnitList;
    businessUnitList[id - 1] = Obj;
    this.setState({ editBusinessUnit: false, businessUnitList });
    this.props.dispatch(businessunit.list(this.state.businessUnitList));
    this.toggle(false);
  };

  selectAccount(e) {
    const businessUnit = Object.assign({}, this.state.businessUnit);
    businessUnit.accounts = e;
    this.setState({ businessUnit });
  }

  render() {
    const { accounts } = this.props.manageAccount;
    const { businessunits } = this.props.businessUnit;

    return (
      <div>
        <div className="page-top-line">
          <h3 className="page-title">
            Manage- <span className="fw-semi-bold"> Business Units</span>
          </h3>
        </div>
        <Widget title="List of BusinessUnits">
          <Button color="success" onClick={() => this.toggle(true)}>
            Add Business Unit
          </Button>
          <BootstrapTable
            data={businessunits}
            version="4"
            pagination
            search
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
            <TableHeaderColumn dataField="business_unit">
              <span className="fs-sm">Business Unit</span>
            </TableHeaderColumn>

            <TableHeaderColumn dataFormat={this.apiFormatter}>
              <span className="fs-sm">Status</span>
            </TableHeaderColumn>
            <TableHeaderColumn dataFormat={this.apiFormatterAction}>
              <span className="fs-sm">Action</span>
            </TableHeaderColumn>
          </BootstrapTable>
        </Widget>
        <BusinessUnitModel
          isOpen={this.state.isOpen}
          toggle={(e) => this.toggle(e)}
          onChange={(e, id) => this.onChange(e, id)}
          businessUnit={this.state.businessUnit}
          onSave={(e) => this.onSave(e)}
          editBusinessUnit={this.state.editBusinessUnit}
          onUpdate={(e, id) => this.onUpdate(e, id)}
          editList={this.state.editList}
          accounts={accounts}
          selectAccount={(e) => this.selectAccount(e)}
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
  };
}

export default connect(mapStateToProps)(BussinessUnits);
