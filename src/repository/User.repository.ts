import mUser from "../db/models/User";

class RepositoryUser {
    public static FindOne =async (data:any) => {
        const find = await mUser.findOne({
            where: {
                email: data.email
            }
        })
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
    public static Create = async (data:any) => {
        await mUser.create(data);

        return data
    }
    public static Update = async (id: string, data:any) => {
         await mUser.update(data, {
            where: {
                id: id
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