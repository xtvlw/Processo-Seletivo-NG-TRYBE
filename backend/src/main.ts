import express, { Request, Response } from "express";
import execute from "./database/index";
import { sign, verify } from "jsonwebtoken";
import { nextTick } from "process";

const server = express();
const port: number = 4000;
const exec = new execute();
const secret = "secret";

interface resultType {
  status: Promise<string>;
  reason: Promise<string>;
  username: Promise<string>;
}

server.use(express.json());
server.use(express.urlencoded());

const validaton = (req: Request, res: Response) => {};

server.get("/", async (req: Request, res: Response) => {
  res.send({
    status: 200,
    query_result: "done",
  });
});

server.post("/login", async (req: Request, res: Response) => {
  let login = await exec.login(req.body)
  res.send(login)
})

server.post("/newUser", async (req: Request, res: Response) => {
  let result = await exec.createUser(req.body);
  res.send(result);
});

server.post("/makeTransfer", async (req: Request, res: Response) => {
  let result = await exec.makeTransaction(req.body);
  res.send(result);
});

server.post("/getAll", async (req: Request, res: Response) => {
  let result = await exec.getAllData(req.body.username);
  res.send(result);
});

server.listen(port, async () => {
  console.log("server is online");
});
