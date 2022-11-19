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
    query_result: await exec.createUser({ username: "a", password: "a" }),
  });
});

server.post("/newUser", async (req: Request, res: Response) => {
  res.send({
    status: 200,
    opetation: "done",
  });
});

server.post("/getTransfers", async (req: Request, res: Response) => {
  res.send(req.body);
});

server.listen(port, async () => {
  console.log("server is online");
});
