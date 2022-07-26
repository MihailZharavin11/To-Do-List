import React, { useState } from "react";
import styles from "./toggle.module.scss";

type TToggleProps = {
  showPicker: boolean;
  setShowPicker: (value: React.SetStateAction<boolean>) => void;
};

const Toggle: React.FC<TToggleProps> = ({ showPicker, setShowPicker }) => {
  return (
    <div className={styles.toggleWrapper}>
      <div className="text">Установить дату окончания задачи</div>
      <label className={styles.switch}>
        <input
          onChange={() => {
            setShowPicker(!showPicker);
          }}
          type="checkbox"
        />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
    </div>
  );
};

export default Toggle;
