import { Request, Response } from "express";
import sUser from "../services/User.service";
import { UserData } from "../helpers/DTO/dto";



class ControlerUser {
    register = async (req: Request, res: Response): Promise<Response> => {
        const { name, email, password, confirmPassword, roleId } = req.body;
        // const result : UserData = req.body
        const data: UserData = <UserData>({
            name,
            email,
            password,
            confirmPassword,
            roleId
        });
        
        const result:UserData = await <UserData>sUser.register(data);

        return res.send({ message: "Register", data: result })
    }

    userDetail = async (req: Request, res: Response): Promise<Response> => {
        const email = res.locals.userEmail;
        // console.log(email)
        // const service: sUser = new sUser(req);
        const data = await sUser.userDetail(email);
        return res.send({ message: "User Detail", data: data })
    }

    UserLogin = async (req: Request, res: Response): Promise<Response> => {
        const { email, password } = req.body;
        // const service: sUser = new sUser(req);
        // console.log(email)
        const data : UserData = await <UserData>sUser.login(email, password);

        const reftoken = data.refreshToken

        res.cookie('refreshToken', reftoken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })

        return res.send({ message: "User login", data: data })
    }

    refreshToken = async (req: Request, res: Response): Promise<Response> => {
        const refreshToken = req.cookies.refreshToken;
        // const service: sUser = new sUser(req);
        const data = await sUser.refreshToken(refreshToken);

        return res.send({ message: "RefreshToken", data: data })
    }

    userLogout = async (req: Request, res: Response): Promise<Response> => {
        const refreshToken = req.cookies.refreshToken;
        const email = res.locals.userEmail;
        // const service: sUser = new sUser(req);
        const data = await sUser.logout(refreshToken, email);
        res.clearCookie('refreshToken')
        return res.send({ message: "logout", data: data })
    }
}

export default new ControlerUser()