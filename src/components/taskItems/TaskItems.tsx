import React, { useState, useEffect } from "react";
import styles from "./taskItems.module.scss";
import { motion } from "framer-motion";
import { BsCheck2Circle, BsPencil, BsTrash } from "react-icons/bs";
import { renderTimeLeft } from "../../utils/timeLeftFunc";

export type TTaskItems = {
  id: string;
  title: string;
  description: string;
  deleteItem: (id: string) => void;
  changeValue: (id: string, newTitle: string, newDescription: string) => void;
  completed: boolean;
  completedTask: (id: string) => void;
  inputError: string;
  setInputError: (value: React.SetStateAction<string>) => void;
  date?: Date;
};

const TaskItems: React.FC<TTaskItems> = ({
  id,
  title,
  description,
  deleteItem,
  changeValue,
  completed,
  completedTask,
  inputError,
  setInputError,
  date,
}) => {
  const [toogleDescription, setToogleDescription] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [timeLeft, setTimeLeft] = useState(false);

  useEffect(() => {
    if (completed) return;
    let interval = setInterval(() => {
      renderTimeLeft(date, setDay, setHour, setMinute, setSecond, setTimeLeft);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [day, hour, minute, second, completed]);

  const editItem = () => {
    setToogleDescription(!toogleDescription);
    if (
      toogleDescription &&
      (newTitle !== title || newDescription !== description)
    ) {
      if (!newTitle || !newDescription) {
        setInputError("Все поля должны быть заполнены!");
      } else {
        setInputError("");
        changeValue(id, newTitle, newDescription);
      }
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      initial={{ x: -1000, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.taskWrapper}
    >
      <div className={styles.topTask}>
        <div className={styles.topLeftSideTask}>
          <BsCheck2Circle
            onClick={() => completedTask(id)}
            className={`${styles.checkIcons} ${
              completed && styles.checkIcons_completed
            }`}
          />
          <h2
            className={`${styles.taskItem__title} ${
              completed && styles.completed
            }`}
          >
            {toogleDescription ? (
              <input
                className={styles.taskInput}
                onChange={(e) => setNewTitle(e.target.value)}
                value={newTitle}
                type="text"
              />
            ) : (
              title
            )}
          </h2>
        </div>
        <div className={styles.topRigthSideTask}>
          <BsPencil className={styles.pencilIcon} onClick={editItem} />
          <BsTrash
            className={styles.trashIcon}
            onClick={() => deleteItem(id)}
          />
        </div>
      </div>
      <div className={styles.bottomTask}>
        <div className={styles.descriptionTask}>
          {toogleDescription ? (
            <input
              className={styles.taskInput}
              onChange={(e) => setNewDescription(e.target.value)}
              value={newDescription}
              type="text"
            />
          ) : (
            <p className={completed ? styles.completed : null}>{description}</p>
          )}
          <p
            className={`${completed ? styles.completed : null} ${
              timeLeft && styles.timeLeft
            }`}
          >
            {date && (
              <div className={styles.taskDate}>
                {day}D {hour}H {minute}M {second}S
              </div>
            )}
          </p>
        </div>
      </div>
      {inputError ? <p className={styles.inputError}>{inputError}</p> : null}
    </motion.div>
  );
};

export default TaskItems;
