import { useEffect, useState } from 'react';

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8080');
    
    newSocket.onopen = () => {
      console.log("Connection Established");
      newSocket.send("Hello Server!");
    };
    
    newSocket.onmessage = (message) => {
      console.log("Message received: ", message.data);
      setMessages(prev => [...prev, message.data.toString()]);
    };
    
    setSocket(newSocket);
    
    // Cleanup function
    return () => {
      newSocket.close();
    };
  }, []); // Empty dependency array to ensure the effect runs only once

  const sendMessage = (message: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    }
  };

  return (
    <div>
      <h1>WebSocket Chat</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <button onClick={() => sendMessage("Test message")}>Send Test Message</button>
    </div>
  );
}

export default App;