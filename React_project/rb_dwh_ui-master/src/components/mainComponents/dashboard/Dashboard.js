import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Dashboard = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading || !isAuthenticated) {
    return null;
  }

  return <div>Welcome to ReserveBar Retailer Setting</div>;
};

export default Dashboard;
