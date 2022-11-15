import express, { Application, Request, Response } from 'express'

const server = express()
const port = 4000

server.get('/', (req: Request, res: Response) => {
    res.send({
        status: 200
    })
})

server.listen(port, () => {
    console.log("server is online");
})