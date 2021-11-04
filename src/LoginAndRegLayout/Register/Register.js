import React, { useState } from "react";
import "./Register.css";

function Register({ toggleView }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState();
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();

    if (
      !gender ||
      !dob ||
      !firstName ||
      !lastName ||
      !email ||
      !address ||
      !city ||
      !state ||
      !zip ||
      !password ||
      state.length !== 2
    ) {
      alert("Please fill out the form completely");
      return null;
    }

    let formattedDob = await dob.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    if (formattedDob === "Invalid Date") {
      alert("Please fill out the form accordingly");
      return null;
    } else {
      fetch(`${process.env.REACT_APP_BASE_URL_TO_FETCH}/register-user`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fname: firstName,
          lname: lastName,
          email: email,
          dob: formattedDob,
          gender: gender,
          address: address,
          city: city,
          state: state,
          zip: zip,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((text) => {
          window.alert(text);
          setTimeout(() => {
            window.location.reload();
          }, 500);
        })
        .catch((e) =>
          alert("Something went wrong! Please double check the inputs")
        );
    }
  };

  return (
    <div className="registration_container">
      <form className="registration_container_form">
        <h1>Register</h1>
        <input
          type="text"
          placeholder="First Name"
          required
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Last Name"
          required
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
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
        <div className="registration_container_form_gender_toggle">
          <input
            type="radio"
            id="Female"
            name="gender"
            value="Female"
            onChange={(e) => {
              setGender(e.target.value);
            }}
          />
          <label>Female</label>
          <input
            type="radio"
            id="Male"
            name="gender"
            value="Male"
            onChange={(e) => {
              setGender(e.target.value);
            }}
          />
          <label>Male</label>
        </div>
        <input
          type="text"
          placeholder="Address"
          required
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="City"
          required
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="State (ex: CA)"
          required
          onChange={(e) => {
            setState(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Zip"
          required
          onChange={(e) => {
            setZip(e.target.value);
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
        <div className="registration_container_form_buttons">
          <button onClick={toggleView}>Already a User</button>
          <button onClick={registerUser}>Register</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
