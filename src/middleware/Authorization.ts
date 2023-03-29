import { Request, Response, NextFunction } from "express"
import Helper from "../helpers/Helper"
import ResponseData from "../helpers/ResponseData";
class ClassAuthorization {
    authenticated = (req: Request, res: Response, next: NextFunction) => {
        try {
            const authToken = req.headers["authorization"] as string;
            const token = authToken && authToken.split("Bearer ")[1];
            // console.log(authToken)
            if (token === null || typeof token !== 'string') {
                return res.send(ResponseData.resp(400, "Unauthorized: Auth.1", null))
            }
            const result = Helper.ExtractToken(token);
            // console.log(result)
            if (!result) {
                // console.log(token)
                return res.send(ResponseData.resp(400, "Unauthorized: Auth.2", null))
            }
            res.locals.userId = result.id
            res.locals.userEmail = result.email
            res.locals.roleId = result.roleId
            next();
        } catch (error) {
            return res.send(ResponseData.resp(500, "error", error));
        }
    } 
    adminRole = (req: Request, res: Response, next: NextFunction) => {
        try {
            const roleId = res.locals.roleId
            console.log(roleId)
            if(roleId !== 1){
                return res.send(ResponseData.resp(400, "Forbidden", null))
            }
            next();
        } catch (error) {
            return res.send(ResponseData.resp(400, "error", error));
        }
    }
    
    userRole = (req: Request, res: Response, next: NextFunction) => {
        try {
            const roleId = res.locals.roleId
            if(roleId !== 2){
                return res.send(ResponseData.resp(400, "error", null))
            }
            next();
        } catch (error) {
            return res.send(ResponseData.resp(400, "error", error));
        }
    }
}


export default new ClassAuthorization();