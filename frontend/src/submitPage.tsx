export const SubmitPage = () => {
    return (
        <>
            <h1>Submit Page</h1>
            <button onClick={() => {
                console.log("clicked");
                fetch("http://localhost:3001/submit", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        { content: "hello world" }
                    ),
                }).then((res) => console.log(res))
                    .catch((err) => console.log(err));
            }}>Submit</button>
        </>
    )


}
