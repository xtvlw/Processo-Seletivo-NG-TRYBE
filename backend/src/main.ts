import express, { Request, Response } from 'express'
import source from './database/index'

const server = express()
const port: number = 4000

server.get('/', (req: Request, res: Response) => {
    res.send({
        status: 200
    })
})

server.listen(port, async () => {
    console.log("server is online");
    source.initialize()
        .then(() => console.log("database online"))
})
