import rBook from "../repository/Book.repository"
import Helper from "../helpers/Helper"
import { BookData } from "../helpers/DTO/dto"

class ServiceBook {
    // body: Request['body']
    // params: Request['params']
    // constructor(req: Request) {
    //     this.body = req.body
    //     this.params = req.params
    // }
    insert = async (bookData: BookData) => {
        try {
            const insert = await rBook.insert(bookData)
            return Helper.ResponseData("Insert Successs", null, insert)

        } catch (error) {
            return Helper.ResponseData("Error", error, null)
        }
    }
    getAll = async () => {
        try {
            const data = await rBook.getAll()
            if (!data) {
                return Helper.ResponseData("no data", null, null)
            }
            return data
            // return Helper.ResponseData("Show All Book", null, data)
        } catch (error) {
            return Helper.ResponseData("Error", error, null)
        }
    }
    getById = async (id: number) => {
        try {
            const data = await rBook.findById(id)

            return Helper.ResponseData("book : " + id, null, data)

        } catch (error) {
            return Helper.ResponseData("Error", error, null)
        }
    }
    update = async (id: number, title: string, author: string, publisher: string, year: number, price: number, quantity: number, active: boolean) => {
        try {
            const data : BookData = {
                title,
                author,
                publisher,
                year,
                price,
                quantity,
                active
            }
            const check = await rBook.findById(id)
            if (!check) {
                return Helper.ResponseData("Error id not found", null, check)
            }
            // return data
            await rBook.update(id, data)
            return Helper.ResponseData("Update Success", null, data)
            // return Helper.ResponseData("Show All Book", null, data)
        } catch (error) {
            return Helper.ResponseData("Error", error, null)
        }
    }
    delete = async (id: number) => {
        try {
            const check = await rBook.findById(id)
            if (!check) {
                return Helper.ResponseData("Error id not found", null, check)
            }
            await rBook.delete(id)
            return Helper.ResponseData("delete success", null, check)
        } catch (error) {
            return Helper.ResponseData("Error", error, null)
        }
    }
}

// export default ServiceBook
export default new ServiceBook()