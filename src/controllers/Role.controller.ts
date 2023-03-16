import { Request, Response } from "express";
import sRole from "../services/Role.service";

class ControllerRole {
    getAll = async (req: Request, res: Response): Promise<Response> => {
        const data = await sRole.getAll();
    
        return res.send({message: "OK",data: data})
    }
    
    create = async (req: Request, res: Response): Promise<Response> => {
        const {roleName,active} = req.body
        const data = await sRole.create(roleName,active);
        
        return res.send({message: "OK",data: data})
    }
    
    update = async (req: Request, res: Response): Promise<Response> => {
        const id = parseInt(req.params.Id)
        const {roleName,active} = req.body
        const data = await sRole.update(id,roleName,active);
        
        return res.send({message: "Update",data: data})
    }
    
    delete = async (req: Request, res: Response): Promise<Response> => {
        const id:number = parseInt(req.params.Id)
        const data = await sRole.delete(id);
        
        return res.send({message: "Delete",data: data})
    }
    
    getById = async (req: Request, res: Response): Promise<Response> => {
        const id:number = parseInt(req.params.Id)
        const data = await sRole.getById(id);
        
        return res.send({message: "get Id",data: data})
    }
}


export default new ControllerRole();