import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [msg, setMsg] = useState('')
  console.log(msg)
  useEffect(() => {
    
    axios.get('/api').then((res) => setMsg(res.data))
  }, [])

  return <h1>{msg}</h1>
}

export default App