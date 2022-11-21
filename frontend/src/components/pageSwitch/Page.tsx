import React, { useState } from "react";
import Header from "../Header/Header";
import Home from "../Home/Home";
import cookies from "../../modules/cookie";

const Page: React.FC<React.ComponentState> = ({ setValidation }) => {
  // loads the main page(home)
  const [load, setLoad] = useState(<Home name={cookies.username} />);

  return (
    <div>
      <Header
        setValidation={setValidation}
        setLoader={setLoad}
        username={cookies.username}
      />
      <br />
      {load}
    </div>
  );
};

export default Page;
