import React, { useState, useEffect } from "react";
import "./App.css";
import LoginAndRegLayout from "../src/LoginAndRegLayout/LoginAndRegLayout";
import HomepageLayout from "../src/HomepageLayout/HomepageLayout";

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    if (
      sessionStorage.getItem("user_id") &&
      sessionStorage.getItem("access_token")
    ) {
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }
  }, []);
  return (
    <div className="App">
      {userLoggedIn ? <HomepageLayout /> : <LoginAndRegLayout />}
    </div>
  );
}

export default App;
