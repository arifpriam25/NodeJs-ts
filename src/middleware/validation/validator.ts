import { Response, Request,NextFunction } from "express";
import Validator from "fastest-validator";
import Helper from "../../helpers/Helper";

//dto   
import { RegisterUser,InsertBook } from "../../helpers/DTO/dto";

const v = new Validator();
class Validation {
    
    validateRegister = async (req: Request, res: Response, next:NextFunction) => {
        const validate = {
            name: { type: "string", min: 3, max: 33 },
            email: { type: "email", label: "Email Address" },
            password: { type: "string", min: 8 },
            confirmPassword: { type: "equal", field: "password" },
            roleId: { type: "number" },
            $$strict: true
        };
        // const {name,email,password,confirmPassword,roleId} = req.body
        const data:RegisterUser= <RegisterUser>req.body
        // const dataRegist:RegisterUser  = {name,email,password,confirmPassword,roleId.req.body}

        // console.log(dataRegist)
        // const check = v.compile(validate)
        // const cek = check(dataRegist)
        const check = v.validate(data,validate)

        if(check !== true){
            // req.statusCode
            return res.status(400),res.send(Helper.ResponseData("Bad Request", null, check))
        }
        return console.log("success validate")
        next()
    }

    insertBook = async (req: Request, res: Response,next:NextFunction) => {
        const validate = {
            title: {type:"string"},
            author: {type:"string"},
            publisher: {type:"string"},
            year: {type:"number", max:3000},
            price: {type:"number"},
            quantity: {type:"number"},
            active: {type:"boolean"},
            $$strict: true
        };
        const data:InsertBook= <InsertBook>req.body
        console.log(req.body)
        
        const check = v.validate(data,validate)
        if(check !== true){
            return res.status(400).send(Helper.ResponseData("Bad Request", null, check))
        }
        // return check
        next();
    }

}

export default new Validation()
