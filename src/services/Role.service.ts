import { RoleAttributes, RoleInput } from "../db/models/Role";
import rRole from "../repository/Role.repository";

class ServiceRole {
    getById = async (id: number):Promise<RoleAttributes> => {
        const data = await rRole.getById(id);
        if(!data){
            throw Error('')
        }
        return data
    }
    getAll = async () => {
        const data = rRole.getAll()
        return data

    }
    create = async (name: string, active: boolean):Promise<RoleInput> => {
        const data = await rRole.create(name, active)

        return data

    }
    update = async (id: number, name: string, active: boolean):Promise<object> => {
        const check = await rRole.getById(id);
        if (!check) {
            throw Error('')
        }
        const data = await rRole.update(id, name, active);
        return data
    }
    delete = async (id: number):Promise<RoleAttributes> => {
        // const check = await rRole.getById(id);
        // if (!check) {
        //     throw Error ("id NOT FOUND")
        // }

        const data = await rRole.delete(id);
        if(!data){
            throw Error('')
        }
        return data
    }

}
export default new ServiceRole;