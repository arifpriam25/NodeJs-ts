import { Request, Response } from "express";
import sRole from "../services/Role.service";

class ControllerRole {
    GetAll = async (req: Request, res: Response): Promise<Response> => {
        const service: sRole = new sRole(req);
        const data = await service.GetAll();
    
        return res.send({message: "OK",data: data})
    }
    
    Create = async (req: Request, res: Response): Promise<Response> => {
        const service: sRole = new sRole(req);
        const data = await service.Create();
        
        return res.send({message: "OK",data: data})
    }
    
    Update = async (req: Request, res: Response): Promise<Response> => {
        const service: sRole = new sRole(req);
        const data = await service.Update();
        
        return res.send({message: "Update",data: data})
    }
    
    Delete = async (req: Request, res: Response): Promise<Response> => {
        const service: sRole = new sRole(req);
        const data = await service.Delete();
        
        return res.send({message: "Delete",data: data})
    }
    
    GetById = async (req: Request, res: Response): Promise<Response> => {
        const service: sRole = new sRole(req);
        const data = await service.GetById();
        
        return res.send({message: "get Id",data: data})
    }
}


export default new ControllerRole();