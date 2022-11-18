import { loadavg } from "os";
import React, { useState } from "react";
import Header from "../Header/Header";
import NewTransfer from "../newTransfer/NewTransfer";
import Home from "../Home/Home";

const Page: React.FC = () => {
  const [transfer, setTransfer] = useState(false);
  const [load, setLoad] = useState(<Home name="as" balance={100} />);
  return (
    <div>
      <Header setLoader={setLoad}/>
      <br />
      {load}
    </div>
  );
};

export default Page;
