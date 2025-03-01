import { useEffect, useRef, useState } from "react"

function App() {
  const [socket, setSockt] = useState();
  //@ts-ignore
  const inputRef = useRef();
  function sendMessage() {
  if(!socket){
    return;
  }
  //@ts-ignore 
  const message = inputRef.current.value;
  //@ts-ignore
  socket.send(message)
  }
  useEffect(()=>{
    const ws = new WebSocket('ws://localhost:8080')
    //@ts-ignore
    setSockt(ws);
    ws.onopen = ()=>{
      console.log('Connected')
    }
    ws.onerror = (err)=>{
      console.log(err)
    }
    ws.onmessage = (message)=>{ 
      console.log(message.data)
    }
  },[])
  return (
    <div>
      <input ref={inputRef} type="text" placeholder='message'/>
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}
export default App
