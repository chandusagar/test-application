import React from "react";
import Widget from "../../../components/Widget/Widget";

import {
  Row,
  Col,
  Progress,
  Button,
  ButtonToolbar,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Select from "react-select";

import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

import s from "../Grid.module.scss";

class AssessmentProgress extends React.Component {
  state = {
    account_name: "",
    business_unit: "",
    application_Name: "",
    data: [
      {
        account: [
          { id: 1, account_name: "Account_1", status: true },
          { id: 2, account_name: "Account_2", status: true },
        ],
        businessUnit: [
          { id: 1, business_unit: "Unit_1", status: true },
          { id: 2, business_unit: "Unit_2", status: true },
        ],
        applications: [
          { id: 1, application_Name: "application_1", status: true },
          { id: 2, application_Name: "application_1", status: true },
        ],
      },
    ],
    list: [
      {
        id: 1,
        account_name: "Account_1",
        business_unit: "Unit_1",
        application_Name: "application_1",
        user_name: "Vikas",
        agile: false,
        devOps: false,
        test_Automation: true,
        devSecOps: false,
      },
      {
        id: 2,
        account_name: "Account_2",
        business_unit: "Unit_2",
        application_Name: "application_2",
        user_name: "Rahul",
        agile: false,
        devOps: false,
        test_Automation: true,
        devSecOps: false,
      },
    ],
  };

  selectAccount(e) {
    this.setState({ account_name: e });
  }
  selectBusiness(e) {
    this.setState({ business_unit: e });
  }
  selectapplication(e) {
    this.setState({ application_Name: e });
  }

  apiFormatter(cell, row) {
    return (
      <Progress style={{ height: "15px" }} color={"danger"} value={"80"} />
    );
  }

  render() {
    const options = {
      sizePerPage: 10,
      paginationSize: 3,
    };
    return (
      <div>
        <div className="page-top-line">
          <h3 className="page-title">
            Manage- <span className="fw-semi-bold">Assessment Progress</span>
          </h3>
        </div>
        <Widget title="List of Assessment Progress">
          <Row>
            <Col xs={12} sm={6} md={3}>
              <div style={{ margin: "15px 0px" }}>
                <Select
                  options={this.state.data[0].account}
                  placeholder="Select Account"
                  onChange={(e) => this.selectAccount(e)}
                  value={this.state.account_name}
                  getOptionLabel={(option) => option.account_name}
                  getOptionValue={(option) => option}
                  style={{ width: "140px", padding: "20px" }}
                />
              </div>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <div style={{ margin: "15px 0px" }}>
                <Select
                  options={this.state.data[0].businessUnit}
                  placeholder="Select Business Unit"
                  onChange={(e) => this.selectBusiness(e)}
                  value={this.state.business_unit}
                  getOptionLabel={(option) => option.business_unit}
                  getOptionValue={(option) => option}
                  style={{ width: "140px", padding: "20px" }}
                />
              </div>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <div style={{ margin: "15px 0px" }}>
                <Select
                  options={this.state.data[0].applications}
                  placeholder="Select Application"
                  onChange={(e) => this.selectapplication(e)}
                  value={this.state.selected_project}
                  getOptionLabel={(option) => option.application_Name}
                  getOptionValue={(option) => option}
                  style={{ width: "140px", padding: "20px" }}
                />
              </div>
            </Col>
          </Row>

          <BootstrapTable
            data={this.state.list}
            version="4"
            pagination
            options={options}
            // search
            tableContainerClass={`table-striped ${s.bootstrapTable}`}
          >
            <TableHeaderColumn isKey={true} dataField="account_name">
              <span className="fs-sm">Account Name</span>
            </TableHeaderColumn>
            <TableHeaderColumn dataField="application_Name">
              <span className="fs-sm">Application Name</span>
            </TableHeaderColumn>
            <TableHeaderColumn dataField="business_unit">
              <span className="fs-sm">Business Unit</span>
            </TableHeaderColumn>
            <TableHeaderColumn dataField="user_name">
              <span className="fs-sm">User Name</span>
            </TableHeaderColumn>
            <TableHeaderColumn dataFormat={this.apiFormatter}>
              <span className="fs-sm">Progress Status</span>
            </TableHeaderColumn>
          </BootstrapTable>
        </Widget>
      </div>
    );
  }
}

export default AssessmentProgress;
