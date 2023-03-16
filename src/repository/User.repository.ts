import mUser, { UserAttributes, UserInput, UserJoinAttribute } from "../db/models/User";
import mRole from "../db/models/Role";

class RepositoryUser {
    create = async (data: UserInput):Promise<UserInput> => {
        await mUser.create(data);

        return data
    }
    findById = async (data: UserAttributes):Promise<UserAttributes|null>=>{
        const find = await mUser.findOne({
            where: {
                email: data.email
            }
        })
        return find
    }

    findByEmail = async (email: string):Promise<UserJoinAttribute|null> => {
        console.log(email)
        const find = await mUser.findOne({
            where: {
                email: email
            },
            include: {
                model: mRole
            }
        });
        
        return find
    }

    getById = async (id: string):Promise<UserAttributes|null> => {
        const data = await mUser.findByPk(id);
        return data
    }
    getAll = async ():Promise<UserAttributes|object> => {
        const data = await mUser.findAll({
            where: {
                active: true
            }
        });
        return data
    }
    
    updateByEmail = async (email: string, data: UserInput):Promise<UserInput> => {
        await mUser.update(data, {
            where: {
                email: email
            }
        })
        return data
    }
    delete = async (id: string):Promise<UserAttributes|unknown>=> {
        await mUser.destroy({
            where: {
                id: id
            }
        });
        return id
    }
    updateBalance = async (idUser:number,balance:number):Promise<UserAttributes|object> => {
        const data = await mUser.update({
            balance: balance
        }, {
            where: {
                id: idUser
            }
        })
        return data
    }
    destroyToken = async (email: string):Promise<UserAttributes|object> => {
        const result = await mUser.update({accessToken:null}, {
            where: {
                email: email
            }
        })
        return result
    }
}
export default new RepositoryUser