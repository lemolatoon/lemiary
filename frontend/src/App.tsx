import './App.css';
import { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState("")
  useEffect(() => {
    fetch("http://localhost:3001/api")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
  }, [])

  return (
    <div className="App">
      <h1>frontend from React</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
