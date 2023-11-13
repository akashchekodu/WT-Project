// Sidebar.jsx

import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaInfo, FaEnvelope, FaUser } from "react-icons/fa"; // Import icons
import styles from "./SideBar.module.css";

const user = {
  name: "John Doe",
  photo: "https://via.placeholder.com/50", // Replace with the actual URL of the user's photo
};

const Sidebar = () => {
  const sidebarItems = [
    { label: "Profile", icon: "profile", route: "/profile" },
    { label: "Home", icon: "home", route: "/" },
    { label: "About", icon: "info", route: "/about" },
    { label: "Contact", icon: "envelope", route: "/contact" },
  ];

  return (
    <div className={styles.sidebar}>
      {/* Profile section */}
      <div className={styles.profileSection}>
        <img src={user.photo} alt={user.name} className={styles.profilePhoto} />
        <p className={styles.profileName}>{user.name}</p>
      </div>
      {/* Sidebar links */}
      <ul className={styles.sidebarList}>
        {sidebarItems.map((item, index) => (
          <li key={index} className={styles.sidebarItem}>
            <NavLink
              to={item.route}
              activeClassName={styles.active}
              className={`${styles.sidebarLink} ${styles[item.icon + "Icon"]}`}
            >
              {getIcon(item.icon)}
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Helper function to dynamically render icons
const getIcon = (iconName) => {
  switch (iconName) {
    case "profile":
      return <FaUser />;
    case "home":
      return <FaHome />;
    case "info":
      return <FaInfo />;
    case "envelope":
      return <FaEnvelope />;
    default:
      return null;
  }
};

export default Sidebar;
