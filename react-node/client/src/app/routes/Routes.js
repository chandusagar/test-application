import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Signin from '../components/auth/Signin';
import Signup from '../components/auth/Signup';
import Home from '../layout/Home';
import Users from '../components/IAM/Users';
import Address from '../components/IAM/Address';
import ReduxHook from '../components/tasks/ReduxHook';

// below include routes task related
// import Counter from '../components/auth/Counter';
// import Progress from '../components/IAM/Progress';
// import Parent from '../components/tasks/Parent';




const Routes = () => {
    return (<Switch>
        <Route exact path="/" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        {/* <Route exact path="/home" component={Home} /> */}
        <Route exact path="/users" component={Users} />
        <Route path="/address" component={Address} />

        <Route path="/redux" component={ReduxHook} />

       </Switch>
    )
}
export default Routes;