import { Request, response, Response } from "express";
import Role from "../db/models/Role";
import User from "../db/models/User";
import Helper from "../helpers/Helper";
import PasswordHelper from "../helpers/PasswordHelper";
import sUser from "../services/User.service";


const Register = async (req: Request, res: Response): Promise<Response> => {
    const service: sUser = new sUser(req);
    const data = await service.Register();

    return res.send({message: "Register",data: data})
}
const RefreshToken = async (req: Request, res: Response): Promise<Response> => {
    const service: sUser = new sUser(req);
    const data = await service.RefreshToken();

    return res.send({message: "RefreshToken",data: data})
}
const UserDetail = async (req: Request, res: Response): Promise<Response> => {
    try {
        const email = res.locals.userEmail;
        const user = await User.findOne({
            where: {
                email: email
            },
            include: {
                model: Role,
                attributes: ["id", "roleName"]
            }
        });

        if (!user) {
            return res.status(404).send(Helper.ResponseData(404, "User Not FOUND", null, null))
        }
        user.password = "";
        user.accessToken = "";
        return res.status(200).send(Helper.ResponseData(200, "Current User", null, user))
    } catch (error) {
        return res.status(500).send(Helper.ResponseData(500, "reftoken", error, null));
    }
}





//????


const UserLogin = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if (!user) {
            return res.status(401).send(Helper.ResponseData(401, "user not foudn", null, null))
        }

        const matched = await PasswordHelper.passwordCompare(password, user.password);
        if (!matched) {
            return res.status(401).send(Helper.ResponseData(401, "Not Match", null, null))
        }
        const dataUser = {
            name: user.name,
            email: user.email,
            roleId: user.roleId,
            verified: user.verified,
            active: user.active
        }
        const token = Helper.GenerateToken(dataUser);
        const refreshToken = Helper.GenerateRefreshToken(dataUser);
        // console.log("reftoken : "+"-+0_________0+-"+refreshToken)

        user.accessToken = refreshToken;
        await user.save();
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })

        const responseUser = {
            name: user.name,
            email: user.email,
            roleId: user.roleId,
            verified: user.verified,
            active: user.active,
            token: token
        }
        return res.status(200).send(Helper.ResponseData(200, "data match", null, responseUser))
    } catch (error) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }
}


const UserLogout = async (req: Request, res: Response): Promise<Response> => {
    try {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) {
            return res.status(200).send(Helper.ResponseData(200, "E:2 reftoken : Logout", null, null));
        }
        const email = res.locals.userEmail;
        const user = await User.findOne({
            where: {
                email: email
            }
        });
        if (!user) {
            res.clearCookie("refreshToken");
            return res.status(404).send(Helper.ResponseData(404, "User Not FOUND", null, null))
        }
        res.clearCookie("refreshToken");
        await user.update({ accessToken: null }, { where: { email } })
        return res.status(200).send(Helper.ResponseData(200, "Success Logout", null, null));
    } catch (error) {
        return res.status(500).send(Helper.ResponseData(500, "E:1 logout", error, null));
    }
}
export default { Register, UserLogin, RefreshToken, UserDetail, UserLogout };