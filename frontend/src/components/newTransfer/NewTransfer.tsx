import React, { FC } from "react";

const NewTransfer: React.FC = () => {
  return (
    <div className="main-modal w-75 mx-auto">
      <h1>Make a new transaction</h1>
      <div className="input-group mb-3">
        <span className="input-group-text">Username</span>
        <span className="input-group-text">@</span>
        <input className="form-control" placeholder="Username" type="text" />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text">Value</span>
        <span className="input-group-text">BRL</span>
        <input className="form-control" placeholder="Value" type="number" />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text">Password</span>
        <input className="form-control" placeholder="Password" type="password" />
      </div>
      <div className="d-flex mb-3">
        <button className="btn btn-outline-danger me-auto p-2 w-50">
          cancel
        </button>
        <button className="btn btn-success p-2 w-50">Confirm</button>
      </div>
    </div>
  );
};

export default NewTransfer;
