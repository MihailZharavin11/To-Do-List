import React, { useState } from 'react';
import styles from './form.module.scss';
import TItems from '../../App';

type FormProps = {
  addTask: (title: string, description: string) => void;
  setInputError: (value: React.SetStateAction<string>) => void;
  setError: (value: React.SetStateAction<string>) => void;
};

const Form: React.FC<FormProps> = ({ addTask, setInputError, setError }) => {
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
          setInputError('');
          setError('');
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
          setInputError('');
          setInputError('');
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
