import { Request, Response } from "express";
import sBook from "../services/Book.service";

class ControllerRole {
    Insert = async (req: Request, res: Response): Promise<Response> => {
        const service: sBook = new sBook(req);
        const data = await service.insert();
    
        return res.send({message: "OK",data: data})
    }
}


export default new ControllerRole();