
import Orders, { OrdersInput, OrdersJoin } from "../db/models/Orders";
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
            // console.log(result)
            return result
       
    }
    
    //Transaction
    Orders = async (dataOrder: OrdersInput, balance: number, idUser: number, totalBook: number, idBook: number) => {
        const t = await sequelizeConnection.transaction()
        try {
            await User.update(
                { balance: balance },
                { where: { id: idUser }, transaction: t }
            );

            await Books.update(
                { quantity: totalBook },
                { where: { id: idBook }, transaction: t }
            );
            await Orders.create(dataOrder,
                { transaction: t }
            );
            // throw new Error('Something went wrong!');
            await t.commit();
            return "Order Success"

        } catch (error) {
            console.error(error);
            await t.rollback();
            return error
        }
    }
}

export default new RepositoryOrder