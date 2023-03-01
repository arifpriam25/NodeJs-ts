import { Request, Response, NextFunction } from "express"
import Helper from "../Helpers/Helper"

const Authenticated = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authToken = req.headers["authorization"];
        const token = authToken && authToken.split(" ")[1];

        if (token === null) {
            return res.status(401).send(Helper.ResponseData(401, "Unauthorized: Auth.001", null, null))
        }
        const result = Helper.ExtractToken(token!);
        console.log(result)
        if (!result) {
            // console.log(token)
            return res.status(401).send(Helper.ResponseData(401, "Unauthorized Auth.002", null, null))
        }
        res.locals.userEmail = result.email
        res.locals.roleId = result.roleId
        next();
    } catch (error: any) {
        return res.status(500).send(Helper.ResponseData(50, "", error, null));
    }
}

const SuperAdminRole = (req: Request, res: Response, next: NextFunction) => {
    try {
        const roleId = res.locals.roleId
        if(roleId !== 1){
            return res.status(401).send(Helper.ResponseData(401, "Forbidden bukan role superadmin", null, null))
        }
        next();
    } catch (error:any) {
        return res.status(500).send(Helper.ResponseData(50, "", error, null));
    }
}

const AdminRole = (req: Request, res: Response, next: NextFunction) => {
    try {
        const roleId = res.locals.roleId
        if(roleId !== 2){
            return res.status(401).send(Helper.ResponseData(401, "Forbidden bukan role admin", null, null))
        }
        next();
    } catch (error:any) {
        return res.status(500).send(Helper.ResponseData(50, "", error, null));
    }
}

const UserRole = (req: Request, res: Response, next: NextFunction) => {
    try {
        const roleId = res.locals.roleId
        if(roleId !== 3){
            return res.status(401).send(Helper.ResponseData(401, "Forbidden bukan role user", null, null))
        }
        next();
    } catch (error:any) {
        return res.status(500).send(Helper.ResponseData(50, "", error, null));
    }
}

export default { Authenticated,SuperAdminRole,AdminRole,UserRole };