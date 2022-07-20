import React, { useState } from 'react';
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
  const [value, onChange] = useState(new Date());
  const [completed, setCompleted] = useState(0);
  const valueCompleted = completed ? (completed * 100) / items.length : 0;

  const addTask = (title: string, description: string): void => {
    const taskItem: TItems = {
      id: uuidv4(),
      title,
      description,
      completed: false,
    };
    setItems([...items, taskItem]);
  };

  const deleteItem = (id: string) => {
    const newArrayItem = items.filter((element) => element.id !== id);
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
          <Form addTask={addTask} />
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
                  />
                </Reorder.Item>
              );
            })}
          </Reorder.Group>
          <div
            style={{
              height: '100px',
              width: '100px',
            }}
            className="progress__bar">
            <CircularProgressbar value={valueCompleted} text={`${valueCompleted.toFixed(1)}%`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
