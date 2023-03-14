import { Request, Response } from "express";
import sUser from "../services/User.service";
import { RegisterUser, UserData } from "../helpers/DTO/dto";
import ResponseData from "../helpers/ResponseData";



class ControlerUser {
    register = async (req: Request, res: Response): Promise<Response> => {
        try {
            const data = req.body as RegisterUser;
            const result: UserData = await <UserData>sUser.register(data);
            return res.send(ResponseData.resp(200, "Register", result))
        } catch (error) {
            return res.send(ResponseData.resp(500, "Error", error));
        }
    }

    userDetail = async (req: Request, res: Response): Promise<Response> => {
        try {
            const email = res.locals.userEmail;
            const result = await sUser.userDetail(email);
            return res.send(ResponseData.resp(200, "Register",result))
        } catch (error) {
            return res.send(ResponseData.resp(500, "Error", error));
        }
    }

    UserLogin = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { email, password } = req.body;
            // const service: sUser = new sUser(req);
            // console.log(email)
            const result: UserData = await <UserData>sUser.login(email, password);
            const reftoken = result.refreshToken
            res.cookie('refreshToken', reftoken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            })

            return res.send(ResponseData.resp(200, "Login", result))
        } catch (error) {
            return res.send(ResponseData.resp(500, "Error", error));
        }

    }

    refreshToken = async (req: Request, res: Response): Promise<Response> => {
        try {
            const result = req.cookies.refreshToken;
            // const service: sUser = new sUser(req);
            return res.send(ResponseData.resp(200, "Token Login", result))
        } catch (error) {
            return res.send(ResponseData.resp(500, "Error", error));
        }
    }

    userLogout = async (req: Request, res: Response): Promise<Response> => {
        try {
            const refreshToken = req.cookies.refreshToken;
            const email = res.locals.userEmail;
            // const service: sUser = new sUser(req);
            const result = await sUser.logout(refreshToken, email);
            res.clearCookie('refreshToken')
            return res.send(ResponseData.resp(200, "Token Login", result))
        } catch (error) {
            return res.send(ResponseData.resp(500, "Error", error));
        }

    }
}

export default new ControlerUser()