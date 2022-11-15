import express, { Request, Response } from "express";
import { Database } from "./database/databaseManager";

const server = express();
const port: number = 4000;

server.get("/", (req: Request, res: Response) => {
  res.send({
    status: 200,
  });
});

server.post("/newUser", async (req: Request, res: Response) => {
  let data = new Database();
  data.insertDate({
    table: "Users",
    saveData: {
      username: req.body.username,
      password: req.body.password,
    }
  })
  console.log(data);
  res.send({
    status: 200,
    opetation: "done",
  });
});

server.listen(port, async () => {
  console.log("server is online");
});
