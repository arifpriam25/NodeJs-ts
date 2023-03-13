import { Request } from "express";
import rRole from "../repository/Role.repository";

class ServiceRole {
    body: Request['body'];
    params: Request['params']
    constructor(req: Request) {
        this.body = req.body;
        this.params = req.params;
    }
    getById = async()=>{
        try {
            const { id } = this.params;
            const data = await rRole.getById(id);
            return data
        } catch (error) {
            return error
        }
    }
    getAll = async () => {
        try {
            const data = rRole.getAll()
            return data
        } catch (error) {
            return error
        }
    }
    create = async () => {
        try {
            const { roleName, active } = this.body; 
            const data = await rRole.create(roleName,active)

            return data
        } catch (error) {
            return error
        }
    }
    update = async () => {
        try {
            const { id } = this.params;
            const { roleName, active } = this.body;
            const check = await rRole.getById(id);
            if(!check){
                return "id NOT FOUND"
            }
            const data = await rRole.update(id,roleName,active);
            return data
        } catch (error) {
            console.log(error)
            return error
        }
    }
    delete = async()=> {
        try {
            const { id } = this.params;
            const check = await rRole.getById(id);
            if(!check){
                return "id NOT FOUND"
            }

            const data = await rRole.delete(id);
    
            return data
        } catch (error) {
            return error;
        }
    }
    
}
export default ServiceRole;