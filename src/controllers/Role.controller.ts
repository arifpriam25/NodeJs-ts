import { Request, Response } from "express";
import sRole from "../services/Role.service";

class ControllerRole {
    getAll = async (req: Request, res: Response): Promise<Response> => {
        const service: sRole = new sRole(req);
        const data = await service.getAll();
    
        return res.send({message: "OK",data: data})
    }
    
    create = async (req: Request, res: Response): Promise<Response> => {
        const service: sRole = new sRole(req);
        const data = await service.create();
        
        return res.send({message: "OK",data: data})
    }
    
    update = async (req: Request, res: Response): Promise<Response> => {
        const service: sRole = new sRole(req);
        const data = await service.update();
        
        return res.send({message: "Update",data: data})
    }
    
    delete = async (req: Request, res: Response): Promise<Response> => {
        const service: sRole = new sRole(req);
        const data = await service.delete();
        
        return res.send({message: "Delete",data: data})
    }
    
    getById = async (req: Request, res: Response): Promise<Response> => {
        const service: sRole = new sRole(req);
        const data = await service.getById();
        
        return res.send({message: "get Id",data: data})
    }
}


export default new ControllerRole();