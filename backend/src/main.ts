import express, { Request, Response, NextFunction } from "express";
import execute from "./database/index";
import { sign, verify } from "jsonwebtoken";
import cors from 'cors'


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
server.use(cors())
const validaton = (req: Request, res: Response, next: NextFunction) => {
  let token = String(req.headers["x-access-token"]);
  verify(token, secret, (err) => {
    if (err) return res.status(401).end();

    next();
  });
};

server.get("/", async (req: Request, res: Response) => {
  res.send({
    status: 200,
    query_result: "done",
  });
});

server.post("/login", async (req: Request, res: Response) => {
  console.log(req.body);
  let login = await exec.login(req.body);
  
  
  if (login === 0) {
    let token = sign({ username: req.body.username }, secret, {
      expiresIn: 60 * 60 * 24,
    });
    res.send({ auth: true, token: token });
  }
  res.send(login);
});

server.post("/newUser", async (req: Request, res: Response) => {
  let result = await exec.createUser(req.body);
  res.send(result);
});

server.post("/makeTransfer", validaton, async (req: Request, res: Response) => {
  let result = await exec.makeTransaction(req.body);
  res.send(result);
});

server.post("/getAll", validaton, async (req: Request, res: Response) => {
  let result = await exec.getAllData(req.body.username);
  res.send(result);
});

server.listen(port, async () => {
  console.log("server is online");
});
