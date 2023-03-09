import mUser from "../db/models/User";
import mRole from "../db/models/Role";

class RepositoryUser {
    public static findById = async (data: any)=> {
        const find = await mUser.findOne({
            where: {
                email: data.email
            }
        })
        return find
    }

    public static findByEmail = async (email: string) => {
        const find = await mUser.findOne({
            where: {
                email: email
            },
            include: {
                model: mRole,
                attributes: ["id", "roleName"]
            }
        });
        return find
    }

    public static GetById = async (id: string) => {
        const data = await mUser.findByPk(id);
        return data
    }
    public static GetAll = async () => {
        const data = await mUser.findAll({
            where: {
                active: true
            }
        });
        return data
    }
    public static Create = async (data: any) => {
        await mUser.create(data);

        return data
    }
    public static updateByEmail = async (email: string, data: any) => {
        await mUser.update(data, {
            where: {
                email: email
            }
        })
        return data
    }
    public static Delete = async (id: string) => {
        await mUser.destroy({
            where: {
                id: id
            }
        });
        return id
    }
}
export default RepositoryUser