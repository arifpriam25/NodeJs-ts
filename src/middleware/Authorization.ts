import { Request, Response, NextFunction } from "express"
import Helper from "../Helpers/Helper"

const Authenticated = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authToken = req.headers["authorization"];
        const token = authToken && authToken.split(" ")[1];

        if (token===null) {
            return res.status(401).send(Helper.ResponseData(401, "Unauthorized: Auth.001", null, null))
        }
        const result = Helper.ExtractToken(token!);
        if(!result){
            // console.log(token)
            return res.status(401).send(Helper.ResponseData(401, "Unauthorized Auth.002", null, null))
        }
        next();
    } catch (error: any) {
        return res.status(500).send(Helper.ResponseData(50, "", error, null));
    }
}

export default { Authenticated };