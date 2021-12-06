import React from "react";
import Widget from "../../../components/Widget/Widget";
import { connect } from "react-redux";
import { account } from "../../../actions/systemMaster/account";

import { Button, ButtonToolbar } from "reactstrap";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import s from "../Grid.module.scss";

import AccountModel from "./AccountModel";

class Account extends React.Component {
  state = {
    addaccount: {
      id: 0,
      account_name: "",
      status: false,
    },
    accountList: [],
    isOpen: false,
    editAccount: false,
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

  componentDidMount() {
    const accountList = [{ id: 1, account_name: "Account_1", status: true }];
    this.setState({ accountList });
    this.props.dispatch(account.accountList(accountList));
  }

  apiFormatter(cell, row) {
    return (
      <ButtonToolbar>
        <BootstrapSwitchButton
          checked={row.status}
          disabled={false}
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
    const list = this.state.accountList;
    for (let i in list) {
      if (list[i].id === row.id) {
        list[i].status = checked;
      }
    }
    this.setState({ accountList: list });
    this.props.dispatch(account.accountList(this.state.accountList));
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
          onClick={() => {
            this.deleteAccount(row);
          }}
        >
          Delete
        </Button>
      </ButtonToolbar>
    );
  }

  editToggle(row) {
    this.setState({ isOpen: true, editAccount: true, editList: row });
  }

  deleteAccount = (row) => {
    const accountList = this.state.accountList;
    for (let i in accountList) {
      if (accountList[i].id === row.id) {
        accountList.splice(i, 1);
      }
    }
    this.setState({ accountList });
    this.props.dispatch(account.accountList(this.state.accountList));
  };

  onChange = (e, id) => {
    const { name, value } = e.target;
    const addaccount = this.state.addaccount;
    const editList = Object.assign({}, this.state.editList);
    if (id) {
      editList[name] = value;
      this.setState({ editList });
    } else {
      addaccount[name] = value;
      this.setState({ addaccount });
    }
  };

  onSave = (e) => {
    e.preventDefault();
    const Obj = Object.assign({}, this.state.addaccount);
    const accountList = this.state.accountList;
    accountList.push(Obj);
    accountList.map((x, i) => {
      if (x.id == 0) {
        return (x.id = i + 1);
      }
    });
    this.setState({ accountList });
    this.props.dispatch(account.accountList(this.state.accountList));
    this.toggle(false);
  };

  onUpdate = (e, id) => {
    e.preventDefault();
    const Obj = Object.assign({}, this.state.editList);
    const accountList = this.state.accountList;
    accountList[id - 1] = Obj;
    this.setState({ editAccount: false, accountList });
    this.props.dispatch(account.accountList(this.state.accountList));
    this.toggle(false);
  };

  render() {
    const { accounts } = this.props.manageAccount;

    return (
      <div>
        <div className="page-top-line">
          <h3 className="page-title">
            Manage - <span className="fw-semi-bold">Accounts</span>
          </h3>
        </div>
        <Widget title="List of Accounts">
          <Button color="success" onClick={() => this.toggle(true)}>
            Add Account
          </Button>
          <BootstrapTable
            data={accounts}
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

            <TableHeaderColumn dataField="account_name">
              <span className="fs-sm">Account Name</span>
            </TableHeaderColumn>

            <TableHeaderColumn dataFormat={this.apiFormatter}>
              <span className="fs-sm">Status</span>
            </TableHeaderColumn>
            <TableHeaderColumn dataFormat={this.apiFormatterAction}>
              <span className="fs-sm">Action</span>
            </TableHeaderColumn>
          </BootstrapTable>
        </Widget>

        <AccountModel
          isOpen={this.state.isOpen}
          toggle={(e) => this.toggle(e)}
          onChange={(e, id) => this.onChange(e, id)}
          addaccount={this.state.addaccount}
          onSave={(e) => this.onSave(e)}
          editAccount={this.state.editAccount}
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
  };
}

export default connect(mapStateToProps)(Account);
