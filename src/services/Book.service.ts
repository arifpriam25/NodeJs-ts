import repositoryBook from "../repository/Book.repository"
import { InputBook } from "../helpers/DTO/dto"

class ServiceBook {
    insert = async (bookData: InputBook) => {
        const result = await repositoryBook.insert(bookData)
        return result

    }
    getAll = async () => {
        const result = await repositoryBook.getAll()
        if (!result) {
            return result
        }
        return result

    }
    getById = async (id: number) => {
        const result = await repositoryBook.findById(id)
        return result

    }
    update = async (id: number, title: string, author: string, publisher: string, year: number, price: number, quantity: number, active: boolean) => {
        const result = {
            title,
            author,
            publisher,
            year,
            price,
            quantity,
            active
        }
        const check = await repositoryBook.findById(id)
        if (!check) {
           return check
        }
        // return data
        await repositoryBook.update(id, result)
        return result

    }
    delete = async (id: number) => {
        const result = await repositoryBook.findById(id)
        if (!result) {
            return result
        }
        await repositoryBook.delete(id)
        return result
    }
}


export default new ServiceBook()