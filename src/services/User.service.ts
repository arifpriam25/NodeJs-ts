import e, {Request} from "express"
import PasswordHelper from "../helpers/PasswordHelper"
import Helper from "../helpers/Helper"
import rUser from "../repository/User.repository"

class ServiceUser {
    // body: Request['body'];
    // params: Request['params']
    // cookies: Request['cookies']
    // constructor(req: Request) {
    //     this.body = req.body;
    //     this.params = req.params;
    //     this.cookies = req.cookies;
    // }
    Register = async (data:any) => {
        try {
            const hashed = await PasswordHelper.PasswordHashing(data.password);
            const {name, email,roleId} = data
            // console.log(result)
            // return email
            const dataUpdate = ({
                name,
                email,
                password: hashed,
                roleId,
                balance: 0,
                active: true,
                verified: true
            })
            const checkEmail = await rUser.findByEmail(dataUpdate.email)
            if (checkEmail) {
                return "Email Used"
            }
            const input = await rUser.Create(dataUpdate)
            return input
        } catch (error: any) {
            return error
        }
    }
    
    RefreshToken = async (refToken:string) => {
        try {
            // console.log(refreshToken);
            if (!refToken) {

                return "Refresh Token Not Found";
            }
            const decodedUser = Helper.ExtractRefreshToken(refToken);
            // console.log(decodedUser);
            if (!decodedUser) {
                return "error decoded user";
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
        } catch (error:any) {
            return error
        }
    }

    userDetail = async (email:string) => {
        try {
            const data = await rUser.findByEmail(email);
            if (!data) {
                return "email not found"
            }
            data.password = ""
            data.accessToken = ""
            return data

        } catch (error:any) {
            return error
        }
    }
    
    login = async(email:string,password:string) => {
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
                refreshToken : refreshToken
            }
            return responseUser
        } catch (error:any) {
            return error
        }
    }
    
    logout = async(refToken:string,email:string) =>{
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
        } catch (error:any) {
            return error
        }
    }
}

// export default ServiceUser;
export default new ServiceUser()