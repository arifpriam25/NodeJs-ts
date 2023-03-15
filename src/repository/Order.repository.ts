
import Orders, { OrdersAttributes, OrdersJoin } from "../db/models/Orders";
import User from "../db/models/User";
import Books from "../db/models/Books";
class RepositoryOrder {
    insert = async (data: OrdersAttributes): Promise<OrdersAttributes> => {
        const result = await Orders.create(data);
        return result
    }
    getAll = async (): Promise<Array<OrdersJoin>> => {
        const result = await Orders.findAll({
            include: [
                {
                    model: User,
                },
                {
                    model: Books,
                }
            ]
        });
        // console.log(data)
        return result
    }
}

export default new RepositoryOrder