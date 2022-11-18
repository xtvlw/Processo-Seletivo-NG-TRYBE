import React, { FC } from "react";

const Header: FC = () => {
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
            <div className="nav-link">Historic</div>
          </li>
          <li>
            <button className="btn btn-outline-danger">Log out</button>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Header;
