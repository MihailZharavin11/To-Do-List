import React, { useState } from 'react';
import Cloud from './components/bgCloud/Cloud';
import Form from './components/form/Form';
import TaskItems, { TTaskItems } from './components/taskItems/TaskItems';
import styles from './main.module.scss';
import { v4 as uuidv4 } from 'uuid';

export type TItems = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

const App = () => {
  const [items, setItems] = useState<TItems[] | []>([]);

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
    const newArray = items.map((element) =>
      element.id === id ? { ...element, completed: !element.completed } : element,
    );
    setItems(newArray);
  };

  return (
    <div className={styles.App}>
      <Cloud />
      <div className={styles.appContainer}>
        <div className={styles.appContent}>
          <h1 className={styles.title}>My Tasks</h1>
          <Form addTask={addTask} />
          {items.map((element) => {
            return (
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
