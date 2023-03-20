import { Request, Response } from "express"
import ServiceOrder from "../services/Order.service"
import ResponseData from "../helpers/ResponseData";

class ControllerOrder {
    buy = async (req: Request, res: Response): Promise<Response> => {
        const emailUser = res.locals.userEmail;
        const { idBook, quantityBuy } = req.body

        const result = await ServiceOrder.buy(emailUser, idBook, quantityBuy)

        return res.send({ message: "buy", data: result })
    }
    historyOrder = async (req: Request, res: Response): Promise<Response> => {
        try {
            const result = await ServiceOrder.orderData()

            return res.send(ResponseData.resp(200, "List Order", result))
        } catch (error) {
            return res.send(ResponseData.resp(400, "error", error))
        }

    }
}

export default new ControllerOrder()