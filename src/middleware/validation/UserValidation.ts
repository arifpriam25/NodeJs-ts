import Validator from "validatorjs";
import { Request, Response, NextFunction } from "express";
import Helpers from "../../helpers/Helper";
import User from "../../db/models/User";

const RegisterValidation = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, confirmPassword,roleId } = req.body;
    try {
        const data = {
            name,
            email,
            password,
            confirmPassword,
            roleId
        }
        const rules: Validator.Rules = {
            "name": "required|string|max:50",
            "email": "required|email",
            "password": "required|min:8",
            "confirmPassword": "required|same:password",
            "roleId": "required|integer"
        }
        const validate = new Validator(data, rules);
        if (validate.fails()) {
            return res.status(400).send(Helpers.ResponseData(400, "Bad Request", validate.errors, null))
        }
        const user = await User.findOne({
            where: {
                email: data.email
            }
        })
        next();
    } catch (error: any) {
        return res.status(500).send(Helpers.ResponseData(500, "", error, null))
    }

}

export default { RegisterValidation }