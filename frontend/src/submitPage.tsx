import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:3001';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
export const SubmitPage = () => {
    return (
        <>
            <h1>Submit Page</h1>
            <button onClick={() => {
                console.log("clicked");
                // fetch("http://localhost:3001/submit", {
                //     method: "POST",
                //     mode: 'no-cors',
                //     credentials: "same-origin",
                //     headers: {
                //         "Accept": "application/json",
                //         'Access-Control-Allow-Origin': '*',
                //         'Content-Type': 'application/json'
                //     },
                //     body: JSON.stringify(
                //         { content: "hello world" }
                //     ),
                // })
                // return;
                axios.post("http://localhost:3001/submit",
                    { content: "hello world" },
                    {
                        headers: {
                            accept: 'application/json',
                            "Content-Type": "application/json",
                        }
                    }
                )
                    .then((res) => console.log(res))
                    .catch((err) => console.log(err));
            }}>Submit</button>
        </>
    )


}
