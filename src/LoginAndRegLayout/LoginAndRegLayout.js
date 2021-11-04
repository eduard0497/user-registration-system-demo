import React, { useState } from "react";
import Register from "./Register/Register";
import Login from "./Login/Login";
import "./LoginAndRegLayout.css";

function LoginAndRegLayout() {
  const [toggleLoginAndReg, setToggleLoginAndReg] = useState(false);
  const toggleView = () => {
    setToggleLoginAndReg(!toggleLoginAndReg);
  };
  return (
    <div className="login_and_reg_layout">
      <div className="login_and_reg_layout_title">
        <h1>User Registration System Demo</h1>
        <br />
        <h4>Created by Eduard Hovhannisyan</h4>
      </div>
      {toggleLoginAndReg ? (
        <Register toggleView={toggleView} />
      ) : (
        <Login toggleView={toggleView} />
      )}
    </div>
  );
}

export default LoginAndRegLayout;
