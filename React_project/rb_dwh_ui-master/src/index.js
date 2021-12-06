import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";
import env from "react-dotenv";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={env.AUTH0_DOMAIN}
      clientId={env.AUTH0_CLIENT_ID}
      redirectUri={env.AUTH0_REDIRECT_URI}
      audience={env.AUTH0_AUDIENCE}
      scope="read:current_user"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
