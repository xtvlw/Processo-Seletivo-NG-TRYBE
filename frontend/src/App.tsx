// UI library
import React, { FC, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// components
import Sign from "./components/loginPage/Sign";
import Page from "./components/pageSwitch/Page";

// css
import "./app.css";

// modules
import cookies from "./modules/cookie";

// main app component
const App: React.FC = () => {
  const [isValid, setValidation] = useState(() => {
    if (cookies.token == "") {
      return true;
    }
    return false;
  });

  useEffect(() => {
    if (cookies.token == "" || cookies.token == undefined) {
      setValidation(false);
    }
  });
  return (
    <div className="center">
      {!isValid ? (
        <Sign setValidation={setValidation} />
      ) : (
        <div>
          <Page />
        </div>
      )}
    </div>
  );
};

export default App;
