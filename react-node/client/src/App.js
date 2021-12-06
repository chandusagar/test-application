import React, { useReducer } from "react";
import "./App.css";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./app/routes/Routes";
import { userReducer } from "./app/reducers";
import { MasterContext } from "./app/useContext/MasterContext";

import Home from "./app/layout/Home";
import Signin from "./app/components/auth/Signin";

import { store } from './app/redux/store';
import { Provider} from 'react-redux';

function App() {
  const [state, dispatch] = useReducer(
    userReducer.reducer,
    userReducer.initialState
  );
  return (
    <div>
      <Router>
        <Provider store={store}>
        <MasterContext.Provider
          value={{ state: state, userDispatch: dispatch }}
        >
          <Home />
        </MasterContext.Provider>
        </Provider>
      </Router>
    </div>
  );
}

export default App;
