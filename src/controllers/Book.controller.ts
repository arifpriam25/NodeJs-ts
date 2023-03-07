import { Request, Response } from "express";
import sBook from "../services/Book.service";

class ControllerRole {
    Insert = async (req: Request, res: Response): Promise<Response> => {
        const service: sBook = new sBook(req);
        const data = await service.insert();
    
        return res.send(data)
    }

    getAll = async (req: Request, res: Response): Promise<Response> => {
        const service: sBook = new sBook(req);
        const data = await service.getAll();
    
        return res.send(data)
    }
    getById = async (req: Request, res: Response): Promise<Response> => {
        const service: sBook = new sBook(req);
        const data = await service.getById();
    
        return res.send(data)
    }
    update = async (req: Request, res: Response): Promise<Response> => {
        const service: sBook = new sBook(req);
        const data = await service.update();
    
        return res.send(data)
    }
    delete = async (req: Request, res: Response): Promise<Response> => {
        const service: sBook = new sBook(req);
        const data = await service.delete();
    
        return res.send(data)
    }
}


export default new ControllerRole();