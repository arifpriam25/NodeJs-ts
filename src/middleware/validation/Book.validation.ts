import Validator from "validatorjs";
import { Request, Response, NextFunction } from "express";
import Helpers from "../../helpers/Helper";

class ValidationBook {
    public static insert = async (req: Request, res: Response, next: NextFunction) => {
        const { title,author,publisher,year,quantity,price,active } = req.body;
        try {
            const data = {
                title,
                author,
                publisher,
                year,
                price,
                quantity,
                active
            }
            const rules: Validator.Rules = {
                "title":"required|string",
                "author":"required|string",
                "publisher":"required|string",
                "year":"required|integer",
                "price":"required|integer",
                "quantity":"required|integer",
                "active":"required|boolean"
            }
            const validate = new Validator(data, rules);
            if (validate.fails()) {
                return res.status(400).send(Helpers.ResponseData("Bad Request", validate.errors, null))
            }
            next();
        } catch (error: any) {
            return res.status(500).send(Helpers.ResponseData("", error, null))
        }
    
    }
}


export default ValidationBook