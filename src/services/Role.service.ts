import rRole from "../repository/Role.repository";

class ServiceRole {
    getById = async(id:number)=>{
        try {
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
    create = async (name:string,active:boolean) => {
        try {
            const data = await rRole.create(name,active)

            return data
        } catch (error) {
            return error
        }
    }
    update = async (id:number,name:string,active:boolean) => {
        try {
            const check = await rRole.getById(id);
            if(!check){
                return "id NOT FOUND"
            }
            const data = await rRole.update(id,name,active);
            return data
        } catch (error) {
            console.log(error)
            return error
        }
    }
    delete = async(id:number)=> {
        try {
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
export default new ServiceRole;