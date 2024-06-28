import React, { useEffect, useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import styles from "./Sidebar.module.css";

const Sidebar = ({ result }) => {
  const [calculations, setCalculations] = useState([]);

  //Function to handle calculation delete
  const handleCalculationDelete = (item) => {
    const filteredItems = calculations.filter(
      (calculation) => calculation.id !== item.id
    );
    localStorage.setItem("calu_calu", JSON.stringify(filteredItems));
    setCalculations(filteredItems);
  };

  //Use effect to get history when the sidebar page loads
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("calu_calu"));
    if (items) {
      setCalculations(items);
    }
  }, [result]);

  return (
    <div className={styles.sidebar}>
      <h3>History</h3>
      <div className={styles.historyItems}>
        {calculations.length === 0 ? (
          <p>No History available.</p>
        ) : (
          calculations.map((item) => {
            return (
              <div key={item.id} className={styles.item}>
                <p>{item.expression}</p>=<p>{item.answer}</p>
                <RiCloseCircleLine
                  title="Delete"
                  type="button"
                  className={styles.closeBtn}
                  onClick={() => handleCalculationDelete(item)}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Sidebar;
