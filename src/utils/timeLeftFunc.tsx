export const renderTimeLeft = (
  setDay: (value: React.SetStateAction<number>) => void,
  setHour: (value: React.SetStateAction<number>) => void,
  setMinute: (value: React.SetStateAction<number>) => void,
  setSecond: (value: React.SetStateAction<number>) => void,
  setTimeLeft: (value: React.SetStateAction<boolean>) => void,
  date?: Date | string
) => {
  if (date) {
    const start = new Date();
    const newDate: Date = new Date(date);
    let interval = newDate.getTime() - start.getTime();
    if (interval > 0) {
      interval = interval / 1000;
      setDay(Math.round(interval / 60 / 60 / 24));
      setHour(Math.round((interval / 60 / 60) % 24));
      setMinute(Math.floor((interval / 60) % 60));
      setSecond(Math.round(interval % 60));
    } else {
      setSecond(0);
      setTimeLeft(true);
    }
  }
};
