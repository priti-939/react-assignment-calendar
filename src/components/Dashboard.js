import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout, loginStatus } from "../store/actions/action";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    dispatch(logout());
    dispatch(loginStatus(false));
    // localStorage.removeItem("data");
  };

  return (
    <>
    <Link to='/create-post' className={styles.createpost}>Create Post</Link>
      <div className={styles.profile}>
        <h2>My Profile</h2>
        <p className={styles.profileInfo}> Email : {user.auth.email}</p>
        <p className={styles.profileInfo}>Password: {user.auth.password}</p>
        <button className={styles.loginbtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Dashboard;
