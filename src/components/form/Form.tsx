import React, { useState } from 'react';
import styles from './form.module.scss';
import TItems from '../../App';

type FormProps = {
  addTask: (title: string, description: string) => void;
};

const Form: React.FC<FormProps> = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const onClickButton = () => {
    addTask(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <>
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
      <button
        onClick={() => {
          onClickButton();
        }}
        className={styles.button}>
        Add
      </button>
    </>
  );
};

export default Form;
