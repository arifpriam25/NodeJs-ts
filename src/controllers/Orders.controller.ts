import { Request, Response } from "express"
import sOrder from "../services/Order.service"

class ControllerOrder {
    buy = async (req: Request, res: Response): Promise<Response> => {
        const emailUser = res.locals.userEmail;
        const {idBook, quantityBuy} = req.body

        const Book = await sOrder.buy(emailUser,idBook,quantityBuy)

        return res.send({message: "buy", data: Book})
    }
    
}

export default new ControllerOrder()