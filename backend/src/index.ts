import express from "express"
import dotenv from "dotenv";
dotenv.config();
const app = express()
const port = process.env.PORT || 3001

app.get("/", (req, res) => {
    res.set({ 'Access-Control-Allow-Origin': '*' }); // ここでヘッダーにアクセス許可の情報を追加
    res.send("Hello from express!!")
})

app.get("/api", (req, res) => {
    res.set({ 'Access-Control-Allow-Origin': '*' }); // ここでヘッダーにアクセス許可の情報を追加
    console.log(`got req: ${req}`)
    res.json({ message: "Hello World! from express" });
})


app.listen(port, () => {
    console.log(`listening on *: ${port}`)
})