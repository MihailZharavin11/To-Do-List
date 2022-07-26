import React, { useState } from "react";
import styles from "./form.module.scss";
import TItems from "../../App";
import { motion } from "framer-motion";

type FormProps = {
  addTask: (title: string, description: string) => void;
  setInputError: (value: React.SetStateAction<string>) => void;
  setError: (value: React.SetStateAction<string>) => void;
  error: string;
};

const Form: React.FC<FormProps> = ({
  addTask,
  setInputError,
  setError,
  error,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onClickButton = () => {
    addTask(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <>
      <input
        className={`${styles.inputItemsTitle} ${error ? styles.error : null}`}
        type="text"
        name="title"
        placeholder="Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setInputError("");
          setError("");
        }}
      />
      <input
        className={`${styles.inputItemsDescription} ${
          error ? styles.error : null
        }`}
        type="text"
        name="title"
        placeholder="Description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          setInputError("");
          setInputError("");
        }}
      />
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          onClickButton();
        }}
        className={styles.button}
      >
        Add
      </motion.button>
    </>
  );
};

export default Form;
