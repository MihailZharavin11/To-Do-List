import React, { useState, useEffect } from "react";
import styles from "./taskItems.module.scss";
import { motion } from "framer-motion";

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
      renderTimeLeft();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [day, hour, minute, second, completed]);

  const renderTimeLeft = () => {
    if (date) {
      const start = new Date();
      let interval = date.getTime() - start.getTime();
      if (interval > 0) {
        interval = interval / 1000;
        setDay(Math.round(interval / 60 / 60 / 24));
        setHour(Math.round((interval / 60 / 60) % 24));
        setMinute(Math.floor((interval / 60) % 60));
        setSecond(Math.round(interval % 60));
      } else {
        setSecond(0);
        setTimeLeft(true);
      }
    }
  };

  const completedStyles = {
    textDecorationLine: "line-through",
    color: "#c4c4c4",
  };

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            onClick={() => completedTask(id)}
            style={{
              cursor: "pointer",
              color: completed ? "green" : "grey",
            }}
            className="bi bi-check2-circle"
            viewBox="0 0 16 16"
          >
            <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
            <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
          </svg>
          <h2 style={completed ? completedStyles : undefined}>
            {toogleDescription ? (
              <input
                className={styles.taskInput}
                onChange={(e) => setNewTitle(e.target.value)}
                defaultValue={newTitle}
                value={newTitle}
                type="text"
              />
            ) : (
              title
            )}
          </h2>
        </div>
        <div className="topRigthSideTask">
          <svg
            onClick={editItem}
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            style={{
              color: "green",
              cursor: "pointer",
            }}
            className="bi bi-pencil"
            viewBox="0 0 16 16"
          >
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
          </svg>
          <svg
            onClick={() => deleteItem(id)}
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            style={{
              color: "red",
              cursor: "pointer",
              margin: "0px 34px",
            }}
            className="bi bi-trash"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
            <path
              fillRule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
          </svg>
        </div>
      </div>
      <div className={styles.bottomTask}>
        <div className={styles.descriptionTask}>
          {toogleDescription ? (
            <input
              className={styles.taskInput}
              onChange={(e) => setNewDescription(e.target.value)}
              value={newDescription}
              defaultValue={newDescription}
              type="text"
            />
          ) : (
            <p style={completed ? completedStyles : undefined}>{description}</p>
          )}
          <p
            className={`${completed && styles.completed} ${
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
