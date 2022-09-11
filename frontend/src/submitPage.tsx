import React, { useState } from "react";
import "./submitPage.css";

const DiaryForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  }
  const handleSubmit = () => {
    console.log("clicked");
    console.log(title);
    fetch("http://localhost:3001/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content
      }),
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setTitle("");
    setContent("");
  }

  return (
    <div >
      <div>
        title: <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <textarea className="form" value={content} onChange={handleContentChange} />
      </div>
      <div>
        <button onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  )
}

export const SubmitPage = () => {
  return (
    <div className="App">
      <h1>Submit Page</h1>
      <DiaryForm />
    </div>
  );
};
