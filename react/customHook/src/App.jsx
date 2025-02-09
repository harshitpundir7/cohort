import React, { useState } from 'react'
import { usePost, useFetch} from './hooks/UseFetch';
import { usePrev } from './hooks/UsePrev';

function useCounter(){
  const [counter,setCounter] = useState(0);
  function increase(){
    setCounter(c=>c+1);
  }
  return {counter, increase}
}

function App() {
  const post = usePost();
  const [count, setCount] = useState(0);
  const prevCount = usePrev(count);
  const {counter,increase} = useCounter()
  const data = useFetch("https://jsonplaceholder.typicode.com/todos/1")
  return (
    <div>
      <div  style={{ textAlign: 'center', marginTop: '50px' }}>
      {post.title}
      </div>
      <div  style={{ textAlign: 'center', marginTop: '50px' }} onClick={increase}>
        {counter}
      </div>
      {JSON.stringify(data)}
      <div>
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>usePrev Hook</h1>
      <p>Current Count: {count}</p>
      <p>Previous Count: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)} style={{ marginLeft: '10px' }}>Decrement</button>
    </div>
      </div>
    </div>
  )
}

export default App
