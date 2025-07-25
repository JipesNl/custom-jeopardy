import React from "react";
import { Button } from "@mui/material";
import { logOut } from "../pages/host/auth";

const Host = () => {
  return (
    <div>
      <h1>Host</h1>
      <p>This is the host page.</p>
      <Button
        onClick={(e) => {
          e.preventDefault();
          logOut();
        }}
        variant="contained"
      >
        Logout
      </Button>
    </div>
  );
};

export default Host;
