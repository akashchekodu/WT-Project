import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
// NavLink comes with an isactive prop which we can use to detect which page we on
// so we can have a special style for that link
import React from "react";
import Logo from "../images/logo.png";
import { links } from "../data";
import { HiOutlineBars3 } from "react-icons/hi2";
import { MdOutlineClose } from "react-icons/md";
import "./navbar.css";
import LoginButton from "./LoginButton";

const Navbar = () => {
  const [isNavShowing, setIsNavShowing] = useState(false);

  const handleNavToggle = () => {
    return setIsNavShowing((prevVAlue) => {
      return !prevVAlue;
    });
  };

  return (
    <nav className="total-nav">
      <div className="container nav__container">
        <Link to="/" className="logo" onClick={handleNavToggle}>
          <img src={Logo} alt="Nav-logo" />
        </Link>
        <ul
          className={`nav__links ${isNavShowing ? "show__nav" : "hide__nav"}`}
        >
          {/* Destructure the links array of object from the links to get each item */}
          {links.map(({ name, path }, index) => {
            return (
              <li key={index}>
                <NavLink
                  to={path}
                  className={({ isActive }) => (isActive ? "active-nav" : "")}
                  onClick={handleNavToggle}
                >
                  {name}
                </NavLink>
              </li>
            );
          })}
          <li>
            <LoginButton
              className={({ isActive }) => (isActive ? "active-nav" : "")}
              onClick={handleNavToggle}
            >
              Login
            </LoginButton>
          </li>
        </ul>
        <button onClick={handleNavToggle} className="nav__toggle-btn">
          {isNavShowing ? <MdOutlineClose /> : <HiOutlineBars3 />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
