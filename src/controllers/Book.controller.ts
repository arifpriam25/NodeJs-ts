import { Request, Response } from "express";
import sBook from "../services/Book.service";
import {InputBook } from "../helpers/DTO/dto";


class ControllerRole {
    Insert = async (req: Request, res: Response): Promise<Response> => {
        // const service: sBook = new sBook(req);
        const { title, author, publisher, year, price, quantity, active } = req.body
        const bookData: InputBook = <InputBook>{
            title,
            author,
            publisher,
            year,
            price,
            quantity,
            active,
        }
        const data = await sBook.insert(bookData)

        return res.send(data)
    }

    getAll = async (req: Request, res: Response): Promise<Response> => {
        // const service: sBook = new sBook(req);
        const data = await sBook.getAll();

        return res.send(data)
    }
    getById = async (req: Request, res: Response): Promise<Response> => {
        // const service: sBook = new sBook(req);
        const id = parseInt(req.params.id)
        const data = await sBook.getById(id);

        return res.send(data)
    }
    update = async (req: Request, res: Response): Promise<Response> => {
        // const service: sBook = new sBook(req);
        const id = parseInt(req.params.id)
        const { title, author, publisher, year, price, quantity, active } = req.body
        const data = await sBook.update(id, title, author, publisher, year, price, quantity, active);

        return res.send(data)
    }
    delete = async (req: Request, res: Response): Promise<Response> => {
        // const service: sBook = new sBook(req);
        const id = parseInt(req.params.id)

        const data = await sBook.delete(id);
        return res.send(data)
    }
}


export default new ControllerRole();