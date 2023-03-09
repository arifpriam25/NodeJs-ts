import rUser from "../repository/User.repository"
import rBook from "../repository/Book.repository"
import Helper from "../helpers/Helper";

class ServiceOrders {
    
    Buy = async (email: string, idBook: string, quantityBuy: string) => {
        try {
            const dataBook = await rBook.findById(idBook)
            // console.log(email+idBook+quantityBuy)
            Helper.ResponseData("no data", "noerr", dataBook)
            if (!dataBook) {
                return "Book Not Found"
            }
            
            // const dataUser= await rUser.findByEmail(email)
            // if(!dataUser){
            //     return "not found"
            // }
            // console.log(dataBook)
            // return dataBook
        } catch (error:any) {
            return error 
        }
        
        
    }
}
export default new ServiceOrders()