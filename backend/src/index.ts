import util from "util";
import express, { Request } from "express";
import dotenv from "dotenv";
import mysql from "mysql2";
import bodyParser from "body-parser";
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
const connection = (() => {
  const get_connection: () => [boolean, mysql.Connection | null] = () => {
    try {
      return [
        true,
        mysql.createConnection({
          host: "db",
          user: process.env.MYSQL_USER,
          password: process.env.MYSQL_PASSWORD,
          database: process.env.MYSQL_DATABASE,
        }),
      ];
    } catch (e) {
      console.log(`Failed to connect to DB.\n${e}`);
      console.log("Trying to connect again....");
      return [false, null];
    }
  };
  while (true) {
    const [flag, connection] = get_connection();
    if (flag) {
      // This cast is safe because when `get_connection` returns true as flag, connection must not be null.
      return connection as mysql.Connection;
    }
  }
})();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Make sure to avoid blocking by CORS policy when local host using debugging.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/", async (req, res) => {
  res.send("Hello from express!!");
});

app.get("/api", async (req, res) => {
  connection.query("SELECT * FROM `diaries`", (err, results: any, fields) => {
    if (err) {
      console.log("connection end with status 1");
      throw err;
    }
    res.json(results[0]);
    console.log(results);
    console.log(results.toString());
  });
  console.log("connection end with status 0");
});

type IdReq = { diary_id: number };
app.get("/api/:diary_id(\\d+)", async (req: Request<IdReq>, res) => {
  console.log(`req: ${util.format(req.params.diary_id)}`);
  connection.query(
    `SELECT * FROM \`diaries\` WHERE \`id\` = ${req.params.diary_id}`,
    (err, results: any, fields) => {
      if (err) {
        console.log("connection end with status 1");
        res.status(404).json({ message: "Not Found" });
      } else {
        res.json(results[0]);
        console.log(results);
      }
    }
  );
});


type DbData = {
  id: number;
  date: string;
  title: string;
  content: string;
};
app.get("/api/all/", async (req, res) => {
  console.log("Get: /api/all/");
  connection.query(
    `SELECT * FROM \`diaries\` ORDER BY \`date\` DESC`,
    (err, results, fields) => {
      console.log("err: ", err);
      console.log("results: ", results);
      console.log("fields: ", fields);
      if (err) {
        console.log(err);
        res.status(404).json({ message: "Not Found" });
      } else {
        console.log(results);
        res.json(results);
      }
    }
  )
})

type DiaryReq = { title: string, content: string };
app.post("/submit/", async (req: Request<IdReq>, res) => {
  console.log("submit post detected!");
  console.log(req.body);
  const get_formatted_datetime = () => {
    const jstDate = new Date(Date.now() + ((new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000));
    console.log(util.format(jstDate.getTimezoneOffset()));
    const y = jstDate.getFullYear();
    const m = ('0' + (jstDate.getMonth() + 1)).slice(-2);
    const d = ('0' + (jstDate.getDate())).slice(-2);
    const h = ('0' + (jstDate.getHours())).slice(-2);
    const mi = ('0' + (jstDate.getMinutes())).slice(-2);
    const s = ('0' + (jstDate.getSeconds())).slice(-2);
    // format: YYYYMMDDHHmmss
    console.log(y + m + d + h + mi + s);
    return y + m + d + h + mi + s;
  }
  connection.query(
    `INSERT INTO \`diaries\` (\`date\`, \`title\`, \`content\`) VALUES ('${get_formatted_datetime()}', '${req.body.title}','${req.body.content}')`,
    (err, results, fields) => {
      console.log(results);
      if (err) {
        console.log("Failed to insert data.");
        res.status(400).json({ message: "Failed to submit" });
      } else {
        console.log("Success to insert data.");
        res.status(200).json({ message: "Success to submit" });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`listening on *: ${port}`);
});
