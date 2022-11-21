import React, { FC, useState } from "react";
import cookies from '../../modules/cookie'

interface targetType {
  id: string;
  value: string;
}
export interface eventType {
  target: targetType;
}

const NewTransfer: React.FC = () => {
  const [transferData, setTransferData] = useState({ fromUser: "", value: 0 });

  const getValues = (event: eventType) => {
    let swap: any = transferData;
    let elemId = event.target.id;
    swap[elemId] = event.target.value;
    setTransferData(swap);
  };

  const makeTransaction = async (): Promise<void> => {
    let swap = transferData
    swap.value = Number(swap.value)
    swap.fromUser = cookies.username

    setTransferData(swap);

    let transaction = await fetch("http://localhost:4000/makeTransfer", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": cookies.token,
      },
      body: JSON.stringify(transferData),
    });

    if(transaction.status == 401) {
      alert("you need to login again!")
      document.cookie = "token='';"
    }

    let result = await transaction.json();
    
    let message;
    if (result.reason == undefined) {
      message = ''
    } else {
      message = result.reason
    }
    alert(`${result.status} \n${message}`)
  };

  return (
    <form onSubmit={makeTransaction} className="main-modal w-75 mx-auto">
      <h1>Make a new transaction</h1>
      <div className="input-group mb-3">
        <span className="input-group-text">Username</span>
        <span className="input-group-text">@</span>
        <input
          id="toUser"
          onChange={getValues}
          className="form-control"
          placeholder="Username"
          type="text"
        />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text">Value</span>
        <span className="input-group-text">BRL</span>
        <input
          id="value"
          onChange={getValues}
          className="form-control"
          placeholder="Value"
          type="number"
        />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text">Password</span>
        <input
          id="password"
          onChange={getValues}
          className="form-control"
          placeholder="Password"
          type="password"
        />
      </div>
      <div className="d-flex mb-3">
        <button className="btn btn-outline-danger me-auto p-2 w-50">
          cancel
        </button>
        <button className="btn btn-success p-2 w-50">Confirm</button>
      </div>
    </form>
  );
};

export default NewTransfer;
