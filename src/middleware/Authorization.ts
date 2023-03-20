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
                return res.status(401).send(ResponseData.resp(400, "Unauthorized: Auth.1", null))
            }
            const result = Helper.ExtractToken(token);
            // console.log(result)
            if (!result) {
                // console.log(token)
                return res.status(401).send(ResponseData.resp(400, "Unauthorized: Auth.2", null))
            }
            // console.log(result)
            // return res.status(401).send(ResponseData.resp("Unauthorized Auth.002", null, result))
            res.locals.userId = result.id
            res.locals.userEmail = result.email
            res.locals.roleId = result.roleId
            next();
        } catch (error) {
            return res.status(500).send(ResponseData.resp(400, "error", error));
        }
    }
    
    adminRole = (req: Request, res: Response, next: NextFunction) => {
        try {
            const roleId = res.locals.roleId
            console.log(roleId)
            if(roleId !== 1){
                return res.status(401).send(ResponseData.resp(400, "Forbidden", null))
            }
            next();
        } catch (error) {
            return res.status(500).send(ResponseData.resp(400, "error", error));
        }
    }
    
    userRole = (req: Request, res: Response, next: NextFunction) => {
        try {
            const roleId = res.locals.roleId
            if(roleId !== 2){
                return res.status(401).send(ResponseData.resp(400, "error", null))
            }
            next();
        } catch (error) {
            return res.status(500).send(ResponseData.resp(400, "error", error));
        }
    }
}


export default new ClassAuthorization();