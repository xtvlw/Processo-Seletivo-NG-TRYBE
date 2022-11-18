import React, { FC, useState } from "react";

const signUp: FC = () => {
  const pageConfig = [
    {
      host: "/userLogin",
      title: "Sign in",
      footerUser: "sign up",
      footer: "have an account?",
      newUser: false,
    },
    {
      title: "Sign up",
      host: "/newLogin",
      footerUser: "sign in",
      footer: "Don't have an account?",
      newUser: true,
    },
  ];
  // states
  const [userInfo, setUserInfo] = useState({});
  const [UI, setUI] = useState(pageConfig[0]);

  // auxiliar functions
  const changeUI = () => {
    UI.newUser ? setUI(pageConfig[0]) : setUI(pageConfig[1]);
  };

  // interfaces
  interface eventType {
    target: targetType;
  }
  interface targetType {
    id: string;
    value: string;
  }
  interface UItype {
    host: string;
    title: string;
    footerUser: string;
    footer: string;
    newUser: boolean;
  }

  // changes anytime that the user update the form
  const getValues = (event: eventType) => {
    let swap: any = userInfo;
    let elemId = event.target.id;
    swap[elemId] = event.target.value;
    setUserInfo(swap);
    console.log(userInfo);
  };

  // functions
  const sendData: Function = (userConfirm: UItype) => {
    fetch(userConfirm.host, {
      method: "post",
      body: JSON.stringify(userInfo),
    });
  };

  // get from the bootstrap examples
  return (
    <div className="text-center">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable"></div>

      <h1>{UI.title}</h1>
      <form className="p-4 p-md-5 border rounded-3 bg-light">
        <div className="form-floating mb-3">
          <input
            pattern="[a-zA-Z0-9]{3,}"
            required
            onChange={getValues}
            type="text"
            className="form-control"
            id="username"
            placeholder="Username"
          />
          <label htmlFor="floatingInput">Usenarme</label>
        </div>
        <div className="form-floating mb-3">
          <input
            pattern="[a-zA-Z0-9]{8,}"
            required
            onChange={getValues}
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        {!UI.newUser ? (
          <div className="form-floating mb-3">
            <input
              pattern="[a-zA-Z0-9]{8,}"
              required
              onChange={getValues}
              type="password"
              className="form-control"
              id="confirm-password"
              placeholder="Confirm Password"
            />
            <label htmlFor="confirm-password">Confirm Password</label>
          </div>
        ) : null}
        {UI.title}
        <button className="w-100 btn btn-lg btn-outline-primary" type="submit">
          {UI.footerUser}
        </button>
        <footer>
          <p className="d-flex justify-content-center align-items-baseline">
            {UI.footer}
            <a style={{marginLeft: "5px"}} href="#" className="nav-item" onClick={changeUI}>
              {UI.footerUser}
            </a>
          </p>
        </footer>
      </form>
    </div>
  );
};

export default signUp;
