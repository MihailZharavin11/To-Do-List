import React, { useEffect, useState } from 'react';
import Cloud from './components/bgCloud/Cloud';
import Form from './components/form/Form';
import TaskItems, { TTaskItems } from './components/taskItems/TaskItems';
import styles from './main.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { Reorder } from 'framer-motion';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
export type TItems = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

const App = () => {
  const [items, setItems] = useState<TItems[] | []>([]);
  const [completed, setCompleted] = useState(0);
  const [error, setError] = useState('');
  const [inputError, setInputError] = useState('');

  let valueCompleted = completed ? (completed * 100) / items.length : 0;

  const addTask = (title: string, description: string): void => {
    if (!title || !description) {
      setError('Заполните все поля!');
    } else {
      setError('');
      const taskItem: TItems = {
        id: uuidv4(),
        title,
        description,
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

  const changeValue = (id: string, newTitle: string, newDescription: string) => {
    const newArray = items.map((element) =>
      element.id === id ? { ...element, title: newTitle, description: newDescription } : element,
    );
    setItems(newArray);
  };

  const completedTask = (id: string) => {
    const newArray = items.map((element) => {
      if (element.id === id) {
        element.completed === false ? setCompleted(completed + 1) : setCompleted(completed - 1);
        return { ...element, completed: !element.completed };
      }
      return element;
    });
    setItems(newArray);
  };

  return (
    <div className={styles.App}>
      <Cloud />
      <div className={styles.appContainer}>
        <div className={styles.appContent}>
          <h1 className={styles.title}>My Tasks</h1>
          {error ? <h2 className={styles.errorAdded}>{error}</h2> : null}
          <Form setError={setError} setInputError={setInputError} addTask={addTask} />

          <Reorder.Group axis="y" values={items} onReorder={setItems}>
            {items.map((element) => {
              return (
                <Reorder.Item key={element.title} value={element}>
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
                  />
                </Reorder.Item>
              );
            })}
          </Reorder.Group>
          <div className={styles.progressBar}>
            {items.length > 0 ? (
              <CircularProgressbar value={valueCompleted} text={`${valueCompleted.toFixed(1)}%`} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
