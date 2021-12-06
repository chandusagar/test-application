import React from "react";
import { Route, Switch } from "react-router-dom";

import Signin from "../mainComponents/auth/Signin";
import Retailer from "../mainComponents/retailer/Retailer";
import Supplier from "../mainComponents/supplier/Supplier";
import Dashboard from "../mainComponents/dashboard/Dashboard";

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Signin} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/retailer" component={Retailer} />
      <Route exact path="/supplier" component={Supplier} />
    </Switch>
  );
}

export default Routes;
