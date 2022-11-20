import React, { FC, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// components
import Sign from "./components/loginPage/Sign";
import Page from "./components/pageSwitch/Page";
// css
import "./app.css";

const App = () => {
  const [isValid, setValidation] = useState(() => {
    let cookie = document.cookie;
    if (cookie !== "") {
      return true;
    }
    return false;
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
