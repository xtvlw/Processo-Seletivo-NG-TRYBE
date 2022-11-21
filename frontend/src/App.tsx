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
    if (cookies.token == "" || cookies.token == undefined) {
      return false;
    } else {
      return true;
    }
  });

  useEffect(() => {
    try {
      if (cookies.token == "" || cookies.token == undefined) {
        setValidation(false);
      } else {
        setValidation(true);
      }
    } catch {
      setValidation(false);
    }
  });
  return (
    <div className="center">
      {isValid ? (
        <div>
          <Page setValidation={setValidation} />
        </div>
      ) : (
        <Sign setValidation={setValidation} />
      )}
    </div>
  );
};

export default App;
