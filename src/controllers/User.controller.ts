import { Request, Response } from "express";
import sUser from "../services/User.service";
interface UserData {
    id?: string | null,
    name?: string | null,
    email?: string | null,
    roleId?: string | null
}
class ControlerUser {
    Register = async (req: Request, res: Response): Promise<Response> => {
        const { name, email, password, confirmPassword, roleId } = req.body;
        // const result : UserData = req.body
        const result: UserData = <UserData>({
            name,
            email,
            password,
            confirmPassword,
            roleId
        });
        
        // const a = result.name;
        // console.log(result)
        // return res.send("blocked")

        // const service: sUser = new sUser(req);
        const data = await sUser.Register(result);

        return res.send({ message: "Register", data: data })
    }

    UserDetail = async (req: Request, res: Response): Promise<Response> => {
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
        const data = await sUser.login(email, password);

        const reftoken = data.refreshToken;
        res.cookie('refreshToken', reftoken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })

        return res.send({ message: "User login", data: data })
    }

    RefreshToken = async (req: Request, res: Response): Promise<Response> => {
        const refreshToken = req.cookies.refreshToken;
        // const service: sUser = new sUser(req);
        const data = await sUser.RefreshToken(refreshToken);

        return res.send({ message: "RefreshToken", data: data })
    }

    UserLogout = async (req: Request, res: Response): Promise<Response> => {
        const refreshToken = req.cookies.refreshToken;
        const email = res.locals.userEmail;
        // const service: sUser = new sUser(req);
        const data = await sUser.logout(refreshToken, email);
        res.clearCookie('refreshToken')
        return res.send({ message: "logout", data: data })
    }
}

export default new ControlerUser()