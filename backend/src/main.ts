import express, { Request, Response } from "express";
import execute from "./database/index";

const server = express();
const port: number = 4000;
const exec = new execute();

server.use(express.json());
server.use(express.urlencoded());

server.get("/", async (req: Request, res: Response) => {
  res.send({
    status: 200,
    query_result: "done"
  });
});

server.post("/newUser", async (req: Request, res: Response) => {
  let result = await exec.createUser(req.body)
  res.send(result);
});

server.post("/makeTransfer", async (req: Request, res: Response) => {
  let result = await exec.makeTransaction(req.body)
  res.send(result);
});

server.listen(port, async () => {
  console.log("server is online");
});
