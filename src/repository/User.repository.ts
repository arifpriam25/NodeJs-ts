import mUser, { UserAttributes } from "../db/models/User";
import mRole from "../db/models/Role";

class RepositoryUser {
    public static findById = async (data: UserAttributes)=>{
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

    public static getById = async (id: string) => {
        const data = await mUser.findByPk(id);
        return data
    }
    public static getAll = async () => {
        const data = await mUser.findAll({
            where: {
                active: true
            }
        });
        return data
    }
    public static create = async (data: UserAttributes):Promise<UserAttributes> => {
        await mUser.create(data);

        return data
    }
    public static updateByEmail = async (email: string, data: UserAttributes) => {
        await mUser.update(data, {
            where: {
                email: email
            }
        })
        return data
    }
    public static delete = async (id: string) => {
        await mUser.destroy({
            where: {
                id: id
            }
        });
        return id
    }
    public static updateBalance = async (idUser:number,balance:number) => {
        const data = await mUser.update({
            balance: balance
        }, {
            where: {
                id: idUser
            }
        })
        return data
    }
}
export default RepositoryUser