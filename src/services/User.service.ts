
import PasswordHelper from "../helpers/PasswordHelper";
import Helper from "../helpers/Helper";
import ResponseData from "../helpers/ResponseData";
import rUser from "../repository/User.repository";
import { UserData, ShowUser, DataToken, Token } from "../helpers/DTO/dto";


class ServiceUser {

    userDetail = async (email: string):Promise<ShowUser|unknown> => {
        try {
            const data = await rUser.findByEmail(email);
            if(!data){
                return ResponseData.resp(400,"user not found",data)
            }
            const a = data.Role
            if(!a){
                return ResponseData.resp(400,"error role",data)
            }

            const result = <ShowUser>{
                id:data.id,
                name:data.name,
                email:data.email,
                role:data.Role?.roleName,
                balance:data.balance,
                verified:data.verified,
                active:data.active
            }
            
            return result
        } catch (error) {
            return error
        }
    }

    login = async (email: string, password: string)=> {
        try {
            const data = await rUser.findByEmail(email)
            if(!data){
                return ResponseData.resp(400,"user not found",data)
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
            

            // const result = <ShowUser>({
            //     name: data.name,
            //     email: data.email,
            //     role: data.Role?.roleName,
            //     balance: data.balance,
            //     verified: data.verified,
            //     active: data.active
            // })

            const resToken= <Token>({token,refreshToken})
            return resToken
        } catch (error) {
            return error
        }
    }

    register = async (data: UserData)=> {
        try {
            const hashed = await PasswordHelper.passwordHashing(data.password as string);
            const { name, email, roleId } = data
            const dataUpdate = ({
                name,
                email,
                password: hashed,
                roleId,
                balance: 0,
                active: true,
                verified: true
            })
            
            const checkEmail = await rUser.findByEmail(dataUpdate.email as string)
            
            if (checkEmail) {
                return ResponseData.resp(200,"Email used with another account",data)
            }
            // return (dataUpdate)
            const input = await rUser.create(dataUpdate)
            return input
        } catch (error) {
            return error
        }
    }

    refreshToken = async (refToken: string) => {
        try {

            if (!refToken) {
                return ResponseData.resp(400,"token not found",refToken)
            }
            const decodedUser = Helper.ExtractRefreshToken(refToken);

            if (!decodedUser) {
                return ResponseData.resp(400,"error",decodedUser)
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
        } catch (error) {
            return error
        }
    }

    logout = async (refToken: string, email: string) => {
        try {
            if (!refToken) {
                return ResponseData.resp(400,"error cookie",refToken)
            }
            const result = await rUser.findByEmail(email);
            if (!result) {
                return ResponseData.resp(400,"user not found",result)
            }
            // res.clearCookie("refreshToken");
            await rUser.updateByEmail(email, { accessToken: null })
            return ResponseData.resp(400,"Logout Success",result)
        } catch (error) {
            return error
        }
    }

}

// export default ServiceUser;
export default new ServiceUser()