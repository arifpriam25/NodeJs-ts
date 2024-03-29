import { Response, Request, NextFunction } from "express";
import Validator from "fastest-validator";

//dto   
import { RegisterUser, InsertBook } from "../../helpers/DTO/dto";
import ResponseData from "../../helpers/ResponseData";

const v = new Validator();
class Validation {

    validateRegister = async (req: Request, res: Response, next: NextFunction) => {
        const validate = {
            name: { type: "string", min: 3, max: 33 },
            email: { type: "email", label: "Email Address" },
            password: { type: "string", min: 8 },
            confirmPassword: { type: "equal", field: "password" },
            roleId: { type: "number" },
            $$strict: true
        };
        const data = req.body as RegisterUser
        const check = v.validate(data, validate)

        if (check !== true) {
            // req.statusCode
            return res.send(ResponseData.resp(400, "Bad Request", check))
        }

        next()
    }

    insertBook = async (req: Request, res: Response, next: NextFunction) => {
        const validate = {
            title: { type: "string" },
            author: { type: "string" },
            publisher: { type: "string" },
            price: { type: "number" },
            quantity: { type: "number" },
            active: { type: "boolean" },
        };
        const data: InsertBook = <InsertBook>req.body

        const check = v.validate(data, validate)
        if (check !== true) {
            return res.send(ResponseData.resp(400, "Bad Request", check))
        }
        next();
    }

    buyBook = async (req: Request, res: Response, next: NextFunction) => {
        const validate = {
            idBook: { type: "number" },
            quantityBuy: { type: "number" },
            $$strict: true
        };
        const data: InsertBook = <InsertBook>req.body

        const check = v.validate(data, validate)
        if (check !== true) {
            return res.send(ResponseData.resp(400, "Bad Request", check))
        }
        next();
    }

}

export default new Validation()
