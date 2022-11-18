import React, { FC } from "react";

const Table: FC = () => {
  const data = [
    {
      id: "0",
      fromUser: "user1",
      toUser: "user2",
      value: 100,
      date: "10-10-10",
    },
  ];

  return (
    <div>
      <table className="table table-bordered">
        <tr>
          <td>#</td>
          <td>Sender</td>
          <td>Reciver</td>
          <td>Value</td>
          <td>Date</td>
        </tr>
        {data.map((row) => {
          let value = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(row.value);
          return (
            <tr>
              <td>{row.id}</td>
              <td>{row.fromUser}</td>
              <td>{row.toUser}</td>
              <td>{value}</td>
              <td>{row.date}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Table;
