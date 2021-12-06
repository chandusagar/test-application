import React from "react";
import Widget from "../../../components/Widget/Widget";
import { connect } from "react-redux";

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
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

import s from "../Grid.module.scss";

const animatedComponents = makeAnimated();

class ApplicationMaping extends React.Component {
  state = {
    account_name: "",
    business_unit: "",
    application_Name: "",
    filterList: [0],
    list: [],
    data: [
      {
        // accounts: [
        //   { id: 1, account_name: "Account_1", status: true },
        //   { id: 2, account_name: "Account_2", status: true },
        // ],
        businessUnit: [
          { id: 1, business_unit: "Unit_1", status: true },
          { id: 2, business_unit: "Unit_2", status: true },
        ],
        applications: [
          { id: 1, application_Name: "application_1", status: true },
          { id: 2, application_Name: "application_2", status: true },
        ],
      },
    ],
    applicationList: [
      {
        id: 1,
        account_name: "Account_1",
        business_unit: "businessUnit_1",
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
        business_unit: "businessUnit_2",
        application_Name: "application_2",
        user_name: "Rahul",
        agile: false,
        devOps: false,
        test_Automation: true,
        devSecOps: false,
      },
    ],
  };

  apiFormatter(cell, row) {
    return (
      <ButtonToolbar>
        <BootstrapSwitchButton
          checked={false}
          onstyle="success"
          offstyle="dark"
          onlabel=""
          offlabel=""
          size="xs"
          // onChange={(checked) => {
          //   this.setState({ isUserAdmin: checked });
          // }}
        />
      </ButtonToolbar>
    );
  }

  selectAccount = (e, id) => {
    const newFilter = this.state.filterList;
    const accounts = this.props.manageAccount.accounts;
    const list = this.state.list;
    for (let i in accounts) {
      if (accounts[i].id === e.id) {
        newFilter.push(Number(i));
        list[i] = { account_Name: "", business_unit: "" };
      }
    }
    list[id].account_Name = e;
    const filterList = newFilter.filter((x, i, z) => z.indexOf(x) === i);
    console.log(list);
    this.setState({ filterList, list });
  };

  selectBusiness(e) {
    this.setState({ business_unit: e });
  }
  selectapplication(e) {
    console.log(e);
    this.setState({ application_Name: e });
  }

  render() {
    const { accounts } = this.props.manageAccount;
    const { businessunits } = this.props.businessUnit;

    const businessOption = [
      { value: "business_1", label: "Business_1" },
      { value: "business_2", label: "Business_2" },
      { value: "business_3", label: "Business_3" },
    ];

    const applicationOption = [
      { value: "application_1", label: "Application_1" },
      { value: "application_2", label: "Application_2" },
      { value: "application_3", label: "Application_3" },
    ];

    return (
      <div>
        <div className="page-top-line">
          <h3 className="page-title">
            Manage- <span className="fw-semi-bold"> Application Maping</span>
          </h3>
        </div>
        <Widget title="List of Application Maping">
          {this.state.filterList.map((item, i) => (
            <div key={i}>
              <Row>
                <Col xs={12} sm={6} md={4}>
                  <div style={{ margin: "15px 0px" }}>
                    <Select
                      options={accounts}
                      placeholder="Select Account"
                      onChange={(e) => this.selectAccount(e, i)}
                      value={
                        this.state.list[i]
                          ? this.state.list[i].account_name
                          : ""
                      }
                      getOptionLabel={(option) => option.account_name}
                      getOptionValue={(option) => option}
                      style={{ width: "140px", padding: "20px" }}
                    />
                  </div>
                </Col>
                <Col xs={12} sm={6} md={4}>
                  <div style={{ margin: "15px 0px" }}>
                    <Select
                      className="basic-multi-select"
                      classNamePrefix="Select Business Unit"
                      placeholder="Select Business Unit"
                      name="business_unit"
                      // defaultValue={[businessOption[0]]}
                      components={animatedComponents}
                      isMulti
                      options={businessOption}
                    />
                  </div>
                </Col>
                <Col xs={12} sm={6} md={4}>
                  <div style={{ margin: "15px 0px" }}>
                    <Select
                      className="basic-multi-select"
                      classNamePrefix="Select Application"
                      placeholder="Select Application"
                      name="application_Name"
                      // defaultValue={[applicationOption[0]]}
                      components={animatedComponents}
                      isMulti
                      options={applicationOption}
                    />
                  </div>
                </Col>
              </Row>
              <BootstrapTable
                data={this.state.applicationList}
                version="4"
                pagination
                tableContainerClass={`table-striped ${s.bootstrapTable}`}
              >
                <TableHeaderColumn isKey={true} dataField="account_name">
                  <span className="fs-sm">Account</span>
                </TableHeaderColumn>
                <TableHeaderColumn dataField="application_Name">
                  <span className="fs-sm">Application Name</span>
                </TableHeaderColumn>
                <TableHeaderColumn dataField="user_name">
                  <span className="fs-sm">User Name</span>
                </TableHeaderColumn>
                <TableHeaderColumn dataFormat={this.apiFormatter}>
                  <span className="fs-sm">Agile</span>
                </TableHeaderColumn>
                <TableHeaderColumn dataFormat={this.apiFormatter}>
                  <span className="fs-sm">DevOps</span>
                </TableHeaderColumn>
                <TableHeaderColumn dataFormat={this.apiFormatter}>
                  <span className="fs-sm">Test Automation</span>
                </TableHeaderColumn>
                <TableHeaderColumn dataFormat={this.apiFormatter}>
                  <span className="fs-sm">DevSecOps</span>
                </TableHeaderColumn>
              </BootstrapTable>
            </div>
          ))}
        </Widget>
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

export default connect(mapStateToProps)(ApplicationMaping);
