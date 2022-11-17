import React, { useState } from "react";

const signUp = () => {
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

  // functions
  const sendData = () => {
    fetch(UI.host, {
        method: "post",
        body: JSON.stringify(userInfo)
    });
  };

  // auxiliar functions
  const changeUI = () => {
    UI.newUser ? setUI(pageConfig[0]) : setUI(pageConfig[1]);
  };
  // changes anytime that the user update the form
  const getValues = (event: any) => {
    let swap: any = userInfo;
    let elemId = event.target.id;
    swap[elemId] = event.target.value;
    setUserInfo(swap);
    console.log(userInfo);
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
        <small>
          {UI.footer}
          <p onClick={changeUI}>{UI.footerUser}</p>
        </small>
      </form>
    </div>
  );
};

export default signUp;
