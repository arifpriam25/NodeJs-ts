
import Orders, {OrdersInput, OrdersJoin } from "../db/models/Orders";
import User from "../db/models/User";
import Books from "../db/models/Books";
import sequelizeConnection from "../db/models";

class RepositoryOrder {
    insert = async (data: OrdersInput): Promise<Orders> => {
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
    Orders = async () => {
        const t = await sequelizeConnection.transaction()
            const a = new Date().getTime()
        try {
            await User.update(
                { balance: 200000 },
                { where: { id: 1 }, transaction:t }
            );
            
            await Books.update(
                { quantity: 2 },
                { where: { id: 1 }, transaction:t }
            );
            await Orders.create(
                {
                    idUser:1,
                    idBook:1,
                    quantity:2,
                    totalPrice:150000,
                    buyDate: a
                },
                { transaction:t }
            );
            // throw new Error('Something went wrong!');
            await t.commit();
            console.log(a);
            return "Order Success"
            
        } catch (error) {
            console.error(error);
            await t.rollback();
            return "Failed Order"
        }
    }
}

export default new RepositoryOrder