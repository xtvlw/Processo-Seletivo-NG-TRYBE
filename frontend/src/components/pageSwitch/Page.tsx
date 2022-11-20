import React, { useEffect, useReducer, useState } from "react";
import Header from "../Header/Header";
import Home from "../Home/Home";

interface user {
  balance: number;
  username: string;
}

const Page = (): any => {
  var userInfo: user;
  // create a object with all the data from cookies
  const cookies: any = document.cookie
    .split(";")
    .map((item) => item.split("="))
    .reduce(
      (acc: any, [k, v]) => (acc[k.trim().replace('"', "")] = v) && acc,
      {}
    );

  // loads the main page(home)
  const [load, setLoad] = useState(
    <Home name={cookies.username} />
  );

  return (
    <div>
      <Header
        setLoader={setLoad}
        username={cookies.username}
      />
      <br />
      {load}
    </div>
  );
};

export default Page;
