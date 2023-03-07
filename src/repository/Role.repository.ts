import mRole from "../db/models/Role";

class RepositoryRole {
    public static GetById = async (id: string) => {
        const data = await mRole.findByPk(id);
        return data
    }
    public static GetAll = async () => {
        const data = await mRole.findAll({
            where: {
                active: true
            }
        });
        console.log(data)
        return data
    }
    public static Create = async (roleName: string, active: boolean) => {
        const data = await mRole.create({
            roleName,
            active
        });
        
        return data
    }
    public static Update = async (id: string, roleName: string, active: boolean) => {
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
    public static Delete = async (id: string) => {
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