import { Request, Response } from "express"
import sOrder from "../services/Order.service"

class ControllerOrder {
    buy = async (req: Request, res: Response): Promise<Response> => {
        const emailUser = res.locals.userEmail;
        const {idBook, quantityBuy} = req.body

        const buyBook = sOrder.Buy(emailUser,idBook,quantityBuy)

        return res.send({message: "buy",data: buyBook})
    }
    
}

export default new ControllerOrder()