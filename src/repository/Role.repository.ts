import mRole from "../db/models/Role";

class RepositoryRole {
    public static getById = async (id: string) => {
        const data = await mRole.findByPk(id);
        return data
    }
    public static getAll = async () => {
        const data = await mRole.findAll({
            where: {
                active: true
            }
        });
        console.log(data)
        return data
    }
    public static create = async (roleName: string, active: boolean) => {
        const data = await mRole.create({
            roleName,
            active
        });
        
        return data
    }
    public static update = async (id: string, roleName: string, active: boolean) => {
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
    public static delete = async (id: string) => {
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
export default RepositoryRole