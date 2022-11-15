import express, { request, Request, Response } from 'express'
import { Users } from './database/entities/users'
import source from './database/index'

const server = express()
const port: number = 4000

source.initialize()
    .then(() => console.log("database online"))


server.get('/', (req: Request, res: Response) => {
    res.send({
        status: 200
    })
})

server.get("/newUser", async (req: Request, res: Response) => {
    let data = req.body
    console.log(data);
    /*
    try {
        source.createQueryBuilder()
            .insert()
            .into(Users)
            .values([{
                username: data.username,
                password: data.password,
                accountId: data.accountId
            }])
            // .execute()
    } catch (error) {
        res.send({
            status: 404,
            operation: "something wnet wrong, try again"
        })
    }
*/
    res.send({
        status: 200,
        opetation: "done"
    })
})



server.listen(port, async () => {
    console.log("server is online");
})
