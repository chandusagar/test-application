import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";
import env from "react-dotenv";

import { Mastercontext } from "./components/useContext/MasterContext";

import Container from "./components/layout/Container";
import NotSignedIn from "./components/mainComponents/auth/NotSignedIn";
import LoadingAuth from "./components/mainComponents/auth/LoadingAuth";
import Signin from "./components/mainComponents/auth/Signin";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [masterData, setMasterData] = useState({});
  const pathname = window.location.pathname;

  const setAccessToken = async () => {
    const accessToken = await getAccessTokenSilently({
      audience: env.AUTH0_AUDIENCE,
      scope: "read:current_user",
    });

    setMasterData({ accessToken });
  };

  useEffect(() => {
    if (isAuthenticated) {
      setAccessToken();
    }
  }, [isAuthenticated]);

  return (
    <Router>
      {isLoading && <LoadingAuth />}
      {!isLoading && (
        <>
          {!isAuthenticated && pathname !== "/" ? (
            <NotSignedIn />
          ) : (
            <>
              {!isAuthenticated || pathname === "/" ? (
                <Signin />
              ) : (
                <Mastercontext.Provider value={{ masterData, setMasterData }}>
                  <Container />
                </Mastercontext.Provider>
              )}
            </>
          )}
        </>
      )}
    </Router>
  );
}

export default App;
