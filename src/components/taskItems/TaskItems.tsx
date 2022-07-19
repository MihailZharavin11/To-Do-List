import React, { useState } from 'react';
import styles from './taskItems.module.scss';

export type TTaskItems = {
  id: string;
  title: string;
  description: string;
  deleteItem: (id: string) => void;
  changeValue: (id: string, newTitle: string, newDescription: string) => void;
};

const TaskItems: React.FC<TTaskItems> = ({ id, title, description, deleteItem, changeValue }) => {
  const [toogleDescription, setToogleDescription] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  return (
    <div className={styles.taskWrapper}>
      <div className={styles.topTask}>
        <div className={styles.topLeftSideTask}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            style={{
              cursor: 'pointer',
            }}
            className="bi bi-check2-circle"
            viewBox="0 0 16 16">
            <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
            <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
          </svg>
          <h2>
            {toogleDescription ? (
              <input onChange={(e) => setNewTitle(e.target.value)} value={newTitle} type="text" />
            ) : (
              title
            )}
          </h2>
        </div>
        <div className="topRigthSideTask">
          <svg
            onClick={() => {
              setToogleDescription(!toogleDescription);
              if (toogleDescription) {
                changeValue(id, newTitle, newDescription);
              }
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            style={{
              color: 'green',
              cursor: 'pointer',
            }}
            className="bi bi-pencil"
            viewBox="0 0 16 16">
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
          </svg>
          <svg
            onClick={() => deleteItem(id)}
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            style={{
              color: 'red',
              cursor: 'pointer',
              margin: '0px 34px',
            }}
            className="bi bi-trash"
            viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
            <path
              fillRule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
          </svg>
        </div>
      </div>
      <div className={styles.bottomTask}>
        <div className="desctiptionTask">
          {toogleDescription ? (
            <input
              onChange={(e) => setNewDescription(e.target.value)}
              value={newDescription}
              type="text"
            />
          ) : (
            description
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskItems;
