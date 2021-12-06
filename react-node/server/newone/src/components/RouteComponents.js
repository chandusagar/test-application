import Login from '../pages/auth/login';
import { Redirect, Route } from 'react-router';
import React from 'react';

export const UserRoute = ({dispatch, component, ...rest}) => {

    return (
      <Route {...rest} render={props => { 
            if(isSessionValid(Login.isAuthenticated())){
                return React.createElement(component, props)
              }else{
                return <Redirect to="/login"/>
              }
            }}/>
    )

};

export const AuthRoute = ({dispatch, component, ...rest}) => {

  const {from} = rest.location.state || {from: {pathname: '/app'}};

  if (Login.isAuthenticated()) {
    return (
      <Redirect to={from}/>
    );
  } else {
    return (
      <Route {...rest} render={props => (React.createElement(component, props))}/>
    );
  }
};


const isSessionValid = (cognitoUser) => {
  if(cognitoUser){

    return cognitoUser.getSession((err, session) => {
      if (err && !session) {
        return false;
      }
      if (session.isValid()) {
        return true;
      }
      return false;
    });
    
  }else{

    return false

  }
}