import React, { useEffect, useReducer, useState } from "react";
import Header from "../Header/Header";
import Home from "../Home/Home";
import cookies from "../../modules/cookie";

const Page = (): any => {
  // loads the main page(home)
  const [load, setLoad] = useState(<Home name={cookies.username} />);

  return (
    <div>
      <Header setLoader={setLoad} username={cookies.username} />
      <br />
      {load}
    </div>
  );
};

export default Page;
