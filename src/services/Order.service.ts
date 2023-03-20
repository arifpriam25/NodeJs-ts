import RepositoryUser from "../repository/User.repository";
import RepositoryBook from "../repository/Book.repository";
import RepositoryOrder from "../repository/Order.repository";
import { OrdersJoin } from "../db/models/Orders";
// import Helper from "../helpers/Helper";
import { UserData, OrdersData } from "../helpers/DTO/dto";

class ServiceOrders {
    buy = async (email: string, idBook: number, quantityBuy: number): Promise<object> => {
        const dataBook = await RepositoryBook.findById(idBook)

        if (!dataBook) {
            throw Error("data notfound");
        }

        if (dataBook.price == undefined) {
            throw Error("databook.price u");
        }
        const totalPrice = dataBook.price * quantityBuy;
        const totalBook = dataBook.quantity as number - quantityBuy;

        const dataUser: UserData = await <UserData>RepositoryUser.findByEmail(email)
        if (dataUser.id == undefined) {
            throw Error("datauser.id u");
        }
        if (dataBook.id == undefined) {
            throw Error("databook.id u");
        }
        if (dataUser.balance == undefined) {
            throw Error("balance undefined");
        }
        if (dataUser.balance < totalPrice) {
            return { data: 'saldo tidak cukup' }
        }
        const userBalance = dataUser.balance - totalPrice;
        console.log("saldo sekarang : " + dataUser.balance)
        console.log("total harga : " + totalPrice)
        console.log("total saldo : " + userBalance)


        //update user
        const idUser = dataUser.id;


        //insert order
        const orderData = {
            idUser: idUser,
            idBook: dataBook.id,
            quantity: quantityBuy,
            price: totalPrice,
            buyDate: new Date()
        }
        // await RepositoryBook.purchased(idBook, totalBook)
        // await RepositoryUser.updateBalance(idUser as number, userBalance)
        const result = await RepositoryOrder.Orders(orderData, userBalance, idUser, totalBook, idBook)

        return { result, orderData }
    }
    orderData = async (): Promise<OrdersData[]> => {
        const data = await RepositoryOrder.getAll();
        // console.log(data)

        const orders: OrdersData[] = data.map((order: OrdersJoin): OrdersData => {
            if (!order.User) {
                throw new Error('User Not Found')
            }
            if (!order.Book) {
                throw new Error('User Not Found')
            }
            return {
                idOrders: order.id,
                nameBuyer: order.User.name,
                bookName: order.Book.title,
                quantity: order.quantity,
                totalPrice: order.price,
                date: order.buyDate
            }
        });
        console.log(orders)
        return orders

    }
}
export default new ServiceOrders()