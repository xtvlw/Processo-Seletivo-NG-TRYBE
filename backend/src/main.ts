import express, { Request, Response } from "express";
import { createUser } from "./database";

const server = express();
const port: number = 4000;

server.use(express.json());
server.use(express.urlencoded());

server.get("/", (req: Request, res: Response) => {
  res.send({
    status: 200,
  });
});

server.post("/newUser", (req, res) => {
  createUser(req.body);
  res.send({
    status: 200,
    opetation: "done",
  });
});

server.listen(port, async () => {
  console.log("server is online");
});
