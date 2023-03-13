import rUser from "../repository/User.repository";
import rBook from "../repository/Book.repository";
// import Helper from "../helpers/Helper";
import { BookData,UserData } from "../helpers/DTO/dto";

class ServiceOrders {
    buy = async (email: string, idBook: number, quantityBuy: number) => {
        try {
            const dataBook = await <BookData>rBook.findById(idBook)
            // console.log(dataBook)
            // Helper.ResponseData("no data", null, dataBook)

            if (!dataBook) {
                return "Book Not Found"
            }

            if (dataBook.price == undefined) {
                return "null"
            }
            const totalPrice = dataBook.price * quantityBuy;
            console.log("total harga : "+totalPrice)
            const dataUser : UserData= await <UserData>rUser.findByEmail(email)
            if (dataUser.balance == undefined) {
                return "null"
            }
            if(dataUser.balance < totalPrice){
                return "saldo tidak cukup";
            }
            const userBalance = dataUser.balance - totalPrice;
            console.log("saldo sekarang : "+dataUser.balance)
            console.log("total harga : "+totalPrice)
            console.log("total saldo : "+userBalance)

            const idUser  = dataUser.id;
            return dataUser
            const result = await rUser.updateBalance(idUser as number,userBalance)
            return result
        } catch (error) {
            return error
        }
        
        
    }
}
export default new ServiceOrders()