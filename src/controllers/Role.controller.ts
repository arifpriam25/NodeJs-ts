import { Request, Response } from "express";
import sRole from "../services/Role.service";

class ControllerRole {
    getAll = async (req: Request, res: Response): Promise<Response> => {
        const result = await sRole.getAll();
    
        return res.send({message: "OK",data: result})
    }
    
    create = async (req: Request, res: Response): Promise<Response> => {
        const {roleName,active} = req.body
        const result = await sRole.create(roleName,active);
        
        return res.send({message: "OK",data: result})
    }
    
    update = async (req: Request, res: Response): Promise<Response> => {
        const id = parseInt(req.params.Id)
        const {roleName,active} = req.body
        const result = await sRole.update(id,roleName,active);
        
        return res.send({message: "Update",data: result})
    }
    
    delete = async (req: Request, res: Response): Promise<Response> => {
        const id:number = parseInt(req.params.Id)
        const result = await sRole.delete(id);
        
        return res.send({message: "Delete",data: result})
    }
    
    getById = async (req: Request, res: Response): Promise<Response> => {
        const id:number = parseInt(req.params.Id)
        const result = await sRole.getById(id);
        
        return res.send({message: "get Id",data: result})
    }
}


export default new ControllerRole();