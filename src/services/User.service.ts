import {Request} from "express";
import mUser from "../db/models/User";
import PasswordHelper from "../helpers/PasswordHelper";
import Helper from "../helpers/Helper";
import rUser from "../repository/User.repository";

class ServiceUser {
    body: Request['body'];
    params: Request['params']
    cookies: Request['cookies']
    constructor(req: Request) {
        this.body = req.body;
        this.params = req.params;
        this.cookies = req.cookies;
    }
    Register = async () => {
        try {
            const { name, email, password, confirmPassword, roleId } = this.body;
            const hashed = await PasswordHelper.PasswordHashing(password);
            const data = ({
                name,
                email,
                password: hashed,
                roleId: roleId,
                active: true,
                verified: true,
            })
            const checkEmail = await rUser.FindOne(data);
            if (checkEmail) {
                return "Email Used"
            }
            const input = await rUser.Create(data)
            return input
        } catch (error: any) {
            return error
        }
    }
    
    RefreshToken = async () => {
        try {
            const refreshToken = this.cookies.refreshToken;
            // console.log(refreshToken);
            if (!refreshToken) {

                return "cannot get refresh token";
            }
            const decodedUser = Helper.ExtractRefreshToken(refreshToken);
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
        } catch (error) {
            return error
        }
    }
}

export default ServiceUser;