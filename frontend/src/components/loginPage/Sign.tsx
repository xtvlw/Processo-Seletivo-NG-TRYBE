import React, { useState } from "react";
import "./sign.css";

// interfaces
export interface eventType {
  target: targetType;
}
interface targetType {
  id: string;
  value: string;
}
interface isValidType {
  setValidation: React.ComponentState;
}

const signUp: React.FC<isValidType> = ({ setValidation }) => {
  // request general
  const resConfig: RequestInit = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const pageConfig = [
    {
      host: "/login",
      title: "Sign in",
      footerUser: "sign up",
      footer: "have an account?",
      newUser: false,
    },
    {
      title: "Sign up",
      host: "/newUser",
      footerUser: "sign in",
      footer: "Don't have an account?",
      newUser: true,
    },
  ];
  // states
  const [userInfo, setUserInfo] = useState({ password: "", username: "" });
  const [UI, setUI] = useState(pageConfig[0]);
  const [is_Pass_Valid, setIs_Pass_Valid] = useState("");

  // auxiliar functions
  const changeUI = (): void => {
    UI.newUser ? setUI(pageConfig[0]) : setUI(pageConfig[1]);
  };

  const checkPass = (pass: string) => {
    if (pass.match(/[a-z]/g) && pass.match(/[A-Z]/g) && pass.match(/[0-9]/g)) {
      return true;
    }
    return false;
  };
  // set cookies to the token
  const setToken = (token: string, user: string): void => {
    let timer = new Date();
    timer.setTime(timer.getTime() + 60 * 60 * 24 * 1000);
    document.cookie = `token=${token};expires=${timer.toUTCString()};`;
    document.cookie = `username=${user};`;
  };

  // changes anytime that the user update the form
  const getValues = (event: eventType) => {
    let swap: any = userInfo;
    let elemId = event.target.id;
    swap[elemId] = event.target.value;
    if (
      (swap.password != swap.confirm_password &&
        swap.confirm_password !== "" &&
        swap.confirm_password !== undefined) ||
      !checkPass(swap.password)
    ) {
      setIs_Pass_Valid("notValid");
    } else {
      setIs_Pass_Valid("");
    }
    setUserInfo(swap);
  };

  // functions
  const loginUser = async (): Promise<void> => {
    if (!checkPass(userInfo.password)) {
      alert("Password don't match requiriments");
      return;
    }

    resConfig.body = JSON.stringify(userInfo);
    let res = await fetch("http://localhost:4000/login", resConfig);
    if (res.status == 404) {
      alert("user don't exist");
      return;
    } else {
      let resToken = await res.json();
      setToken(resToken.token, userInfo.username);
      alert("you're logged now");
      setValidation(true);
      location.reload();      
      return;
    }
  };

  // get values and create a new user
  const newUser = async () => {
    if (!checkPass(userInfo.password)) {
      alert("Password don't match requiriments");
      return;
    }
    resConfig.body = JSON.stringify(userInfo);
    
    let res = await (
      await fetch("http://localhost:4000/newUser", resConfig)
    ).json();
    if (res.status == "success") {
      alert("user created, now you can login");
    } else {
      alert(`Error \n${res.reason}`);
    }
  };

  // get from the bootstrap examples
  return (
    <div className="text-center">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable"></div>
      <h1>{UI.title}</h1>
      <form
        onSubmit={UI.newUser ? loginUser : newUser}
        className="p-4 p-md-5 border rounded-3 bg-light"
      >
        <div className="form-floating mb-3">
          <input
            title="Need's to be bigger than 2 characters"
            pattern="[a-zA-Z0-9]{3,}"
            required
            onChange={getValues}
            type="text"
            className={"form-control "}
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
            className={"form-control " + is_Pass_Valid}
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
              className={"form-control " + is_Pass_Valid}
              id="confirm_password"
              placeholder="Confirm Password"
            />
            <label htmlFor="confirm_password">Confirm Password</label>
          </div>
        ) : null}
        <p>
          password must contain at least 1 number, 1 capital letter and have at
          least 8 characters
        </p>
        {UI.title}
        <button className="w-100 btn btn-lg btn-outline-primary" type="submit">
          {UI.footerUser}
        </button>
        <footer>
          <p className="d-flex justify-content-center align-items-baseline">
            {UI.footer}
            <a
              style={{ marginLeft: "5px" }}
              href="#"
              className="nav-item"
              onClick={changeUI}
            >
              {UI.footerUser}
            </a>
          </p>
        </footer>
      </form>
    </div>
  );
};

export default signUp;
