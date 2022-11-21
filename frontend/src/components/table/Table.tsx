import React, { FC, useState } from "react";
import cookies from "../../modules/cookie";

type table = {
  rawData: object[];
};

const Table: FC<table> = ({ rawData }) => {
  const [tableData, setTable] = useState(rawData);

  const dateFilter = (event: any) => {
    let filter: object[] = [];
    rawData.map((row: any) => {
      let rowDate = new Date(row.created_at);
      let inputDate = new Date(event.target.value);
      if (
        rowDate.getFullYear() === inputDate.getFullYear() &&
        rowDate.getMonth() === inputDate.getMonth() &&
        rowDate.getDate() === inputDate.getDate()
      ) {
        filter.push(row);
      }
    });
    setTable(filter);
  };

  const filter = (event: any): void => {
    let newTable: any[] = [];
    let swap: any;

    if (event.target.value == "All") {
      setTable(rawData);
      return
    }

    for (let i in rawData) {
      swap = rawData[i];
      if (swap.fromUser == cookies.username) {
        swap.type = "Cash-Out";
      } else {
        swap.type = "Cash-In";
      }
      newTable.push(swap);
    }

    let filter: object[] = [];
    newTable.map((row: any) => {
      if (row.type == event.target.value) {
        filter.push(row);
      }
    });
    setTable(filter);
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
          <input
            onChange={dateFilter}
            className="input-group-text"
            id="date"
            type="date"
          />
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
              <tr key={Math.random().toString()}>
                <td>{row.id}</td>
                <td>{row.fromUser}</td>
                <td>{row.toUser}</td>
                <td>
                  {new Intl.NumberFormat("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  }).format(row.value)}
                </td>
                <td>
                  {`${new Date(row.created_at).getFullYear()}/${new Date(
                    row.created_at
                  ).getMonth()}/${new Date(row.created_at).getDay()}`}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
