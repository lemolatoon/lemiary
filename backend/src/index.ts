import express from "express"
import dotenv from "dotenv";
import mysql from "mysql2";
dotenv.config();
const app = express()
const port = process.env.PORT || 3001
// console.log({
//     // host: "172.20.0.2",
//     host: "db",
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE,
// });
const connection = (() => {
    let get_connection = () => {
        try {
            return [true, mysql.createConnection({
                host: "db",
                user: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DATABASE,
            })];
        } catch (e) {
            console.log(`Failed to connect to DB.\n${e}`);
            console.log("Trying to connect again....");
            return [false, null];
        }
    }
    const sleepFunc = (m: number) => {
        return new Promise((resolve) => setTimeout(resolve, m));
    };
    while (true) {
        const [flag, connection] = get_connection();
        if (flag) {
            // This cast is safe because when `get_connectionl` returns true as flag, connection must not be null. 
            return connection as mysql.Connection;
        }
    }
})();

app.get("/", async (req, res) => {
    res.set({ 'Access-Control-Allow-Origin': '*' }); // ここでヘッダーにアクセス許可の情報を追加
    res.send("Hello from express!!")
})

app.get("/api", async (req, res) => {
    res.set({ 'Access-Control-Allow-Origin': '*' }); // ここでヘッダーにアクセス許可の情報を追加
    connection.query(
        "SELECT * FROM `diaries`",
        (err, results: any, fields) => {
            if (err) {
                console.log("connection end with status 1");
                throw err;
            }
            res.json(results[0]);
            console.log(results);
            console.log(results.toString());
        }
    )
    console.log("connection end with status 0");
    // res.json({ message: "Hello World! from express" });
})


app.listen(port, () => {
    console.log(`listening on *: ${port}`)
})
