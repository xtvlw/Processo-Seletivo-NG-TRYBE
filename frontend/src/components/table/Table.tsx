import React, { FC, useState } from "react";

type table = {
  rawData: object[];
};

const Table: FC<table> = ({ rawData }) => {
  const cookies: any = document.cookie
    .split(";")
    .map((item) => item.split("="))
    .reduce(
      (acc: any, [k, v]) => (acc[k.trim().replace('"', "")] = v) && acc,
      {}
    );

  const [tableData, setTable] = useState([{}]);

  const filter = (event: any): void => {
    let newTable: any[] = [];
    let swap: any;
    for (let i in rawData) {
      swap = rawData[i];
      if (swap.fromUser == cookies.username) {
        swap.type = "cash-out";
      } else {
        swap.type = "cash-in";
      }
      newTable.push(swap);
    }
    if (event.target.value == "All") {
      setTable(newTable)
    }
    newTable.map((row: any) => {
      if (row.type == event.target.value) {
        return row;
      }
    });
    setTable(newTable);
  };

  return (
    <div>
      <div id="filter" className="center space-between">
        <h1>Filter</h1>
        <div className="input-group mb-3">
          <select onChange={filter} className="form-select dropdown-toggle">
            <option value="All">All</option>
            <option value="Cash-In">Cash-In</option>
            <option value="Cash-Out">Cash-Out</option>
          </select>
          <input className="input-group-text" id="date" type="date" />
        </div>
      </div>
      <br />
      <table className="table table-bordered">
        <thead>
          <tr>
            <td>#</td>
            <td>Sender</td>
            <td>Reciver</td>
            <td>Value</td>
            <td>Date</td>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row: any) => {
            return (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.fromUser}</td>
                <td>{row.toUser}</td>
                <td>
                  {new Intl.NumberFormat("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  }).format(row.value)}
                </td>
                <td>{row.created_at}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
