import { NavLink } from "react-router-dom";
import styles from "./LoginButton.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../actions/authActions";
import Cookies from "js-cookie";

const LogoutButton = (props) => {
  const dispatch = useDispatch((state) => state.auth);
  const logoutHandler = () => {
    // Delete all cookies
    Object.keys(Cookies.get()).forEach((cookieName) => {
      Cookies.remove(cookieName);
    });

    // Dispatch the logout action
    dispatch(logoutUser());
  };
  return (
    <NavLink
      to="/"
      className={`${styles.LoginButton} + ${props.isActive}`}
      onClick={logoutHandler}
    >
      {props.children}
    </NavLink>
  );
};
export default LogoutButton;
