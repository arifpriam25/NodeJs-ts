import { Request, Response } from "express";
import Authorization from "../middleware/Authorization";
import rBook from "../repository/Book.repository";

class ServiceBook {
    body: Request['body'];
    params: Request['params']
    constructor(req: Request) {
        this.body = req.body;
        this.params = req.params;
    }
    insert = async()=>{
        try {
            const {title,author,publisher,year,price,quantity,active} =this.body;
            const data = {
                title,
                author,
                publisher,
                year,
                price,
                quantity,
                active
            }
            const insert = rBook.insert(data);

            return insert
        } catch (error:any) {
            return error
        }
    }
}

export default ServiceBook