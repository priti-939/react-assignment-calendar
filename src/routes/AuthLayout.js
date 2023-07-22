import React from "react";
// routes config
import Routes from "./index";

const AuthLayout = () => {
  // console.log(Routes)
  return (
    <Routes.LoginRoutes />
  );
};

export default React.memo(AuthLayout);
