import rRole from "../repository/Role.repository";

class ServiceRole {
    getById = async (id: number) => {
        const data = await rRole.getById(id);
        return data
    }
    getAll = async () => {
        const data = rRole.getAll()
        return data

    }
    create = async (name: string, active: boolean) => {
        const data = await rRole.create(name, active)

        return data

    }
    update = async (id: number, name: string, active: boolean) => {
        const check = await rRole.getById(id);
        if (!check) {
            return "id NOT FOUND"
        }
        const data = await rRole.update(id, name, active);
        return data
    }
    delete = async (id: number) => {
        const check = await rRole.getById(id);
        if (!check) {
            return "id NOT FOUND"
        }

        const data = await rRole.delete(id);

        return data
    }

}
export default new ServiceRole;