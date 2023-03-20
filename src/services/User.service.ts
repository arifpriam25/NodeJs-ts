
import PasswordHelper from "../helpers/PasswordHelper";
import Helper from "../helpers/Helper";
import RepositoryUser from "../repository/User.repository";
import { ShowUser, DataToken, Token, RegisterUser } from "../helpers/DTO/dto";
import { UserInput } from "../db/models/User";

class ServiceUser {
    userDetail = async (email: string): Promise<ShowUser|unknown> => {

        const data = await RepositoryUser.findByEmail(email);
        if (!data) {
            return data
        }
        if (!data.Role) {
            return ''
        }

        const result = <ShowUser>{
            id: data.id,
            name: data.name,
            email: data.email,
            role: data.Role.roleName,
            balance: data.balance,
            verified: data.verified,
            active: data.active
        }
        return result
    }

    login = async (email: string, password: string): Promise<Token|unknown> => {
        const data = await RepositoryUser.findByEmail(email)
        if (!data) {
            return 'user not found'
        }
        await PasswordHelper.passwordCompare(password, data.password as string);

        const dataUser = <DataToken>{
            id: data.id,
            name: data.name,
            email: data.email,
            roleId: data.roleId,
            verified: data.verified,
            active: data.active
        }
        const token = Helper.GenerateToken(dataUser);
        const refreshToken = Helper.GenerateRefreshToken(dataUser);

        data.accessToken = refreshToken;

        const responseUser = {
            name: data.name,
            email: data.email,
            roleId: data.roleId,
            verified: data.verified,
            active: data.active,
            token: token,
            refreshToken: refreshToken
        }
        console.log(responseUser)

        const resToken = <Token>({ token, refreshToken })
        return resToken
    }

    register = async (data: RegisterUser): Promise<UserInput|unknown> => {
        const hashed = await PasswordHelper.passwordHashing(data.password as string);
        const { name, email, roleId } = data
        const InsertData = ({
            name,
            email,
            password: hashed,
            roleId,
            balance: 0,
            active: true,
            verified: true,
            accessToken: null,
        })

        const checkEmail = await RepositoryUser.findByEmail(InsertData.email as string)

        if (checkEmail) {
            return ''
        }
        // return (dataUpdate)
        const input = await RepositoryUser.create(InsertData)
        return input
    }

    refreshToken = async (refToken: string): Promise<unknown> => {
        if (!refToken) {
            return 'Error'
        }
        const decodedUser = Helper.ExtractRefreshToken(refToken);

        if (!decodedUser) {
            return 'Error'
        }
        const token = Helper.GenerateToken({
            name: decodedUser.name,
            email: decodedUser.email,
            roleId: decodedUser.roleId,
            verified: decodedUser.verified,
            active: decodedUser.active,
        });

        const resultUser = {
            name: decodedUser.name,
            email: decodedUser.email,
            roleId: decodedUser.roleId,
            verified: decodedUser.verified,
            active: decodedUser.active,
            token: token
        }

        return resultUser
    }

    logout = async (refToken: string, email: string): Promise<unknown> => {
        if (!refToken) {
            return 'Error'
        }
        const result = await RepositoryUser.findByEmail(email);
        if (!result) {
            return "tidak ditemukan"
        }
        // res.clearCookie("refreshToken");
        await RepositoryUser.updateByEmail(email, {
            accessToken: null,
            name: result.name,
            email: result.email,
            roleId: result.roleId,
            password: result.password,
            balance: result.balance,
            verified: result.verified,
            active: result.active,
        })
        return result
    }
}


// export default ServiceUser;
export default new ServiceUser()