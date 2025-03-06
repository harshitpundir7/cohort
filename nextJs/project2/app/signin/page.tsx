"use client"

import axios from "axios"
import { useState } from "react"


function page() {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    async function sendData(){
        const response = await  axios.post("http://localhost:3000/api/v1/signin",{
            name,
            password
        })
    }
  return (
    <div>
      <input type="text" onChange={(e)=> setName(e.target.value)}/>
      <input type="password" onChange={(e)=>setPassword(e.target.value)}/>
      <button onClick={sendData}>Signin</button>
    </div>
  )
}

export default page
