import RepositoryUser from "../repository/User.repository";
import RepositoryBook from "../repository/Book.repository";
import RepositoryOrder from "../repository/Order.repository";
import { OrdersJoin } from "../db/models/Orders";
// import Helper from "../helpers/Helper";
import { BookData, UserData, OrdersData } from "../helpers/DTO/dto";

class ServiceOrders {
    buy = async (email: string, idBook: number, quantityBuy: number) => {
        const dataBook = await <BookData>RepositoryBook.findById(idBook)

        if (!dataBook) {
            return "Book Not Found"
        }

        if (dataBook.price == undefined) {
            return "null"
        }
        const totalPrice = dataBook.price * quantityBuy;
        const totalBook = dataBook.quantity as number - quantityBuy;

        const dataUser: UserData = await <UserData>RepositoryUser.findByEmail(email)
        if (dataUser.id == undefined) {
            return "null"
        }
        if (dataBook.id == undefined) {
            return "null"
        }
        if (dataUser.balance == undefined) {
            return "null"
        }
        if (dataUser.balance < totalPrice) {
            return "saldo tidak cukup";
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
        const result = await RepositoryOrder.Orders(orderData,userBalance,idUser,totalBook,idBook)

        return result
    }
    ordrData = async (): Promise<OrdersData[]> => {
        const data = await RepositoryOrder.getAll();

        const orders: OrdersData[] = data.map((order: OrdersJoin): OrdersData => {
            if (!order.User) {
                throw new Error('User Not Found')
            }
            if (!order.Books) {
                throw new Error('User Not Found')
            }
            return {
                idOrders: order.id,
                nameBuyer: order.User.name,
                bookName: order.Books.title,
                quantity: order.quantity,
                totalPrice: order.price,
                date: order.buyDate
            }
        });
        return orders
    }
}
export default new ServiceOrders()