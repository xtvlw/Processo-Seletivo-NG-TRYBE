import React, { FC, useState } from "react";
import Home from "../Home/Home";
import NewTransfer from "../newTransfer/NewTransfer";

type Loads = {
  setLoader: React.ComponentState;
  username: string;
};

const Header: React.FC<Loads> = ({ setLoader, username}) => {
  return (
    <div className="container">
      <header className="d-flex justify-content-center py-3">
        <div className="d-flex justify-content-around">
          <ul className="nav nav-pills">
            <li className="nav-item">
              <a
                onClick={() =>
                  setLoader(<Home name={username} />)                }
                className="btn nav-link active"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                onClick={() => setLoader(<NewTransfer />)}
                className="btn nav-link"
              >
                New Transfer
              </a>
            </li>
            <li className="nav-item">
              <a className="btn btn-outline-danger ">Log out</a>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;
