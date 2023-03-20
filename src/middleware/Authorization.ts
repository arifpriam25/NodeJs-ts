import { Request, Response, NextFunction } from "express"
import Helper from "../helpers/Helper"
class ClassAuthorization {
    authenticated = (req: Request, res: Response, next: NextFunction) => {
        try {
            const authToken = req.headers["authorization"] as string;
            const token = authToken && authToken.split("Bearer ")[1];
            // console.log(authToken)
    
            if (token === null || typeof token !== 'string') {
                return res.status(401).send(Helper.ResponseData("Unauthorized: Auth.001", null, null))
            }
            const result = Helper.ExtractToken(token);
            // console.log(result)
            if (!result) {
                // console.log(token)
                return res.status(401).send(Helper.ResponseData("Unauthorized Auth.002", null, null))
            }
            // console.log(result)
            // return res.status(401).send(Helper.ResponseData("Unauthorized Auth.002", null, result))
            res.locals.userId = result.id
            res.locals.userEmail = result.email
            res.locals.roleId = result.roleId
            next();
        } catch (error) {
            return res.status(500).send(Helper.ResponseData("", error, null));
        }
    }
    
    adminRole = (req: Request, res: Response, next: NextFunction) => {
        try {
            const roleId = res.locals.roleId
            console.log(roleId)
            if(roleId !== 1){
                return res.status(401).send(Helper.ResponseData("Forbidden", null, null))
            }
            next();
        } catch (error) {
            return res.status(500).send(Helper.ResponseData("", error, null));
        }
    }
    
    userRole = (req: Request, res: Response, next: NextFunction) => {
        try {
            const roleId = res.locals.roleId
            if(roleId !== 2){
                return res.status(401).send(Helper.ResponseData("Forbidden", null, null))
            }
            next();
        } catch (error) {
            return res.status(500).send(Helper.ResponseData("", error, null));
        }
    }
}


export default new ClassAuthorization();