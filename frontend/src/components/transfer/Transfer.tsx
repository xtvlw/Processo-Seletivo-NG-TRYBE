import React, { FC } from "react";

const Transfer: FC = () => {
  return (
    <div className="container">
      <header className="d-flex justify-content-center py-3">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <a href="#" className="nav-link active" aria-current="page">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              New Transfer
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Historic
            </a>
          </li>
        </ul>
        <button className="btn btn-outline-danger">Log out</button>
      </header>
    </div>
  );
};

export default Transfer;
