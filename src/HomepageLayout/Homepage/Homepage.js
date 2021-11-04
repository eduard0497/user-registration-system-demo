import React, { useState, useEffect } from "react";
import "./Homepage.css";

function Homepage() {
  const [userData, setUserData] = useState([]);
  const [changePasswordToggle, setChangePasswordToggle] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    fetch(
      `${
        process.env.REACT_APP_BASE_URL_TO_FETCH
      }/get-user-info?id=${sessionStorage.getItem(
        "user_id"
      )}&token=${sessionStorage.getItem("access_token")}`
    )
      .then((response) => response.json())
      .then((info) => {
        setUserData(info);
      });
  }, []);

  const changePassword = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BASE_URL_TO_FETCH}/reset-password`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: sessionStorage.getItem("user_id"),
        token: sessionStorage.getItem("access_token"),
        oldPassword: oldPassword,
        newPassword: newPassword,
      }),
    })
      .then((response) => response.json())
      .then((text) => {
        alert(text);
      });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const logOut = () => {
    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("access_token");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <div className="homepage_container">
      <div className="homepage_navbar">
        {changePasswordToggle ? (
          <form className="homepage_navbar_change_password">
            <input
              type="password"
              placeholder="Old Password"
              required
              onChange={(e) => {
                setOldPassword(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="New Password"
              required
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
            <button onClick={changePassword}>Submit Form</button>
          </form>
        ) : null}
        <button
          onClick={() => {
            setChangePasswordToggle(!changePasswordToggle);
          }}
        >
          Change Password
        </button>
        <button onClick={logOut}>Log Out</button>
      </div>
      <div className="homepage_user_info">
        <h1>User Details</h1>
        {/*   */}
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Address</th>
              <th>Member Since</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((item) => (
              <tr className="homepage_user_info_table_row" key={item.fname}>
                <td>{item.fname}</td>
                <td>{item.lname}</td>
                <td>{item.email}</td>
                <td>
                  {new Date(item.dob).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </td>
                <td>{item.gender}</td>
                <td>
                  {item.address}, {item.city}, {item.state} {item.zip}
                </td>
                <td>
                  {new Date(item.timestamp).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/*  */}
      </div>
    </div>
  );
}

export default Homepage;
