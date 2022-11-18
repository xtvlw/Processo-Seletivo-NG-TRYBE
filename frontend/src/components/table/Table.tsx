import { eventWrapper } from "@testing-library/user-event/dist/utils";
import React, { FC, useState } from "react";

const Table: FC = () => {
  const data = [
    {
      id: "0",
      fromUser: "user1",
      toUser: "user2",
      value: 100,
      date: "10-10-10",
      type: "Cash-Out",
    },
  ];

  const [tableDate, setTable] = useState(data);

  const setFilter = (event: any) => {
    data.map((row) => {
      if (row.type == event.target.value) {
        return row;
      }
    });

    // setTable(filterData)
    console.log(event.target.value);
  };

  return (
    <div>
      <div id="filter" className="center space-between">
        <h1>Filter</h1>
        <div className="input-group mb-3">
          <select className="form-select dropdown-toggle">
            <option value="All">All</option>
            <option value="Cash-In">Cash-In</option>
            <option value="Cash-Out">Cash-Out</option>
          </select>
          <input
            className="input-group-text"
            id="date"
            onChange={setFilter}
            type="date"
          />
        </div>
      </div>
      <br />
      <table className="table table-bordered">
        <tbody>
          <tr>
            <td>#</td>
            <td>Type</td>
            <td>Value</td>
            <td>Date</td>
          </tr>

          {tableDate.map((row) => {
            let value = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(row.value);
            return (
              <tr key={Math.random()}>
                <td>{row.id}</td>
                <td>{row.fromUser}</td>
                <td>{value}</td>
                <td>{row.date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
