import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useDispatch } from "react-redux";
import {
  loginData,
  loginStatus,
  registrationAction,
} from "../store/actions/action";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [emailerr, setEmailErr] = useState(null);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
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
    if (email !== "" && isValiEmail(email) && password !== "") {
      console.log('emial valid')
      fetch("http://localhost:4007/auth/signup", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          name: name,
          phone: phone,
        }),
      })
        .then((resData) => {
            console.log('api response',resData)
            dispatch(registrationAction(resData));
            navigate("/");
        }

        )
        .catch((err) => console.log(err));
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
    <div className="maindiv">
      <div className={styles.loginsection}>
        <p className={styles.heading}>Registraion</p>
        <div className={styles.login}>
          <label>Name </label>
          <input
            className={styles.logininput}
            type="text"
            name="name"
            value={name}
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />
          <label>Phone number </label>
          <input
            className={styles.logininput}
            type="text"
            name="phone"
            value={phone}
            placeholder="Enter your phone number"
            onChange={(e) => setPhone(e.target.value)}
          />
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
            Registraion{" "}
          </button>
          <Link to="/" className={styles.register}>
            Already have an account click here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;
