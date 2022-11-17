import React, { useState } from "react";

const signUp = () => {
  const [userInfo, setUserInfo] = useState({});
  const [changeOpt, setOpt] = useState({
    title: "Sign in",
    dataSender: "/userLogin",
    footerText: "sign up",
    regex: "[a-zA-Z0-9][:8]",
  });
  const signUpSetup = () => {};

  const sendData = () => {};

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
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    
      </div>

      <h1>{changeOpt.title}</h1>
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
        <button className="w-100 btn btn-lg btn-outline-primary" type="submit">
          Sign up
        </button>
        <small>
          {" "}
          Have an account? <div onClick={signUpSetup}>sign up</div>
        </small>
      </form>
    </div>
  );
};

export default signUp;
