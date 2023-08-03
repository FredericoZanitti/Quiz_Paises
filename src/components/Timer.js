import React, { useState, useEffect } from "react";

function Timer({ tempo, onTimerComplete }) {
  const [seconds, setSeconds] = useState(tempo);

  useEffect(() => {
    setSeconds(tempo);
  }, [tempo]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        clearInterval(interval);
        if (onTimerComplete) {
          onTimerComplete();
        }
      }
    }, 1000);

    const tempoMenorQue10 = document.getElementById("tempo-regressivo");
    if (seconds < 10) {
      tempoMenorQue10.style.backgroundColor = "#c93131";
    } else {
      tempoMenorQue10.style.backgroundColor = "#3498db";
    }

    return () => clearInterval(interval);
  }, [seconds, onTimerComplete]);

  return (
    <div>
      <p>{seconds < 10 ? `0:0${seconds}` : `0:${seconds}`}</p>
    </div>
  );
}

export default Timer;
