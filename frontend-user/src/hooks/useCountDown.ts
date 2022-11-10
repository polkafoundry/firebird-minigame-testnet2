import { useEffect, useState } from "react";

export const useCountDown = (startDate?: Date) => {
  const [second, setSecond] = useState<string>("0");
  const [minute, setMinute] = useState<string>("0");
  const [hour, setHour] = useState<string>("0");
  const [day, setDay] = useState<string>("0");

  useEffect(() => {
    let countDownInterval = undefined as any;

    if (startDate && startDate >= new Date()) {
      const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

      const countDown = startDate.getTime();
      countDownInterval = setInterval(function () {
        const now = new Date().getTime(),
          distance = countDown - now;

        if (distance >= 0) {
          const currentDay = Math.floor(distance / day)
            .toString()
            .padStart(2, "0");
          const currentHour = Math.floor((distance % day) / hour)
            .toString()
            .padStart(2, "0");
          const currentMinute = Math.floor((distance % hour) / minute)
            .toString()
            .padStart(2, "0");
          const currentSecond = Math.floor((distance % minute) / second)
            .toString()
            .padStart(2, "0");

          setDay(currentDay);
          setHour(currentHour);
          setMinute(currentMinute);
          setSecond(currentSecond);
        }
      }, 0);
    } else {
      setSecond("00");
      setMinute("00");
      setHour("00");
      setDay("00");
    }

    return () => {
      clearInterval(countDownInterval);
    };
  }, [startDate]);

  return {
    day,
    hour,
    minute,
    second,
  };
};
