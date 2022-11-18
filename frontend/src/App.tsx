import React, { FC, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// components
import Sign from "./components/loginPage/Sign";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Page from "./components/pageSwitch/Page";
// css
import "./app.css";

const App: FC = () => {
  const isValid: boolean = true;


  return (
    <div className="center">
      {!isValid ? (
        <Sign />
      ) : (
        <div>
          <Page />
        </div>
      )}
    </div>
  );
};

export default App;
