import React, { useState } from "react";
import "./Login.css";

function Login({ toggleView }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState();
  const [forgotPasswordClicked, setForgotPasswordClicked] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BASE_URL_TO_FETCH}/login`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then(async (item) => {
        if (Array.isArray(item)) {
          await sessionStorage.setItem("access_token", item[0].access_token);
          await sessionStorage.setItem("user_id", item[0].user_id);
          alert("Logged In Successfully...");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          alert(item);
        }
      });
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BASE_URL_TO_FETCH}/forgot-password`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        dob: dob,
      }),
    })
      .then((response) => response.json())
      .then((info) => {
        alert(info);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
  };

  return (
    <div className="login_container">
      <form className="login_container_form">
        <h1>LOGIN</h1>
        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="login_container_form_buttons">
          <button onClick={handleLogin}>LOGIN</button>
        </div>
        <div className="login_container_form_buttons">
          <button onClick={toggleView}>Register Instead</button>
          <button
            onClick={() => {
              setForgotPasswordClicked(!forgotPasswordClicked);
            }}
          >
            Forgot Password
          </button>
        </div>
      </form>
      {forgotPasswordClicked ? (
        <form className="login_container_form">
          <h1>Reset Password</h1>
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Date of Birth (mm/dd/yyyy)"
            required
            onChange={(e) => {
              setDob(new Date(e.target.value));
            }}
          />
          <button onClick={handleForgotPassword}>Submit Form</button>
        </form>
      ) : null}
    </div>
  );
}

export default Login;
