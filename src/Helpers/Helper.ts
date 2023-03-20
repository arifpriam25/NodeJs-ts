import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserData } from "./DTO/dto";
dotenv.config();

class Helper {

    GenerateToken = (data: object): string => {
        const token = jwt.sign(data, process.env.JWT_TOKEN as string, { expiresIn: "1d" });
        return token;
    }

    GenerateRefreshToken = (data: object): string => {
        const token = jwt.sign(data, process.env.JWT_REFRESH_TOKEN as string, { expiresIn: "1d" });
        return token;
    }

    ExtractToken = (token: string): UserData | null => {
        const secretKey: string = process.env.JWT_TOKEN as string;

        let resData: unknown;

        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                resData = null
            } else {
                console.log(decoded)
                resData = decoded
            }
        })
        if (resData) {
            const result: UserData = <UserData>(resData);
            console.log(resData)
            return result;
        }
        return null;
    }

    ExtractRefreshToken = (token: string): UserData | null => {
        const secretKey: string = process.env.JWT_REFRESH_TOKEN as string;

        let resData: unknown;

        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                resData = null
            } else {
                resData = decoded
            }
        })
        if (resData) {
            const result: UserData = <UserData>(resData);
            return result;
        }
        return null;
    }

}
export default new Helper()