import React, { FC, useState } from "react";
import Table from "../table/Table";

interface propsType {
  name: string;
  balance: number;
}

const Home: React.FC<propsType> = ({ name, balance }) => {
  const [showTable, setShoeTable] = useState(false);
  return (
    <div className="text-center">
      <h1>Hi, {name} </h1>
      <hr />
      <h1>
        Your balance:{" "}
        {new Intl.NumberFormat("pt-br", {
          style: "currency",
          currency: "BRL",
        }).format(balance)}
      </h1>
      <br />
      <button
        className="btn btn-primary w-50"
        onClick={() => setShoeTable(!showTable)}
      >
        {showTable ? "Hide History" : "Show History"}
      </button>
      {showTable ? <Table /> : null}
    </div>
  );
};

export default Home;
