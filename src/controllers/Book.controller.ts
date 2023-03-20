import { Request, Response } from "express";
import sBook from "../services/Book.service";
import {InputBook } from "../helpers/DTO/dto";
import ResponseData from "../helpers/ResponseData";


class ControllerRole {
    Insert = async (req: Request, res: Response): Promise<Response> => {
        try {
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
        const result = await sBook.insert(bookData)

        return res.send(ResponseData.resp(200, "Login", result))
        } catch (error) {
            return res.send(error)
        }
        
    }

    getAll = async (req: Request, res: Response): Promise<Response> => {
        try {
            // const service: sBook = new sBook(req);
        const result = await sBook.getAll();

        return res.send(ResponseData.resp(200, "Login", result))
        } catch (error) {
            return res.send(ResponseData.resp(400, "Error", error))
        }
        
        
    }
    getById = async (req: Request, res: Response): Promise<Response> => {
        try {
            // const service: sBook = new sBook(req);
        const id = parseInt(req.params.id)

        const result = await sBook.delete(id);
        return res.send(ResponseData.resp(200, "Login", result))
        } catch (error) {
            return res.send(ResponseData.resp(400, "Error", error))
        }
    }
    update = async (req: Request, res: Response): Promise<Response> => {
        try {
            // const service: sBook = new sBook(req);
        const id = parseInt(req.params.id)

        const result = await sBook.delete(id);
        return res.send(ResponseData.resp(200, "Login", result))
        } catch (error) {
            return res.send(ResponseData.resp(400, "Error", error))
        }
    }
    delete = async (req: Request, res: Response): Promise<Response> => {
        try {
            // const service: sBook = new sBook(req);
        const id = parseInt(req.params.id)

        const result = await sBook.delete(id);
        return res.send(ResponseData.resp(200, "Login", result))
        } catch (error) {
            return res.send(ResponseData.resp(400, "Error", error))
        }
        
    }
}


export default new ControllerRole();