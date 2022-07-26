import React, { useEffect, useRef, useState } from "react";
import styles from "./form.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import DateTimePicker from "react-datetime-picker";
import Toggle from "../toggle/Toggle";

type FormProps = {
  addTask: (title: string, description: string, date?: Date) => void;
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
  const [value, onChange] = useState<Date | undefined>(undefined);
  const [showPicker, setShowPicker] = useState(false);

  const onClickButton = () => {
    addTask(title, description, value);
    setTitle("");
    setDescription("");
  };

  return (
    <>
      <form className={styles.formWrapper}>
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
      </form>

      <div className={styles.datePicker}>
        <div className="toogle">
          <Toggle showPicker={showPicker} setShowPicker={setShowPicker} />
        </div>
        <div className="datePicker__item">
          <AnimatePresence>
            {showPicker && (
              <motion.div
                key="datePicker"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <DateTimePicker
                  minDate={new Date()}
                  onChange={onChange}
                  value={value}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

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
