import "./App.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function App() {
  type Diary = {
    date: string;
    title: string;
    content: string;
  };
  const [message, setMessage] = useState("");
  const [id, setId] = useState<number | null>(null);
  const [diary, setDiary] = useState<Diary | null>(null);

  type DbData = {
    id: number;
    date: string;
    title: string;
    content: string;
  };
  useEffect(() => {
    id && fetch(`http://localhost:3001/api/${id}`) // TODO: rewrite this URL as global URL
      .then((res) => res.json())
      .then((data: DbData) => {
        setMessage(`Got content by id: ${id}`);
        setDiary({
          date: data.date,
          title: data.title,
          content: data.content,
        });
      })
      .catch((err) => {
        setMessage(`failed to fetch content by id: ${id}`);
        setDiary(null);
      });
  }, [id]);

  useEffect(() => {
    getAllDiaries();
  }, []);

  const renderContent = () => {
    if (id && diary) {
      return (
        <div>
          <h2>[{diary.date}] {diary.title}</h2>
          <p>{diary.content}</p>
        </div>
      );
    }
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
        <li key={diary.id} className="diary-list-child"><a onClick={() => setId(diary.id)}>[{diary.date}] {diary.title}</a></li>
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
        <ul className="diary-list">
          {renderDiaryList()}
        </ul>
      </div>
    </div >
  );
}

export default App;
