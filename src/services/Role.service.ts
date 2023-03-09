import { Request } from "express";
import rRole from "../repository/Role.repository";

class ServiceRole {
    body: Request['body'];
    params: Request['params']
    constructor(req: Request) {
        this.body = req.body;
        this.params = req.params;
    }
    GetById = async()=>{
        try {
            const { id } = this.params;
            const data = await rRole.GetById(id);
            return data
        } catch (error: any) {
            return error
        }
    }
    GetAll = async () => {
        try {
            const data = rRole.GetAll()
            return data
        } catch (error: any) {
            return error
        }
    }
    Create = async () => {
        try {
            const { roleName, active } = this.body; 
            const data = await rRole.Create(roleName,active)

            return data
        } catch (error: any) {
            return error
        }
    }
    Update = async () => {
        try {
            const { id } = this.params;
            const { roleName, active } = this.body;
            const check = await rRole.GetById(id);
            if(!check){
                return "id NOT FOUND"
            }
            const data = await rRole.Update(id,roleName,active);
            return data
        } catch (error: any) {
            console.log(error.message)
            return error
        }
    }
    Delete = async()=> {
        try {
            const { id } = this.params;
            const check = await rRole.GetById(id);
            if(!check){
                return "id NOT FOUND"
            }

            const data = await rRole.Delete(id);
    
            return data
        } catch (error: any) {
            return error;
        }
    }
    
}
export default ServiceRole;