import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { GrHistory } from "react-icons/gr";
import Sidebar from "../Sidebar/Sidebar";

const Navbar = ({ result }) => {
  const [sidebar, setSidebar] = useState(false);

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <img src="calculator.png" alt="calculator" />
        <h3>Calculator</h3>
      </div>

      <GrHistory
        type="button"
        onClick={() => setSidebar(!sidebar)}
        title="History"
        className={styles.history}
        fontSize={"20px"}
      />
      <div
        className={
          sidebar
            ? `${styles.sidebar} ${styles.sidebarVisible}`
            : `${styles.sidebar}`
        }
      >
        <Sidebar result={result} />
      </div>
    </div>
  );
};

export default Navbar;
