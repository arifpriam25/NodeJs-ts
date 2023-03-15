// import rUser from "../repository/User.repository";
// import rBook from "../repository/Book.repository";
// import rOrders from "../repository/Order.repository";
// // import Helper from "../helpers/Helper";
// import { BookData, UserData, OrdersData } from "../helpers/DTO/dto";
// import { OrderJoinsReqJoin } from "../db/models/Orders";

// class ServiceOrders {
//     buy = async (email: string, idBook: number, quantityBuy: number) => {
//         try {
//             const dataBook = await <BookData>rBook.findById(idBook)
//             if (!dataBook) {
//                 throw Error('null')
//             }
//             const now = new Date()
//             // console.log(dataBook)
//             // Helper.ResponseData("no data", null, dataBook)

//             if (!dataBook) {
//                 return "Book Not Found"
//             }

//             if (dataBook.price == undefined) {
//                 return "null"
//             }
//             const totalPrice = dataBook.price * quantityBuy;
//             const totalBook = dataBook.quantity as number - quantityBuy;
//             console.log("total harga : " + totalPrice)
//             const dataUser: UserData = await <UserData>rUser.findByEmail(email)
//             if (dataUser.balance == undefined) {
//                 return "null"
//             }
//             if (dataUser.balance < totalPrice) {
//                 return "saldo tidak cukup";
//             }
//             const userBalance = dataUser.balance - totalPrice;
//             console.log("saldo sekarang : " + dataUser.balance)
//             console.log("total harga : " + totalPrice)
//             console.log("total saldo : " + userBalance)


//             //update user
//             const idUser = dataUser.id;
//             await rUser.updateBalance(idUser as number, userBalance)
//             //update book

//             await rBook.purchased(idBook, totalBook)
//             //insert order
//             const insertOrder = {
//                 idUser: dataUser.id,
//                 idBook: dataBook.id,
//                 quantity: quantityBuy,
//                 totalPrice: totalPrice,
//                 buyDate: now
//             }
//             const result = await rOrders.insert(insertOrder)

//             return result
//         } catch (error) {
//             return error
//         }
//     }
//     ordrData = async (): Promise<OrdersData[]> => {
//         const data: Array<OrderJoinsReqJoin> = await rOrders.getAll();

//         if (!data) {
//             const data: OrdersData[] = [];
//             return data;
//         }

//         //     idOrders:number;
//         // nameBuyer:string;
//         // bookName:string;
//         // quantity:number;
//         // totalPrice:number;
//         // date:Date;

//         const orders: Array<OrdersData> = data.map((order: OrderJoinsReqJoin): OrdersData => {
//             const t: OrdersData = {
//                 idOrders: order.id,
//                 nameBuyer: order.User.name as string,
//                 bookName: order.Books.title as string,
//                 quantity: order.quantity,
//                 totalPrice: order.totalPrice,
//                 date: order.buyDate
//             }
//             return t;
//         });
//         return orders
//     }
// }
// export default new ServiceOrders()