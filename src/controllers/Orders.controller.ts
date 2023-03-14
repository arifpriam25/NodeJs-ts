import { Request, Response } from "express"
import sOrder from "../services/Order.service"
import ResponseData from "../helpers/ResponseData";

class ControllerOrder {
    buy = async (req: Request, res: Response): Promise<Response> => {
        const emailUser = res.locals.userEmail;
        const {idBook, quantityBuy} = req.body

        const Book = await sOrder.buy(emailUser,idBook,quantityBuy)

        return res.send({message: "buy", data: Book})
    }
    historyOrder = async (req: Request, res: Response): Promise<Response> => {
        try {
            const result = await sOrder.ordrData()

            return res.send(ResponseData.resp(200,"List Order",result))
        } catch (error) {
            return res.send(ResponseData.resp(400,"error",error))
        }
        
    }
}

export default new ControllerOrder()