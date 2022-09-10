import "./App.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function App() {
  const [message, setMessage] = useState("");
  const [id, setId] = useState<number | null>(null);
  const [content, setContent] = useState<string | null>("");

  useEffect(() => {
    fetch(`http://localhost:3001/api/${id}`) // TODO: rewrite this URL as global URL
      .then((res) => res.json())
      .then((data) => {
        setMessage(`Got content by id: ${id}`);
        setContent(data.content);
      })
      .catch((err) => {
        setMessage(`failed to fetch content by id: ${id}`);
        setContent(null);
      });
  }, [id]);

  useEffect(() => {
    fetch("http://localhost:3001/api")
      .then((res) => res.json())
      .then((data) => setContent(data.content));
  }, []);

  const renderContent = () => {
    if (id && content) {
      return (
        <div>
          <p>{content}</p>
        </div>
      );
    }
  };

  return (
    <div className="App">
      <div className="MainContent">
        <h1>frontend from React</h1>
        <h2>Please Enter Diary Id</h2>
        <input type="text" onChange={(e) => setId(parseInt(e.target.value))} />
        <p>{message}</p>
        {renderContent()}
      </div>
      <div className="Menu">
        <h2>Menu</h2>
        <Link to="./submit">日記を登録する</Link>
      </div>
    </div>
  );
}

export default App;
