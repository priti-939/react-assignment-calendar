import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useDispatch } from "react-redux";
import { loginData, loginStatus } from "../store/actions/action";
import "../App.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailerr, setEmailErr] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordErr, setPasseordErr] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeEmail = (email) => {
    if (email === null) {
      setEmailErr("Please enter email address");
    } else {
      setEmail(email);
      setEmailErr(null);
    }
  };

  const handleChangePassword = (val) => {
    if (val === null) {
      setPasseordErr("Please enter password");
    } else {
      setPasseordErr(null);
      setPassword(val);
    }
  };

  const isValiEmail = (val) => {
    if (!new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(val)) {
      setEmailErr("Invalid Email Address");
      return false;
    } else {
      return true;
    }
  };
  const handleSubmitLogin = () => {
    console.log("emi", email, password);
    if (email !== "" && isValiEmail(email) && password !== "") {
      //   navigate("/list");

      dispatch(loginData({ email: email, password: password }));
      dispatch(loginStatus(true));
    } else {
      if (email === null || email === "") {
        setEmailErr("Please enter email address");
      }
      if (password === null || password === "") {
        setPasseordErr("Please enter password");
      }
    }
  };
  return (
    <div className="App ">
      <div className={styles.loginsection}>
        <p className={styles.heading}>LOGIN</p>
        <div className={styles.login}>
          <label>Email </label>
          <input
            className={styles.logininput}
            type="text"
            name="email"
            value={email}
            placeholder="Enter your email address"
            onChange={(e) => handleChangeEmail(e.target.value)}
          />
          {
            <p className={styles.errcss}>
              {emailerr !== null ? emailerr : null}
            </p>
          }
          <label>Password </label>
          <input
            className={styles.logininput}
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => handleChangePassword(e.target.value)}
          />
          {
            <p className={styles.errcss}>
              {passwordErr !== null ? passwordErr : null}
            </p>
          }
          <button className={styles.loginbtn} onClick={handleSubmitLogin}>
            Login{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
