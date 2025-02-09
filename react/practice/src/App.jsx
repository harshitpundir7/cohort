import React from 'react'
import { useRef } from 'react';
import { useState } from 'react'
import Timer from './components/Timer2';

function App() {
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef(null)
  function startTimer(){
    intervalRef.current = setInterval(() => {
      setTimer((prevTime) => prevTime + 1);
    }, 1000);
  }
  function stopClock() {
    console.log(intervalRef.current);
    clearInterval(intervalRef.current);
    intervalRef.current = null;  // This is the correct way
  }  
  return (
    <>
    <div>
    <Timer/>
    </div>
    <div>
      <div>
      {timer}
      </div>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopClock}>Stop</button>
    </div>
    </>
  )
}

export default App

