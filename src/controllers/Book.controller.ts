import { Request, Response } from "express";
import sBook from "../services/Book.service";
import { InputBook_Payload } from "../helpers/DTO/dto";
import ResponseData from "../helpers/ResponseData";


class ControllerRole {
    Insert = async (req: Request, res: Response): Promise<Response> => {
        try {
            // const service: sBook = new sBook(req);
            const { title, author, publisher, price, quantity, active } = req.body
            const bookData: InputBook_Payload = <InputBook_Payload>{
                title,
                author,
                publisher,
                year: new Date(),
                price,
                quantity,
                active,
            }
            const result = await sBook.insert(bookData)

            return res.send(ResponseData.resp(200, "Insert", result))
        } catch (error) {
            return res.send(error)
        }

    }

    getAll = async (req: Request, res: Response): Promise<Response> => {
        try {
            // const service: sBook = new sBook(req);
            const result = await sBook.getAll();

            return res.send(ResponseData.resp(200, "Get all books", result))
        } catch (error) {
            return res.send(ResponseData.resp(400, "Error", error))
        }


    }
    getById = async (req: Request, res: Response): Promise<Response> => {
        try {
            // const service: sBook = new sBook(req);
            const id = parseInt(req.params.id)

            const result = await sBook.getById(id);
            return res.send(ResponseData.resp(200, "get by id", result))
        } catch (error) {
            return res.send(ResponseData.resp(400, "Error", error))
        }
    }
    update = async (req: Request, res: Response): Promise<Response> => {
        try {
            const {title,author,publisher,price,quantity,active} = req.body
            // const service: sBook = new sBook(req);
            const id = parseInt(req.params.id)
            const data = {
                title,
                author,
                publisher,
                year: new Date(),
                price,
                quantity,
                active
            }

            const result = await sBook.update(id,data);
            return res.send(ResponseData.resp(200, "update", result))
        } catch (error) {
            return res.send(ResponseData.resp(400, "Error", error))
        }
    }
    delete = async (req: Request, res: Response): Promise<Response> => {
        try {
            // const service: sBook = new sBook(req);
            const id = parseInt(req.params.id)

            const result = await sBook.delete(id);
            return res.send(ResponseData.resp(200, "delete", result))
        } catch (error) {
            return res.send(ResponseData.resp(400, "Error", error))
        }

    }
}


export default new ControllerRole();