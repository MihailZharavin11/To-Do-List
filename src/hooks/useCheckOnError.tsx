import { useState } from "react";

export const useCheckOnError = (title: string, description: string) => {
  const [error, setError] = useState("");

  if (!title || !description) {
    setError("Заполните все поля!");
    return error;
  } else if (!isNaN(Number(title)) || !isNaN(Number(description))) {
    setError("Поле не должно содержать только цифры");
    return error;
  } else if (!!!title.trim() || !!!description.trim()) {
    setError("Поле не может состоять из пробелов");
    return error;
  } else if (!!!title.match("^[a-zA-Z0-9]+$")) {
    setError("Строка не должна содержать специальные символы");
    return error;
  }
  return error;
};
