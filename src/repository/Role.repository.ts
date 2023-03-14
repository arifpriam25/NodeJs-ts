import mRole from "../db/models/Role";

class RepositoryRole {
    getById = async (id: string) => {
        const data = await mRole.findByPk(id);
        return data
    }
    getAll = async () => {
        const data = await mRole.findAll({
            where: {
                active: true
            }
        });
        console.log(data)
        return data
    }
    create = async (roleName: string, active: boolean) => {
        const data = await mRole.create({
            roleName,
            active
        });
        
        return data
    }
    update = async (id: string, roleName: string, active: boolean) => {
        const data = await mRole.update({
            roleName: roleName,
            active: active
        }, {
            where: {
                id: id
            }
        })
        return data
    }
    delete = async (id: string) => {
        const data = await mRole.findByPk(id);
        if (!data) {
            return data
        }

        await mRole.destroy({
            where: {
                id: id
            }
        });
        return data
    }
}
export default new RepositoryRole