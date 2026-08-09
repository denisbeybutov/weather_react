import { useState, useEffect } from "react";
import './Clock.css'

export default function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
          const interval = setInterval(() => {
              setTime(new Date());
          }, 1000);

          return () => clearInterval(interval);
      }, []);

      return (
          <div className="clock">
                <div>{time.toLocaleDateString('ru-RU')}</div>
                <div>{time.toLocaleTimeString("ru-RU")}</div>
          </div>
      );
  }