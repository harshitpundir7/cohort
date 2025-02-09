import React from 'react'
import { useState } from 'react'

function Timer(){
  const [currentCount, setCurrentCount] = useState(0);
  const [timer, setTimer] =  useState(null)
  function startClock(){
   let ti = setInterval(function(){
      setCurrentCount(c=> c+1)
    },1000)
    setTimer(ti)
  }
  function stopClock(){
    clearInterval(timer);
  }

  return (    
    <div>
    <div>
      {currentCount}
      </div>   
    <button onClick={startClock}>Start</button>
    <button onClick={stopClock}>Stop Clock</button>
    </div>
  )
}

export default Timer
