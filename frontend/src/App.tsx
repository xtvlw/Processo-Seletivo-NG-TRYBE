import React, { FC, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// components
import Sign from "./components/loginPage/Sign";
import Table from "./components/table/Table";
import Header from "./components/Header/Header";
// css
import "./app.css";

const App: FC = () => {
  const [page, setPage] = useState(<Table />);
  const isValid: boolean = true;


  return (
    <div className="center">
      {!isValid ? (
        <Sign />
      ) : (
        <div>
          <Header />
          <br />
          {page}
        </div>
      )}
    </div>
  );
};

export default App;
