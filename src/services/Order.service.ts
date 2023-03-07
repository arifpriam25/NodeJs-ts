import { Request } from "express"
import rBook from "../repository/Book.repository"
import Helper from "../helpers/Helper"

class ServiceOrders {
    body: Request['body']
    params: Request['params']
    constructor(req: Request) {
        this.body = req.body
        this.params = req.params
    }

}