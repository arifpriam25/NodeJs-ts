
import PasswordHelper from "../helpers/PasswordHelper";
import Helper from "../helpers/Helper";
import rUser from "../repository/User.repository";
import { UserData,ShowUser,UserDetail } from "../helpers/DTO/dto";


class ServiceUser {

    register = async (data: UserData) => {
        try {
            const hashed = await PasswordHelper.passwordHashing(data.password as string);
            const { name, email, roleId } = data
            const dataUpdate: UserData = ({
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
                return "Email Used"
            }
            const input = await rUser.create(dataUpdate)
            return input
        } catch (error) {
            return error
        }
    }

    refreshToken = async (refToken: string) => {
        try {

            if (!refToken) {

                return "Refresh Token Not Found"
            }
            const decodedUser = Helper.ExtractRefreshToken(refToken);

            if (!decodedUser) {
                return "error decoded user"
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

    userDetail = async (email: string) => {
        try {
            const data = await rUser.findByEmail(email);
            if (!data) {
                return "email not found"
            }

            const result : ShowUser = <ShowUser>({
                name:data.name,
                email:data.email,
                role:"data.Role.roleName",
                balance:data.balance,
                verified:data.verified,
                active:data.active

            })
            return result

        } catch (error) {
            return error
        }
    }

    login = async (email: string, password: string) => {
        try {
            const data = await rUser.findByEmail(email)

            if (!data) {
                return "user NOT FOUND"
            }
            const matched = await PasswordHelper.passwordCompare(password, data.password);
            if (!matched) {
                return "PASSWORD NOT MATCH"
            }
            const dataUser = {
                id: data.id,
                name: data.name,
                email: data.email,
                roleId: data.roleId,
                verified: data.verified,
                active: data.active
            }
            const token = Helper.GenerateToken(dataUser);
            const refreshToken = Helper.GenerateRefreshToken(dataUser); //output
            // console.log("reftoken : "+"-+0_________0+-"+refreshToken)

            data.accessToken = refreshToken;
            // await user.save();

            const responseUser = {
                name: data.name,
                email: data.email,
                roleId: data.roleId,
                verified: data.verified,
                active: data.active,
                token: token,
                refreshToken: refreshToken
            }
            return responseUser
        } catch (error) {
            return error
        }
    }

    logout = async (refToken: string, email: string) => {
        try {
            if (!refToken) {
                return "cookie not found"
            }
            const user = await rUser.findByEmail(email);
            if (!user) {
                return "user NOT FOUND"
            }
            // res.clearCookie("refreshToken");
            await rUser.updateByEmail(email, { accessToken: null })
            return "success Logout"
        } catch (error) {
            return error
        }
    }
    
}

// export default ServiceUser;
export default new ServiceUser()