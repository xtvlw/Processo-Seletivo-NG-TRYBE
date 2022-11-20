import React, { FC, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// components
import Sign from "./components/loginPage/Sign";
import Page from "./components/pageSwitch/Page";
// css
import "./app.css";

const App: FC = () => {
  const [isValid, setValidation] = useState(false)

  

  return (
    <div className="center">
      {!isValid ? (
        <Sign setValidation={setValidation}/>
      ) : (
        <div>
          <Page />
        </div>
      )}
    </div>
  );
};

export default App;
