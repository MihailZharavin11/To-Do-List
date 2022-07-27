import React, { useEffect, useState } from "react";
import Cloud from "./components/bgCloud/Cloud";
import Form from "./components/form/Form";
import TaskItems from "./components/taskItems/TaskItems";
import styles from "./main.module.scss";
import { v4 as uuidv4 } from "uuid";
import { AnimatePresence, Reorder } from "framer-motion";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion } from "framer-motion";

export type TItems = {
  id: string;
  title: string;
  description: string;
  date?: Date;
  completed: boolean;
};

const App = () => {
  const [items, setItems] = useState<TItems[] | []>([]);
  const [completed, setCompleted] = useState(0);
  const [error, setError] = useState("");
  const [inputError, setInputError] = useState("");

  let valueCompleted = completed ? (completed * 100) / items.length : 0;

  const checkOnError = (title: string, description: string, date?: Date) => {
    if (!title || !description) {
      setError("Заполните все поля!");
      return true;
    }
    if (!isNaN(Number(title)) || !isNaN(Number(description))) {
      setError("Поле не должно содержать только цифры");
      return true;
    }
    if (!!!title.trim() || !!!description.trim()) {
      setError("Поле не может состоять из пробелов");
      return true;
    }
    if (date && Number(date) < new Date().getTime()) {
      setError("Выбранная дата не может быть меньше текущего времени");
      return true;
    }
    setError("");
    return false;
  };

  const addTask = (title: string, description: string, date?: Date): void => {
    const err = checkOnError(title, description, date);
    if (!err) {
      const taskItem: TItems = {
        id: uuidv4(),
        title,
        description,
        date,
        completed: false,
      };
      setItems([...items, taskItem]);
    }
  };

  const deleteItem = (id: string) => {
    const newArrayItem = items.filter((element) => {
      if (element.id !== id) return true;

      if (element.completed === true) {
        setCompleted(completed - 1);
      }
      return false;
    });

    setItems(newArrayItem);
  };

  const changeValue = (
    id: string,
    newTitle: string,
    newDescription: string
  ) => {
    const newArray = items.map((element) =>
      element.id === id
        ? { ...element, title: newTitle, description: newDescription }
        : element
    );
    setItems(newArray);
  };

  const completedTask = (id: string) => {
    const newArray = items.map((element) => {
      if (element.id === id) {
        element.completed === false
          ? setCompleted(completed + 1)
          : setCompleted(completed - 1);
        return { ...element, completed: !element.completed };
      }
      return element;
    });
    setItems(newArray);
  };

  return (
    <div className={styles.App}>
      <div className={styles.appContainer}>
        <div className={styles.appContent}>
          <h1 className={styles.title}>My Tasks</h1>
          <AnimatePresence>
            {error && (
              <motion.h2
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className={styles.errorAdded}
              >
                {error}
              </motion.h2>
            )}
          </AnimatePresence>
          <Form
            error={error}
            setError={setError}
            setInputError={setInputError}
            addTask={addTask}
          />

          <Reorder.Group axis="y" values={items} onReorder={setItems}>
            <AnimatePresence>
              {items.map((element) => {
                return (
                  <Reorder.Item key={element.id} value={element}>
                    <TaskItems
                      key={element.id}
                      id={element.id}
                      title={element.title}
                      description={element.description}
                      completed={element.completed}
                      deleteItem={deleteItem}
                      changeValue={changeValue}
                      completedTask={completedTask}
                      inputError={inputError}
                      setInputError={setInputError}
                      date={element.date}
                    />
                  </Reorder.Item>
                );
              })}
            </AnimatePresence>
          </Reorder.Group>
          <AnimatePresence>
            {items.length > 0 && (
              <motion.div
                key="progress"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={styles.progressBar}
              >
                <CircularProgressbar
                  value={valueCompleted}
                  text={`${valueCompleted.toFixed(1)}%`}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default App;
