import "./App.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function App() {
  const [message, setMessage] = useState("");
  const [id, setId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState<string | null>("");

  type GotDbData = {
    id: number;
    date: string;
    title: string;
    content: string;
  };
  useEffect(() => {
    id && fetch(`http://localhost:3001/api/${id}`) // TODO: rewrite this URL as global URL
      .then((res) => res.json())
      .then((data: GotDbData) => {
        setMessage(`Got content by id: ${id}`);
        setTitle(data.title);
        setDate(data.date);
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

    getAllDiaries();
  }, []);

  const renderContent = () => {
    if (id && content) {
      return (
        <div>
          <h2>[{date}] {title}</h2>
          <p>{content}</p>
        </div>
      );
    }
  };


  type DbData = {
    id: number;
    date: string;
    title: string;
    content: string;
  };
  const [diaries, setDiaries] = useState<DbData[]>([]);
  const getAllDiaries = async () => {
    fetch("http://localhost:3001/api/all/")
      .then((res) => res.json())
      .then((data) => { setDiaries(data); })
      .catch((err) => console.log(err));
  };

  const renderDiaryList = () => {
    return diaries.map((diary) => {
      return (
        <div key={diary.id}><button onClick={() => setId(diary.id)}>[{diary.date}] {diary.title}</button></div>
      );
    });
  }

  const renderInputIdArea = () => {
    return <div>
      <h2>Please Enter Diary Id</h2>
      <input type="text" onChange={(e) => setId(parseInt(e.target.value))} />
    </div>
  }

  return (
    <div className="App">
      <div className="MainContent">
        <h1>frontend from React</h1>
        <button onClick={getAllDiaries}>Get ALL</button>
        {renderInputIdArea()}
        <p>{message}</p>
        <div className="diary">
          {renderContent()}
        </div>
      </div>
      <div className="Menu">
        <h2>Menu</h2>
        <Link to="./submit">日記を登録する</Link>
        <div className="diary-list">
          {renderDiaryList()}
        </div>
      </div>
    </div>
  );
}

export default App;
