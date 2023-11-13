import { NavLink } from "react-router-dom";
import styles from "./LoginButton.module.css";

const LoginButton = (props) => {
  return (
    <NavLink
      to="/login"
      className={`${styles.LoginButton} + ${props.isActive}`}
      onClick={props.onClick}
    >
      {props.children}
    </NavLink>
  );
};
export default LoginButton;
