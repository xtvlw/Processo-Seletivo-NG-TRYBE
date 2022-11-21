import React, { FC, useEffect, useState } from "react";
import Table from "../table/Table";
import cookies from '../../modules/cookie'

interface propsType {
  name: string;
}

const Home: React.FC<propsType> = ({ name }) => {
  const [showTable, setShoeTable] = useState(false);
  const [user, setUser] = useState({ balance: 0, transactions: [] });



  // make post request to get all user data
  useEffect(() => {
    console.log(cookies.token);
    
    if (user.balance == 0 && user.transactions.length == 0) {
      let transaction = fetch("http://localhost:4000/getAll", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": cookies.token,
        },
        body: JSON.stringify({ username: cookies.username }),
      })
        .then((res) => res.json())
        .then((data) => {
          setUser({ balance: data.balance, transactions: data.transactions });
        });
    }
  });

  return (
    <div className="text-center">
      <h1>Hi, {name} </h1>
      <hr />
      <h1>
        Your balance:{" "}
        {new Intl.NumberFormat("pt-br", {
          style: "currency",
          currency: "BRL",
        }).format(user.balance)}
      </h1>
      <br />
      <button
        className="btn btn-primary w-50"
        onClick={() => setShoeTable(!showTable)}
      >
        {showTable ? "Hide History" : "Show History"}
      </button>
      {showTable ? <Table rawData={user.transactions}/> : null}
    </div>
  );
};

export default Home;
