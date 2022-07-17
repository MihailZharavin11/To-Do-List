import React, { useState } from 'react';
import styles from './main.module.scss';

const App = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div className={styles.App}>
      <div className={styles.circle}></div>
      <div className={styles.circleTwo}></div>
      <div className={styles.circleThree}></div>
      <div className={styles.circleFour}></div>
      <div className={styles.appContainer}>
        <div className={styles.appContent}>
          <h1 className={styles.title}>My Tasks</h1>
          <input
            className={styles.inputItemsTitle}
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <input
            className={styles.inputItemsDescription}
            type="text"
            name="title"
            placeholder="Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <button className={styles.button}>Add</button>
          <div className="taskWrapper">
            <div className="topTask">
              <div className="topLeftSideTask">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-check2-circle"
                  viewBox="0 0 16 16">
                  <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
                </svg>
              </div>
              <div className="topRigthSideTask"></div>
            </div>
            <div className="bottomTask">
              <div className="desctiptionTask"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
